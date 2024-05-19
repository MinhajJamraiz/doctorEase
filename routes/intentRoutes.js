const express = require("express");
const intentController = require("./../controller/intentController");

const router = express.Router();
router.route("/").get(intentController.getAll).post(intentController.create);

// router.post("/signup", authController.signup);
// router.post("/login", authController.login);
// router.post("/logout", authController.logout);

module.exports = router;
