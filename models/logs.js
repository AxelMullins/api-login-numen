const mongoose = require("mongoose");
const { Schema } = mongoose;

const logsSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  type: {
    type: String,
    enum: ["login", "logout"],
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Log = mongoose.model("Log", logsSchema);
module.exports = { Log };
