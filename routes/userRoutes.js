const express = require("express");

const authController = require("../controller/authController");
const userController = require("../controller/userController");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.patch("/updateMyPassword", authController.updatePassword);

module.exports = router;
