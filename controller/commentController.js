const db = require("../model");

const commentController = {
  getComment: async (data) => {
    
    const post =  await db.models.commentModel.findOne({ where: { id: data.id } }); 
			  
    if (!post)  throw { code: 401, message: `Issue encounter while fetching ${data.id} post` };

    return {code: 200, message: "Succesfully fetch!", data: post};
  },
  getCommentList: async (data) => {
    
    let comment =  await db.sequelize.query(`SELECT CONCAT(user.fname, " ", user.lname) as fname,user.image, comments.* FROM comments INNER JOIN user ON user.id = comments.userId where postId = ${data.postId} order by comments.createdAt desc`);

    
    if (!comment)  throw { code: 401, message: `Issue encounter while fetching ${data.id} post` };
 

    return {code: 200, message: "Succesfully fetch!", meta: comment[0]};
  },
  addComment: async (data) => {
    let create = await db.models.commentModel.create({
      postId: data.postId,
      commentDetails: data.commentDetails,
      userId: data.userId,
      status: 0
    });
    return {code: 200, message: "Comment Posted!", meta: create};
  }
}

module.exports = commentController;