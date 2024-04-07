const express = require("express");
const authController = require("../controller/authController");
const reportController = require("../controller/reportController");

const router = express.Router();

router.post("/reports", reportController.userReports);

module.exports = router;
