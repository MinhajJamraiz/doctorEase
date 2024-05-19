const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");
const logger = require("./../utils/logger");

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
