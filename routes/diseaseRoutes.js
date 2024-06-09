const express = require("express");

const diseaseController = require("../controller/diseaseController");

const router = express.Router();

router.get("/getAll", diseaseController.getAll);
router.post("/get", diseaseController.get);
router.post("/create", diseaseController.create);

module.exports = router;
