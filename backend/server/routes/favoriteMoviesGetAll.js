const express = require("express");
const router = express.Router();
const newFavoriteMoviesModel = require("../models/favoriteMoviesModel");

router.get("/getAll", async (req, res) => {
  try {
    const { userId, limit } = req.query;
    let query = {};
//filtering using the userId
    if (userId) {
      query.userId = userId;
    }

    let favoriteMovies = newFavoriteMoviesModel.find(query).sort({ dateAdded: -1 });

//applying a limit if provided 
    if (limit && !isNaN(limit) && parseInt(limit) > 0) {
      favoriteMovies = favoriteMovies.limit(parseInt(limit));
    }

    const result = await favoriteMovies;
    return res.json(result);
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;

