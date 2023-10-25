const Users = require("../module/userModule");
const authController = require("./authController");

exports.loginPage = async (req, res, next) => {
  res.status(200).render("login");
};
// Task >> build a functoin for the admin page
exports.homePage = async (req, res, next) => {
  // working with admin apge
  // if (req.user.role == "admin") {
  //   this.adminPage(req, res, next);
  //   return;
  // }
  const data = await req.user.populate("notes");

  res.status(200).render("notePage", { notes: data.notes.reverse() });
};

// exports.adminPage = async (req, res, next) => {
//   res.status(200).render("admin_homePage");
// };
