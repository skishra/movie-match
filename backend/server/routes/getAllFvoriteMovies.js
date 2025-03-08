const express = require("express");
const router = express.Router();
const newFavoriteMoviesModel = require("../models/favoriteMoviesModel");

router.get("/getAll", async (req, res) => {
  const favoriteMovies = await newFavoriteMoviesModel.find();
  return res.json(favoriteMovies);
});

module.exports = router;
