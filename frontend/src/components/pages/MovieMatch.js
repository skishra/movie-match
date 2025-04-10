import React, { useState } from "react";
import axios from "axios";
import getUserInfo from "../../utilities/decodeJwt";

const MovieMatch = () => {
  const [genre, setGenre] = useState("Horror");
  const [movie, setMovie] = useState({
    id: "123", // Example movie ID
    title: "La La Land",
    year: 2016,
    type: "movie",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png",
    description:
      "A jazz musician and an aspiring actress fall in love in Los Angeles.",
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteMovieId, setFavoriteMovieId] = useState(null);

  const user = getUserInfo(); // Get user info from the JWT

  const toggleFavorite = async () => {
    if (!user) {
      alert("Please log in to save favorites.");
      return;
    }

    try {
      if (!isFavorite) {
        // Add to favorites
        const res = await axios.post("/favoriteMovies/addFavoriteMovie", {
          userId: user?.id,
          id: movie.id,
          title: movie.title,
          year: movie.year,
          type: movie.type,
          poster: movie.poster,
        });
        setIsFavorite(true);
        setFavoriteMovieId(res.data._id); // Save MongoDB _id for deletion
      } else {
        // Remove from favorites
        await axios.delete(
          `/favoriteMovies/deleteFavoriteMoviesById/${favoriteMovieId}`
        );
        setIsFavorite(false);
        setFavoriteMovieId(null);
      }
    } catch (err) {
      console.error("Favorite toggle error:", err.response?.data || err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #3a0d0d 70%, #b2310b 30%)",
        position: "relative",
      }}
    >
      {/* Title */}
      <h1
        style={{
          color: "#f4c430",
          fontSize: "3.5rem",
          marginTop: "1.5rem",
          fontFamily: "Borel, cursive",
        }}
      >
        Movie Match
      </h1>

      {/* Genre Selection */}
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      >
        <option value="Horror">Horror</option>
        <option value="Comedy">Comedy</option>
        <option value="Action">Action</option>
        <option value="Romance">Romance</option>
      </select>

      {/* Movie Card */}
      <div
        style={{
          backgroundColor: "#fff",
          width: "300px",
          borderRadius: "10px",
          overflow: "hidden",
          textAlign: "center",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
        <div style={{ padding: "15px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
            {movie.title} ({movie.year})
          </h2>
          <p style={{ color: "#555", fontSize: "14px" }}>{movie.description}</p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginTop: "10px",
            }}
          >
            {/* Dislike Button */}
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ❌
            </button>

            {/* Like Button */}
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "10px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ✅
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p style={{ color: "#fff", fontSize: "12px", marginTop: "20px" }}>
        Designed by Yannie - SK - Trevor
      </p>
    </div>
  );
};

export default MovieMatch;