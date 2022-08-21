const db = require("../model");

const bookmarkController = { 
  getBookmarkList: async (data = "") => { 
    let images =  await db.sequelize.query(`SELECT * FROM bookmarks where userid = '${data.userid === undefined ? "": data.userid}' and status = 1 order by createdAt desc`);
 
    if (!images)  throw { code: 401, message: `Issue encounter while fetching ${data.id} post` };
 

    return {code: 200, message: "Succesfully fetch!", meta: images[0]};
  },
  addBookmark: async (data) => {
    let create = await db.models.bookmarkModel.create({
      postId: data.postId,
      userid: data.userid, 
      status: 1
    });
    return {code: 200, message: "Succesfully added!", meta: create};
  }
}

module.exports = bookmarkController;