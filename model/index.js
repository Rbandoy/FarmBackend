require("dotenv").config();
const Sequelize = require("sequelize");
let seq;

seq = new Sequelize(process.env.DB, process.env.DBUSER, process.env.PASS,  {
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  logging: true
});

const db = {};
db.sequelize = seq;
db.models = {};

db.models.userModel =  require("./user")(seq, Sequelize.DataTypes);
db.models.postModel =  require("./post")(seq, Sequelize.DataTypes);
db.models.commentModel =  require("./comment")(seq, Sequelize.DataTypes);
db.models.imageModel =  require("./images")(seq, Sequelize.DataTypes);
db.models.bookmarkModel =  require("./bookmark")(seq, Sequelize.DataTypes);

module.exports = db;