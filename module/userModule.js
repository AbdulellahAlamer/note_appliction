const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator"); // is a libary to check the inputs
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "you have to put your email"],
    unique: [true, "you have to put your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  name: {
    type: String,
    required: [true, "you have to put your name"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  // register: [{ type: mongoose.Schema.ObjectId, ref: "Register" }],
  notes: [{ type: mongoose.Schema.ObjectId, ref: "notes" }],

  password: {
    type: String,
    required: [true, "you have to put password"],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "you have to put password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password does not match",
    },
  },
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  // check if the password is correct with the input
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
