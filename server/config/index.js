require("dotenv").config();

module.exports = {
  DB: process.env.DB,
  SECRET: process.env.APP_SECRET
};
