const mongoose = require("mongoose");
const { Schema } = mongoose;

var userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    googleId: {
      type: String,
    },
    picture: {
      type: String,
    },
    searchQuries: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
