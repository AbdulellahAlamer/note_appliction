const express = require("express");
const router = express.Router();
const notesContrlloer = require("../controllers/notesController");
const authController = require("../controllers/authController");

router.use(authController.protect);
router.get("/", notesContrlloer.getAll);
// Task >> build a new route for editing the note >>>>

router.delete("/:id", notesContrlloer.deleteOne);

router.post("/", notesContrlloer.createOne);

module.exports = router;
