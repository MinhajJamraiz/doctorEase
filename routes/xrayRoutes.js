const express = require("express");
const multer = require("multer");
const xrayController = require("./../controller/xrayController");

const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

router.post("/predict", xrayController.handlePredict);

module.exports = router;
