const express = require("express");
const postController = require("../controller/postController"); 
let PostRoute = express.Router();   

PostRoute.route("/post/:id")
	.get(async (req, res) => { 
		try { 
			let data = req.params;
			let response = await postController.getPost(data);
			res.status(response?.code).send(response);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});

PostRoute.route("/postList/")
	.get(async (req, res) => { 
		try {  
			let response = await postController.getPostList();
			res.status(response?.code).send(response);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});

PostRoute.route("/postList/:id")
	.get(async (req, res) => { 
		try {  
			let response = await postController.getPostList(req.params.id);
			res.status(response?.code).send(response);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});

PostRoute.route("/postListApproval/")
	.get(async (req, res) => { 
		try {  
			let response = await postController.getPostListApproval();
			res.status(response?.code).send(response);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});

PostRoute.route("/approvePost/")
	.post(async (req, res) => { 
		try {  
			let response = await postController.approvePost(req.body.postId);
			res.status(response?.code).send(response);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});

PostRoute.route("/rejectPost/")
	.post(async (req, res) => { 
		try {  
			let response = await postController.rejectPost(req.body.postId);
			res.status(response?.code).send(response);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});

PostRoute.route("/createPost/")
	.post(async (req, res) => { 
		try {  
			let response = await postController.createPost(req.body);
			res.status(response?.code).send(response);
		} catch (error) {
			console.log(error)
      res.status(422).send(error);
    }
	});

PostRoute.route("/updatePost/")
	.post(async (req, res) => { 
		try {  
			let response = await postController.updatePost(req.body);
			res.status(response?.code).send(response);
		} catch (error) {
			console.log(error)
      res.status(422).send(error);
    }
	});
 
PostRoute.use("*", (req, res) => {  
		res.status(401).send("Page Not Found!");
	});


	module.exports = PostRoute;