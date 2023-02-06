require("dotenv").config();
const fs = require("fs");

const aws = require("aws-sdk");
const S3 = require("aws-sdk/clients/s3");
const { BUCKET_NAME, ACCESS_KEY, SECRET_KEY, REGION } = require("./config");
const shortId = require("shortid");
const { log } = require("console");

const s3 = new S3({
  REGION,
  ACCESS_KEY,
  SECRET_KEY,
  signatureVersion: "v4",
});

// generate signed url
async function generateUploadURL() {
  const imageName = shortId.generate();
  //   const imageName = "random_uploaded_image";

  const params = {
    Bucket: BUCKET_NAME,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}
exports.generateUploadURL = generateUploadURL;

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: BUCKET_NAME,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: BUCKET_NAME,
  };
  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;
