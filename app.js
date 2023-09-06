const express = require("express");
const path = require("path");
const UsersRoute = require("./routes/usersRoute");
const ViewRoute = require("./routes/viewRoute");
const notesRoute = require("./routes/notesRoute");
const cookieParser = require("cookie-parser");
const app = express();
const AppError = require("./controllers/AppError");
const globalErrorHandler = require("./controllers/errorController");
const helmet = require("helmet");

app.use(helmet());
app.enable("trust proxy");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieParser());

app.use("/api/v1/users", UsersRoute);
app.use("/api/v1/notes", notesRoute);
app.use("/", ViewRoute);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log("checking for cookies");
  // console.log(req.cookies);
  next();
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
