const express = require("express");

const diagnosisReportController = require("../controller/diagnosisReportController");

const router = express.Router();

router.get("/getAll", diagnosisReportController.getAll);
router.post("/create", diagnosisReportController.create);
router.post("/getUserReports", diagnosisReportController.getUserReports);

module.exports = router;
