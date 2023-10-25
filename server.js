const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

// handle the exception Error golbly and exit the app
// we put this catch error in the top to lisent to any error
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// connecting with the database
mongoose.connect(DB).then(() => console.log("DB connection successful!"));

// start listening
const server = app.listen(process.env.PORT, () => {
  console.log("listening.. port :", process.env.PORT);
});

// handle the REJECTION Error golbly and exit the app
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
