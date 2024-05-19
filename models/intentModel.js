const mongoose = require("mongoose");

const intentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "An intent must have a name"],
  },
  examples: [{ type: String }],
  action: {
    type: String,
    default: null,
  },
  affirmativeAction: { type: String, default: null },
  negativeAction: { type: String, default: null },
  diagnosis: { type: String },
  status: {
    type: String,
    enum: {
      values: ["red", "yellow", "green"],
      message: 'A status can only be "red","yellow" or "green".',
    },
  },
});

const Intent = mongoose.model("Intent", intentSchema);
module.exports = Intent;
