const { Router } = require("express");
const router = Router();

const indexCtrl = require("../controllers/index.controller");
const { upload } = require("../lib/multer");

router.get("/", indexCtrl.renderIndex);

router.post("/upload", upload, indexCtrl.uploadFile);

router.get("/files", indexCtrl.getFiles);

router.get("/file/:filename", indexCtrl.getSingleFile);

module.exports = router;
