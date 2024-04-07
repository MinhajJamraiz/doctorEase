const Report = require("./../models/reportModel");

exports.userReports = async (req, res, next) => {
  const userReports = await Report.find({ user: req.user.id });
};
