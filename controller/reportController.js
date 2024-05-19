const catchAsync = require("../utils/catchAsync");
const Report = require("./../models/reportModel");
const logger = require("./../utils/logger");
const AppError = require("./../utils/appError");

exports.create = catchAsync(async (req, res, next) => {
  const newReport = await Report.create(req.body);
  res.status(201).json({
    status: "success",
    newReport,
  });
  logger.info("New Report successfully Created");
});

exports.getAll = catchAsync(async (req, res, next) => {
  //EXECUTE QUERY

  const reports = await Report.find();
  if (!reports) {
    return next(new AppError("No Reports found with in the database ", 404));
  }

  //SEND RESPONSE

  res.status(200).json({
    status: "success",
    results: reports.length,
    reports,
  });
  logger.info("All Reports fetched Successfully.");
});

exports.getUserReports = catchAsync(async (req, res, next) => {
  const reports = await Report.find({ user: req.body.user });

  if (!reports[0]) {
    return next(new AppError("This user does not have any reports. ", 404));
  }

  // if (reports.kind === "ObjectId") {
  //   return next(new AppError("Invalid user ID found. ", 404));
  // }

  //SEND RESPONSE

  res.status(200).json({
    status: "success",
    results: reports.length,
    reports,
  });
  logger.info("User Reports fetched Successfully.");
});
