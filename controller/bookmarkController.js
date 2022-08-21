const db = require("../model");
const { Op } = require("sequelize");
const bookmarkController = { 
  getBookmarkList: async (data) => { 
    let images =  await db.sequelize.query(`SELECT bookmarks.*, post.* FROM bookmarks inner join post on  bookmarks.postid = post.id where bookmarks.userid = '${data.userid === undefined ? "": data.userid}' and bookmarks.status = 1 order by bookmarks.createdAt desc`);
 
    if (!images)  throw { code: 401, message: `Issue encounter while fetching ${data.id} post` };
 

    return {code: 200, message: "Succesfully fetch!", meta: images[0]};
  },
  addBookmark: async (data) => {

    let find = await db.models.bookmarkModel.findAll({
      where: {
        [Op.and]: [{ postId: data.postId }, { userid: data.userid }], 
      }
    });
    console.log(find)
    if (find.length > 0)  throw { code: 401, message: `already bookmarked!` };

    let create = await db.models.bookmarkModel.create({
      postId: data.postId,
      userid: data.userid, 
      status: 1
    });
    return {code: 200, message: "Succesfully added!", meta: create};
  }
}

module.exports = bookmarkController;