const CommentRoute = require("./comment");
const ImagesRoute = require("./images");
const PostRoute = require("./post");
const UserRoute = require("./user");
const Routes = {
	routers: () => {
		return [
			{
				url: "/user",
				pathName: UserRoute
			},
			{
				url: "/post",
				pathName: PostRoute
			},
			{
				url: "/fetchComment",
				pathName: CommentRoute
			},
			{
				url: "/images",
				pathName: ImagesRoute
			}  
		];
	}
};

module.exports = Routes;