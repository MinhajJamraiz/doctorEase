const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists. Please use a different email."],
    required: [true, "A user must have a email"],
    lowercase: true,
    validate: [validator.isEmail, "Email format is Invalid"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: {
      values: ["patient", "admin", "doctor"],
      message: 'A person can only be "patient","admin"or "doctor"',
    },
    default: "patient",
  },
  profileImage: {
    type: String,
    default: "profile.png",
  },
  passwordChangedAt: {
    type: Date,
  },
});
userSchema.pre("save", async function (next) {
  //Only run this function if password was modified.
  if (!this.isModified("password")) return next();

  //Hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.pre(/^find/, function (next) {
  //Find above is a regular expression.It is used so that all functions starting with find are included in it.
  this.find({ active: { $ne: false } });
  next();
});
userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10 //base of ParseInt
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
