const express = require("express");

const reportAnalysisController = require("../controller/reportAnalysisController");

const router = express.Router();

// router.post("/predict", upload.single("xray"), xrayController.handlePredict);
router.post(
  "/analyze",
  reportAnalysisController.uploadReport,
  reportAnalysisController.reportAnalysis
);

module.exports = router;
