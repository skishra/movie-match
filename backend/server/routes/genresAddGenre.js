const express = require("express");
const router = express.Router();
const genresModel = require("../models/genresModel");

// POST route to add a favorite movie
router.post("/addGenre", async (req, res) => {
  const { type } = req.body;

  // Create a new genre  entry
  const newGenre = new genresModel({
    type,
  });

  try {
    const savedGenre = await newGenre.save();
    res.send(savedGenre);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error adding genre", error: error.message });
  }
});

module.exports = router;
