const express = require("express");
let BookmarkRoute = express.Router();   
const bookmarkController = require("../controller/bookmarkController");

BookmarkRoute.route("/bookmarkList/")
	.get(async (req, res) => { 
		try { 
			let data = req.body;
			let response = await bookmarkController.getBookmarkList(data);
			res.status(response?.code).send(response);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});

BookmarkRoute.route("/createBookmark/")
	.post(async (req, res) => { 
		try { 
			let data = req.body;
			let response = await bookmarkController.addBookmark(data);
			res.status(response?.code).send(response);
		} catch (error) {
      res.status(error?.code ?? 422).send(error?.message ?? error);
    }
	});

BookmarkRoute.use("*", (req, res) => {  
		res.status(401).send("Page Not Found!");
	});


module.exports = BookmarkRoute;