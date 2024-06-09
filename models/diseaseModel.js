const mongoose = require("mongoose");

const diseaseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A disease must have a name."],
  },
  symptoms: [
    {
      type: String,
      required: [true, "A disease must have some symptoms."],
    },
  ],
  prevention: {
    type: String,
  },
  solution: {
    type: String,
  },
});

const Disease = mongoose.model("Disease", diseaseSchema);
module.exports = Disease;
