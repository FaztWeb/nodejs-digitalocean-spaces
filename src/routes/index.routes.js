const { Router } = require("express");
const router = Router();

const {
  uploadFile,
  getFiles,
  getSingleFile,
} = require("../controllers/index.controller");


router.post("/upload", uploadFile);

router.get("/files", getFiles);

router.get("/file/:filename", getSingleFile);

module.exports = router;
