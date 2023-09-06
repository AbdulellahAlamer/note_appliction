const express = require("express");
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.use(authController.protect);
router.get(
  "/all",
  authController.restrictTo("admin"),
  usersController.getAllUsers
);
router.get(
  "/getuser/:email",
  authController.restrictTo("admin"),
  usersController.getUserByEmail
);
router.get("/me", usersController.getUser);

module.exports = router;
