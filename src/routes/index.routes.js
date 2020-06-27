const { Router } = require("express");
const router = Router();

const indexCtrl = require("../controllers/index.controller");

router.get("/", indexCtrl.renderIndex);

router.post("/upload", indexCtrl.uploadFile);

router.get("/files", indexCtrl.getFiles);

router.get("/file/:filename", indexCtrl.getSingleFile);

module.exports = router;
