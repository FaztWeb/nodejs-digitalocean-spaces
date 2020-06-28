const fs = require("fs");
const path = require("path");
const { upload, s3 } = require("../lib/multer");

const Image = require("../models/Image");

const { BUCKET_NAME } = process.env;

// Render the default Index Page
const renderIndex = (req, res) => {
  res.render("upload", {
    title: "Upload an Image",
  });
};

// Upload File Router Handler
const uploadFile = async (req, res) => {
  // show the uploaded file information
  console.log(req.file);

  // Saving the Image URL in Database
  const newImage = new Image();
  newImage.url = req.file.location;
  await newImage.save();

  // Redirect to the initial page
  res.redirect("/files");
};

// Get all files
const getFiles = async (req, res) => {
  try {
    const images = await Image.find();
    console.log(images);

    res.render("files", {
      images,
      title: "Getting Files",
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
