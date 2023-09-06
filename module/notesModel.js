const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  note: {
    type: String,
  },
  noteDescription: {
    type: String,
  },
  createAt: { type: Date, default: Date.now },
});
const Notes = mongoose.model("notes", noteSchema);

module.exports = Notes;
