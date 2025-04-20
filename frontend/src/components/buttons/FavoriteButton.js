import React from "react";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt";
import styles from "../../css/favoriteMovie.module.css";

const FavoriteButton = ({ movie }) => {
  const user = getUserInfo();
  const userId = user?.id;

  const handleFavorite = async () => {
    if (!userId) {
      alert("Please log in to add favorites.");
      return;
    }

    const movieToSave = {
      userId: user.id,
      id: movie.id,
      title: movie.title,
      year: movie.year,
      type: movie.type || "movie",
      poster: movie.poster,
      genre: movie.genre || "Unknown",
      plot: movie.overview || "No plot available",
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/favoriteMovies/addFavoriteMovie`,
        movieToSave
      );
      alert("Movie added to favorites!");
    } catch (err) {
      console.error("Add favorite error:", err);
      if (err.response?.status === 409) {
        alert("This movie is already in your favorites.");
      } else {
        alert("Failed to add movie to favorites.");
      }
    }
  };

  return (
    <button
      className={styles["love-button"]}
      onClick={handleFavorite}
    >
      +
    </button>
  );
};

export default FavoriteButton;
