const mongoose = require("mongoose");

//user schema/model
const newUserSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      label: "title",
    },
    year: {
      type: String,
      required: true,
      label: "email",
    },
    id: {
      required: true,
      type: String,
      min : 8
    },
    type: {
      type: Date,
      default: Date.now,
    },
    poster: {
        required: true,
        type: String,
        min : 8
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model('users', newUserSchema)