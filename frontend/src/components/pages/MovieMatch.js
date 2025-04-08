import React, { useState } from "react";
import "../../css/MovieMatch.css";

const MovieMatch = () => {
  const [genre, setGenre] = useState("Horror");
  const [movie, setMovie] = useState({
    title: "La La Land",
    year: 2016,
    image:
      "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png",
    description:
      "A jazz musician and an aspiring actress fall in love in Los Angeles.",
  });

  const user = {
    profilePicture: "https://via.placeholder.com/40", // Replace with actual profile picture URL
    name: "John Doe",
  };

  const handleProfileClick = () => {
    alert("Profile dropdown clicked! Add your functionality here.");
  };

  return (
    <div className="movie-match-container">
      {/* Profile Picture in Top-Right Corner */}
      <div className="profile-container" onClick={handleProfileClick}>
        <img src={user.profilePicture} alt="Profile" />
        <span>{user.name}</span>
      </div>

      {/* Title */}
      <h1 className="title">Movie Match</h1>

      {/* Genre Selection */}
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

      {/* Movie Card */}
      <div className="movie-card">
        <img src={movie.image} alt={movie.title} />
        <div className="movie-card-content">
          <h2>
            {movie.title} ({movie.year})
          </h2>
          <p>{movie.description}</p>

          {/* Buttons */}
          <div className="button-container">
            {/* Dislike Button */}
            <button className="btn-dislike">❌</button>

            {/* Like Button */}
            <button className="btn-like">✅</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="footer">
        Designed by Yannie - SK - Trevor
      </p>
    </div>
  );
};

export default MovieMatch;
