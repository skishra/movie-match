const mongoose = require("mongoose");
// favorite movies schema/model
const favoriteMoviesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      label: "Title",
    },
    year: {
      type: String,
      required: true,
      label: "Year",
    },
    id: {
      type: String,
      required: true,
      label: "Movie ID",
    },
    type: {
      type: String,
      required: true,
      label: "Type",
    },
    poster: {
      type: String,
      required: true,
      label: "Poster",
    },
    plot: {
      type: String,
      required: true,
      label: "Plot",
    },
    genre: {
      type: String,
      required: true,
      label: "Genre",
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
