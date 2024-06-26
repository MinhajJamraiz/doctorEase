const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const logger = require("../utils/logger");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  //1>See if user Exists already.
  //Done in model as Email is unique and self validated by mongoose.

  //2>Get user Gravatar
  // const avatar = gravatar.url(email, {
  //   s: "200",
  //   r: "pg",
  //   d: "mm",
  // });

  const newUser = await User.create({
    name,
    email,
    password,
  });
  //3>Encrypt password
  //Password encrypted using pre hook in user Model.
  //4>return JSON web token
  createSendToken(newUser, 201, res);
  logger.info("User signup successful");
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1> Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide Email and Password.", 400));
  }
  //2> Check if user exsists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect Email or Password", 401));
  }

  //3> If everything is OK , send token to client
  createSendToken(user, 200, res);

  logger.info("User Login Successful.");
});

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1> Get user from collection.
  const user = await User.findById(req.body.id).select("+password");

  //2> Check if posted current password is correct.
  if (!(await user.correctPassword(req.body.password, user.password))) {
    return next(new AppError("Incorrect current password.", 401));
  }
  //3> If so, update the password.
  user.password = req.body.newPassword;

  await user.save();
  //4> Login User and send JWT.
  createSendToken(user, 200, res);

  logger.info("Password Update Successful.");
});
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  user.password = undefined;
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
  });
};

// exports.verify = catchAsync(async (req, res, next) => {
//   //Verifying User using the JWT token.
//   //Get Token from the header.
//   const token = req.headers("x-auth-token");

//   //Check if no Token.
//   if (!token) {
//     return res.status(401).json({
//       message: "NO token found. Authorization Denied.",
//     });
//   }
//   const decoded
// });

exports.auth = catchAsync(async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return next(
      new AppError("You are not logged In. Please login to continue ", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (user.passwordChangedAfter(decoded.iat)) {
    return next(new AppError("Password Changed. Please login again. ", 401));
  }
  req.user = decoded;
  return next();
});

exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
  });
  logger.info("User Logout Successful.");
  res.status(200).json({
    status: "success",
    token: "",
  });
};
