const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A report must have a user ID"],
  },
  description: {
    type: String,
  },
  name: {
    type: String,
  },
  action: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: {
      values: ["green", "yellow", "red"],
      message: "A reports status can only be Green, Yellow or Red",
    },
  },
});

reportSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
