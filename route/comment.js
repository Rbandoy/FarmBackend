const express = require("express");
const commentController = require("../controller/commentController");
const postController = require("../controller/postController"); 
let CommentRoute = express.Router();   

CommentRoute.route("/comment/:id")
	.get(async (req, res) => { 
		try { 
			let data = req.params;
			let response = await commentController.getComment(data);
			res.status(response?.code).send(response);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});

  CommentRoute.route("/commentList/:postId")
	.get(async (req, res) => { 
		try { 
			let data = req.params;
			let response = await commentController.getCommentList(data);
			res.status(response?.code).send(response);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});

  CommentRoute.route("/addComment")
	.post(async (req, res) => { 
		try { 
			let data = req.body;
			let response = await commentController.addComment(data);
			res.status(response?.code).send(response);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});
 
  CommentRoute.use("*", (req, res) => {  
		res.status(401).send("Page Not Found!");
	});


	module.exports = CommentRoute;