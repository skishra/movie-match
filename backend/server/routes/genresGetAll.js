const express = require("express");
const router = express.Router();
const newGenresModel = require('../models/genresModel')

router.get('/getAll', async (req, res) => {
    const genre = await newGenresModel.find();
    return res.json(genre)
  })

  module.exports = router;