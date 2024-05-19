const express = require("express");
const jwt = require("jsonwebtoken");
const authController = require("./../controller/authController");
const User = require("./../models/userModel");

const router = express.Router();

router.get("/", authController.auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error.");
  }
});
// router.get("/", authController.protect, (req, res) => {
//   res.send("AUth PRotect");
// });

router.post("/");

module.exports = router;
