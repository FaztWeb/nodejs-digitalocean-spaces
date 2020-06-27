const fs = require("fs");
const { upload, s3 } = require("../lib/multer");
const path = require("path");

const { BUCKET_NAME } = process.env;

const renderIndex = (req, res) => {
  res.render("upload", {
    title: "Upload an Image",
  });
};

const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.send("error!");
    }
    console.log("File succssefully uploaded");
    // res.send('Uploaded!');
    res.redirect("files");
  });
};

const getFiles = async (req, res) => {
  try {
    const data = await s3
      .listObjects({
        Bucket: BUCKET_NAME,
      })
      .promise();
    console.log({ data });
    res.render("files", {
      Contents: data.Contents,
      title: 'Getting Files'
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleFile = async (req, res) => {
  try {
    const { filename } = req.params;

    // fetching objects from bucket
    const data = await s3
      .getObject({
        Bucket: BUCKET_NAME,
        Key: filename,
      })
      .promise();

    console.log(data);
    const file = fs.createWriteStream(
      path.resolve(`./src/public/files/${filename}`)
    );
    file.write(data.Body);
    res.redirect("/files/" + filename);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  renderIndex,
  uploadFile,
  getFiles,
  getSingleFile,
};
