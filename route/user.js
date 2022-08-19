const express = require("express");
const userController = require("../controller/userController"); 
let UserRoute = express.Router();   

UserRoute.route("/login")
	.post(async (req, res) => { 
		try { 
			let data = req.body;
			let response = await userController.login(data);
			res.status(response?.code).send(response);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});

UserRoute.route("/register")
	.post(async (req, res) => { 
		try {
			let data = req.body;
			let response = await userController.register(data);
			res.status(response?.code).send(response?.message);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});

	UserRoute.use("*", (req, res) => {  
		res.status(401).send("Page Not Found!");
	});


	module.exports = UserRoute;