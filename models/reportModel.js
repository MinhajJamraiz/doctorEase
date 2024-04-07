const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  user: {
    type: String,
    required: [true, "A user must have a name"],
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
