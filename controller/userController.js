const catchAsync = require("./../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");
const User = require("./../models/userModel");
const logger = require("./../utils/logger");
const AppError = require("./../utils/appError");

// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/users"); // Null is error parameter
//   },
//   filename: function (req, file, cb) {
//     const extension = file.mimetype.split("/")[1];
//     cb(null, `user-${req.body.id}-${Date.now()}.${extension}`); // Null is an error Parameter
//   },
// });
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true); // Null is error parameter
  } else {
    cb(new AppError("Not an Image!  Please upload only Images.", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("profileImage");

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();
  const extension = req.file.mimetype.split("/")[1];
  req.file.filename = `user-${req.body.id}-${Date.now()}.${extension}`;
  console.log("Made it here . Resize");
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFile(`client/src/components/images/users/${req.file.filename}`);
  next();
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  //To allow for nested get reviews on our Tour

  //EXECUTE QUERY
  const users = await User.find();

  //SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
  logger.info("All Users fetched Successfully.");
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //1>Create Error if user POSTs password data
  if (req.body.password || req.body.newPassword) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword Route.",
        400 //Bad request,
      )
    );
  }

  //2> Filter out unwanted field names that are not allowed to be updated.
  const filteredBody = filterObj(req.body, "name");

  if (req.file) {
    filteredBody.profileImage = req.file.filename;
  }
  const updatedUser = await User.findByIdAndUpdate(req.body.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  logger.info("User Data update Successful.");

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// Remove Extra Fields or Unwanted fields from the body Object for security
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
