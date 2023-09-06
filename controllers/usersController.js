const Users = require("../module/userModule");

exports.getAllUsers = async (req, res, next) => {
  const data = await Users.find();
  res.status(200).json({
    status: "sucsess",
    Users: data.length,
    data: data,
  });
};
exports.getUser = async (req, res, next) => {
  const user = await Users.find({ email: req.user.email });
  res.status(200).json({
    status: "sucsess",
    user: user,
  });
};

exports.getUserByEmail = async (req, res, next) => {
  const user = await Users.find({ email: req.params.email }).populate("notes");
  res.status(200).json({
    status: "sucsess",
    user: user,
  });
};
