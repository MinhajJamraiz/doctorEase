const catchAsync = require("./../utils/catchAsync");
const Intent = require("./../models/intentModel");
const logger = require("./../utils/logger");

exports.getAll = catchAsync(async (req, res, next) => {
  //To allow for nested get reviews on our Tour

  //EXECUTE QUERY
  const intents = await Intent.find();

  //SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: intents.length,
    intents,
  });
  logger.info("All Intents fetched Successfully.");
});

exports.create = catchAsync(async (req, res, next) => {
  const newIntent = await Intent.create(req.body);

  res.status(201).json({
    status: "success",
    newIntent,
  });
  logger.info("New Intent successfully Created");
});
