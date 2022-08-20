const express = require("express");
const formData = require("express-form-data");
const bodyParser = require("body-parser");
const cors = require("cors");
const Routes = require("./route").routers();
const logger = require("debug")("v2server:");
const db = require("./model");

require("dotenv").config();
const app = express();

try {
app.use(formData.parse());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" })); 
app.use(express.json({
	verify : (req, res, buf ) => {
		try {
			JSON.parse(buf);
		} catch (e) {
			res.status(404).send("Not allowed json format");
		}
	}
}));

(async () => {
	await db.sequelize.sync();
})();

// add route
Routes.map(route => { 
	app.use(route.url, route.pathName);
});


	app.listen(process.env.PORT, "0.0.0.0", () => {
		console.log("process.env.PORT", process.env.PORT)

		logger(`Server running on ${ process.env.NODE_ENV } mode in port ${ process.env.PORT }`);
	});
} catch (error) {
	logger(error);
}
