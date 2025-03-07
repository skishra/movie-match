const mongoose = require("mongoose");
// favorite movies schema/model
const favoriteMoviesSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      label: "Title",
    },
    Year: {
      type: String,
      required: true,
      label: "Year",
    },
    imdbID: {
      type: String,
      required: true,
      label: "imdbID",
    },
    Type: {
      type: String,
      required: true,
      label: "Type",
    },
    Poster: {
      type: String,
      required: true,
      label: "Poster",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      label: "User ID",
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "favoriteMovies" }
);

module.exports = mongoose.model("favoriteMovies", favoriteMoviesSchema);
