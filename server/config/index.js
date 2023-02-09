require("dotenv").config();

module.exports = {
  DB: process.env.DB,
  SECRET: process.env.APP_SECRET,
  BUCKET_NAME: process.env.BUCKET_NAME,
  ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
  SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  REGION: process.env.AWS_S3_REGION_NAME,
};
