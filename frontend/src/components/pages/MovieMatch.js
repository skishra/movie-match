import React, { useState } from "react";

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
      {/* Profile Picture in Top-Right Corner */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleProfileClick}
      >
        <img
          src={user.profilePicture}
          alt="Profile"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <span style={{ color: "#fff", fontSize: "14px" }}>{user.name}</span>
      </div>

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
          src={movie.image}
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