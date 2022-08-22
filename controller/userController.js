const db = require("../model");

const userController = {
  register: async (data) => {

    const isUsernameExist =  await db.models.userModel.findOne({ where: { username: data.username } });
			
		if (isUsernameExist || isUsernameExist !== null) throw { code: 403, message: "Username has already taken. Please try different username!" };
		
    let create = await db.models.userModel.create({
      fname: data.fname,
      mname: data.mname,
      lname: data.lname,
      email: data.email,
      contactNo: data.contactNo,
      username: data.username,
      password: data.password,
      image: data.image,
      role: "farmer"
    });

    if (!create)  throw { code: 401, message: `Issue encounter while saving ${data.username} record` };

    return {code: 200, message: "Succesfully registered!"};
  },
  login: async (data) => {
    const user =  await db.models.userModel.findOne({ where: { username: data.username, password: data.password } });
		if (!user || user.length < 1) return { code: 403, message: "Username and password not found!" }; 
    delete user.password;
    delete user.username;
    return {code: 200, message: "Succesfully login", meta: user};
  }
}

module.exports = userController;