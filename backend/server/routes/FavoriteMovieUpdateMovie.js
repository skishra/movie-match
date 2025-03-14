const express = require("express");
const router = express.Router();
const favoriteMoviesModel = require("../models/favoriteMoviesModel");
const newUserModel = require("../models/userModel");

// PUT route to update a favorite movie
router.put("/updateFavoriteMovie", async (req, res) => {
  const { userId, title, year, id, type, poster } = req.body;

  // Check if the user exists
  const user = await newUserModel.findById(userId);
  if (!user) return res.status(404).send({ message: "User not found" });

  // Find the existing favorite movie
  const existingMovie = await favoriteMoviesModel.findOne({ userId, id });
  if (!existingMovie)
    return res.status(404).send({ message: "Favorite movie not found" });

  // Update the favorite movie details
  existingMovie.title = title || existingMovie.title;
  existingMovie.year = year || existingMovie.year;
  existingMovie.type = type || existingMovie.type;
  existingMovie.poster = poster || existingMovie.poster;

  try {
    const updatedMovie = await existingMovie.save();
    res.send(updatedMovie);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error updating favorite movie", error: error.message });
  }
});

module.exports = router;