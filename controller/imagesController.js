const db = require("../model");

const imagesController = { 
  getImageList: async (data) => { 
    let images =  await db.sequelize.query(`SELECT images.* FROM images where postId = ${data.id} and status = 1 order by images.createdAt desc`);
 
    if (!images)  throw { code: 401, message: `Issue encounter while fetching ${data.id} post` };
 

    return {code: 200, message: "Succesfully fetch!", meta: images[0]};
  },
  addImage: async (data) => {
    let create = await db.models.imageModel.create({
      postId: data.postId,
      image: data.imageLink, 
      status: 1
    });
    return {code: 200, message: "Succesfully added!", meta: create};
  }
}

module.exports = imagesController;