import React, { useState } from "react";
import axios from "axios";
import "../../css/MovieMatch.css";
import searchOMDb from "../../utilities/searchOMDb"; // Import your searchOMDb function

const MovieMatch = () => {
  const [genre, setGenre] = useState("Horror");
  const [movie, setMovie] = useState({
    id: "123", // Add unique ID for backend reference
    title: "La La Land",
    year: 2016,
    type: "movie",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png",
    description:
      "A jazz musician and an aspiring actress fall in love in Los Angeles.",
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteMovieId, setFavoriteMovieId] = useState(null); // Store DB _id if saved

  const user = {
    id: "userId123", // Replace with actual user ID
    profilePicture: "https://via.placeholder.com/40",
    name: "John Doe",
  };

  const handleProfileClick = () => {
    alert("Profile dropdown clicked! Add your functionality here.");
  };

  const toggleFavorite = async () => {
    if (!isFavorite) {
      // Add to favorites
      try {
        const res = await axios.post("/favoriteMovies/addFavoriteMovie", {
          userId: user.id,
          id: movie.id,
          title: movie.title,
          year: movie.year,
          type: movie.type,
          poster: movie.poster,
        });
        setIsFavorite(true);
        setFavoriteMovieId(res.data._id); // Save the MongoDB _id for deletion
      } catch (err) {
        console.error("Error adding favorite:", err.response?.data || err);
      }
    } else {
      // Remove from favorites
      try {
        await axios.delete(`/favoriteMovies/deleteFavoriteMoviesById/${favoriteMovieId}`);
        setIsFavorite(false);
        setFavoriteMovieId(null);
      } catch (err) {
        console.error("Error removing favorite:", err.response?.data || err);
      }
    }
  };

  searchOMDb('batman')
  .then(results => {
    console.log('Search results:', results);
  })
  .catch(err => {
    console.error('Search failed:', err);
  });

  return (
    <div className="movie-match-container">
      {/* Profile Picture */}
      <div className="profile-container" onClick={handleProfileClick}>
        <img src={user.profilePicture} alt="Profile" />
        <span>{user.name}</span>
      </div>

      <h1 className="title">Movie Match</h1>

      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="genre-select"
      >
        <option value="Horror">Horror</option>
        <option value="Comedy">Comedy</option>
        <option value="Action">Action</option>
        <option value="Romance">Romance</option>
      </select>

      <div className="movie-card">
        <img src={movie.poster} alt={movie.title} />
        <div className="movie-card-content">
          <h2>
            {movie.title} ({movie.year})
          </h2>
          <p>{movie.description}</p>

          {/* Favorite Toggle */}
          <button
            onClick={toggleFavorite}
            className="btn-favorite"
            style={{ fontSize: "1.5rem", background: "none", border: "none", cursor: "pointer" }}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>

          <div className="button-container">
            <button className="btn-dislike">❌</button>
            <button className="btn-like">✅</button>
          </div>
        </div>
      </div>

      <p className="footer">Designed by Yannie - SK - Trevor</p>
    </div>
  );
};

export default MovieMatch;
