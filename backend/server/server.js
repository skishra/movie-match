const express = require("express");
const app = express();
const cors = require("cors");
const loginRoute = require("./routes/userLogin");
const getAllUsersRoute = require("./routes/userGetAllUsers");
const registerRoute = require("./routes/userSignUp");
const getUserByIdRoute = require("./routes/userGetUserById");
const dbConnection = require("./config/db.config");
const editUser = require("./routes/userEditUser");
const deleteUser = require("./routes/userDeleteAll");
const addFavoriteMovie = require("./routes/favoriteMovieCreateMovie");
const getAllFavoriteMovies = require("./routes/favoriteMoviesGetAll");
const deleteFavoriteMoviesById = require("./routes/favoriteMovieDeleteMovieById");
const updateFavoriteMovie = require("./routes/FavoriteMovieUpdateMovie");
const addGenre = require("./routes/genresAddGenre");
const getAllGenres = require("./routes/genresGetAll");
const deleteUserById = require("./routes/userDeleteById");

require("dotenv").config();
const SERVER_PORT = 8081;

dbConnection();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/user", loginRoute);
app.use("/user", registerRoute);
app.use("/user", getAllUsersRoute);
app.use("/user", getUserByIdRoute);
app.use("/user", editUser);
app.use("/user", deleteUser);
app.use("/favoriteMovies", addFavoriteMovie);
app.use("/favoriteMovies", getAllFavoriteMovies);
app.use("/favoriteMovies", deleteFavoriteMoviesById);
app.use("/favoriteMovies", updateFavoriteMovie);
app.use("/genres", addGenre);
app.use("/genres", getAllGenres);
app.use("/user", deleteUserById);

app.listen(SERVER_PORT, (req, res) => {
  console.log(
    `The backend service is running on port ${SERVER_PORT} and waiting for requests.`
  );
});
