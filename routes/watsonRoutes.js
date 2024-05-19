const express = require("express");
const watsonController = require("./../controller/watsonController");

const router = express.Router();
router.post("/message", watsonController.processMessage);
// router.post("/signup", authController.signup);
// router.post("/login", authController.login);
// router.post("/logout", authController.logout);

module.exports = router;
