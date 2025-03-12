const express = require("express");
const router = express.Router();
const newFavoriteMovieModel = require("../models/favoriteMoviesModel");

router.delete(
  "/favoriteMovies/deleteFavoriteMoviesById/:id",
  async (req, res) => {
    const { id: movieId } = req.params; // Retrieve movieId from URL params

    try {
      // Attempt to delete the favorite movie
      const deletedMovie = await newFavoriteMovieModel.findByIdAndDelete(
        movieId
      );

      if (!deletedMovie) {
        return res.status(404).json({ message: "Favorite movie not found" });
      }

      return res.json({
        message: "Favorite movie deleted successfully",
        deletedMovie,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
