const express = require("express");
const imagesController = require("../controller/imagesController");
const postController = require("../controller/postController"); 
let ImagesRoute = express.Router();   

ImagesRoute.route("/postImage/:id")
	.get(async (req, res) => { 
		try { 
			let data = req.params;
			let response = await imagesController.getImageList(data);
			res.status(response?.code).send(response);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});

ImagesRoute.route("/uploadImage")
	.post(async (req, res) => { 
		try {  
      let data = req.body;
			let response = await imagesController.addImage(data);
			res.status(response?.code).send(response);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});
 
ImagesRoute.use("*", (req, res) => {  
		res.status(401).send("Page Not Found!");
	});


	module.exports = ImagesRoute;