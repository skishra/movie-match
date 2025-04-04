const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

//user schema/model
const newGenresSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      label: "type",
    },
    // status: {
    //   type: Number,
    //   required: true,
    //   enum: [0, 1], //0 = inactive, 1 = active
    //   label: "Status",
    // },
  },
  { collection: "genres" }
);

module.exports = mongoose.model("genres", newGenresSchema);
