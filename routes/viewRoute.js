const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

router.get("/", viewController.loginPage);

router.get("/homePage", authController.protect, viewController.homePage);

module.exports = router;
