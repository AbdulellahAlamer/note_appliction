const Notes = require("../module/notesModel");
const User = require("../module/userModule");
const AppError = require("./AppError");
exports.getAll = async function (req, res) {
  let data;
  if (req.user.role === "admin") {
    data = await Notes.find();
  } else {
    data = await User.findById(req.user._id).populate("notes");
    data = data.notes;
  }
  res.status(200).json({
    status: "sucsess",
    Notes: data.length,
    data: data,
  });
};

exports.createOne = async function (req, res) {
  const { title, Description } = req.body;
  const create = await Notes.create({
    note: title,
    noteDescription: Description,
    createAt: Date.now(),
  });
  const addNote = await User.findByIdAndUpdate(req.user._id, {
    $push: { notes: create.id },
  });
  res.status(200).json({
    status: "sucsess",
    data: create,
  });
};

exports.deleteOne = async function (req, res, next) {
  try {
    const note = await Notes.findByIdAndDelete(req.params.id);
    const userNotes = await User.findByIdAndUpdate(
      { _id: req.user._id.toString() },
      { $pull: { notes: req.params.id } } // $pull romves the note in the array
    );
    console.log(req.params.id, "has been deleted");
    res.status(200).json({
      status: "sucsess",
    });
  } catch (err) {
    console.log(err.message);
    next(new AppError("somthing went wronge, please try again"));
  }
};
