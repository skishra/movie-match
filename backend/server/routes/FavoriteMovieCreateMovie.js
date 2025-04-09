const express = require("express");
const router = express.Router();
const favoriteMoviesModel = require("../models/favoriteMoviesModel");
const newUserModel = require("../models/userModel");

// POST route to add a favorite movie
router.post("/addFavoriteMovie", async (req, res) => {
  const { userId, title, year, id, type, poster, genre, plot } = req.body;

  // Check if the user exists
  const user = await newUserModel.findById(userId);
  if (!user) return res.status(404).send({ message: "User not found" });

  // Check if the movie is already in favorites (optional)
  const existingMovie = await favoriteMoviesModel.findOne({ userId, id });
  if (existingMovie)
    return res.status(409).send({ message: "Movie already in favorites" });

  // Create a new favorite movie entry
  const newFavoriteMovie = new favoriteMoviesModel({
    userId,
    title,
    year,
    id,
    type,
    poster,
    genre,
    plot,
  });

  try {
    const savedMovie = await newFavoriteMovie.save();
    res.send(savedMovie);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error adding favorite movie", error: error.message });
  }
});

module.exports = router;
