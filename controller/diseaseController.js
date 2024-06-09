const catchAsync = require("./../utils/catchAsync");
const Disease = require("./../models/diseaseModel");
const logger = require("./../utils/logger");

exports.getAll = catchAsync(async (req, res, next) => {
  //To allow for nested get reviews on our Tour

  //EXECUTE QUERY
  const diseases = await Disease.find();

  //SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: diseases.length,
    diseases,
  });
  logger.info("All Diseases fetched Successfully.");
});
exports.get = catchAsync(async (req, res, next) => {
  //To allow for nested get reviews on our Tour

  //EXECUTE QUERY
  const diseases = await Disease.find({ name: req.body.name });

  //SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: diseases.length,
    diseases,
  });
  logger.info("Named Diseases fetched Successfully.");
});
exports.create = catchAsync(async (req, res, next) => {
  const newDisease = await Disease.create(req.body);
  res.status(201).json({
    status: "success",
    newDisease,
  });
  logger.info("New Disease successfully Added");
});
