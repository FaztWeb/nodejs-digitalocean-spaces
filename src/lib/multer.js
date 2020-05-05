const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const { S3Endpoint, bucketName } = require('../config');

const spacesEndpoint = new aws.Endpoint(S3Endpoint);

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    metadata: (req, file, cb) => {
      cb(null, {
        fieldName: file.fieldname,
      });
    },
    key: (request, file, cb) => {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
}).array("upload", 1);

module.exports = { upload , s3 };