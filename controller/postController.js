const db = require("../model");

const userController = {
  getPost: async (data) => {
    
    const post =  await db.models.postModel.findOne({ where: { id: data.id }, order: [
      ['createdAt', 'asc'], 
  ], }); 
			  
    if (!post)  throw { code: 401, message: `Issue encounter while fetching ${data.id} post` };

    return {code: 200, message: "Succesfully fetch!", data: post};
  },
  getPostList: async (id = "") => {
    
    let post =  await db.sequelize.query(`SELECT CONCAT(user.fname, " ", user.lname) as fname, user.role,user.image, post.* FROM post INNER JOIN user ON user.id = post.userId where post.status = 1 and post.postHeaderText like '%${id}%' order by post.createdAt desc`);

    if (!post)  throw { code: 401, message: `Issue encounter while fetching post` }; 

    return {code: 200, message: "Succesfully fetch!", meta: post[0]};
  },
  getPostListApproval: async (search = "") => {
    
    let post =  await db.sequelize.query(`SELECT CONCAT(user.fname, " ", user.lname) as fname, user.role,user.image, post.* FROM post INNER JOIN user ON user.id = post.userId where post.status IN (0,1) and post.postHeaderText like '%${search}%' order by post.createdAt desc`);

    if (!post)  throw { code: 401, message: `Issue encounter while fetching post` }; 

    return {code: 200, message: "Succesfully fetch!", meta: post[0]};
  },

  approvePost: async (id) => {
    await db.models.postModel.update({
      status: 1
    }, {
      where: {
        id
      }
    })

    return {code: 200, message: "Succesfully Updated!"};
  },
  
  rejectPost: async (id) => {
    await db.models.postModel.update({
      status: 3
    }, {
      where: {
        id
      }
    })

    return {code: 200, message: "Rejected!"};
  },
  createPost: async (body) => {

    await db.sequelize.transaction(async (t) => {
      
    let post = await db.models.postModel.create({
      postHeaderText: body.title,
      postDetails: body.details,
      userId: body.userId,
      status: 0
    }, { transaction: t });  

    body.image.map(async item => {
      return await db.models.imageModel.create(
        {
          postId: post.id,
          image: item.image,
          status: 1
        }
      );
    });   
    return {code: 200, message: "Succesfully saved!"};
    });
 
    return {code: 200, message: "Succesfully saved!"};
  },

  updatePost: async (body) => {

    await db.sequelize.transaction(async (t) => {
    
    await db.models.postModel.update({
      postHeaderText: body.title,
      postDetails: body.details,  
    }, {
      where: {
        id: body.id
      }
    }, { transaction: t });  

    await db.models.imageModel.update({
      status: 3
    }, {
      where: {
        postId: body.id
      }
    }, { transaction: t });  

    body.image.map(async item => {
      return await db.models.imageModel.create(
        {
          postId: body.id,
          image: item.image,
          status: 1
        }
      );
    });  
    
    
    return {code: 200, message: "Succesfully saved!"};
    });
 
    return {code: 200, message: "Succesfully saved!"};
  },
	
  deletePost: async (id) => {
    await db.models.postModel.update({
      status: 5
    }, {
      where: {
        id
      }
    })

    return {code: 200, message: "Post Deleted!"};
  }
}

module.exports = userController;
