const express = require("express");
const authController = require("../controller/authController");
const reportController = require("../controller/reportController");

const router = express.Router();

router.post("/create", reportController.create);
router.get("/getAll", reportController.getAll);
router.get("/getUserReports", reportController.getUserReports);

module.exports = router;
