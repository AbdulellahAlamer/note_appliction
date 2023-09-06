const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

// make a button to logout from the homepage(return to login page)
// router.use(authController.isLoggedIn);
router.get("/", viewController.loginPage);

router.get("/homePage", authController.protect, viewController.homePage);

module.exports = router;
