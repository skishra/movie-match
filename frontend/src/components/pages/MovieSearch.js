import React, { useState } from "react";
import styles from "../../css/favoriteMovie.module.css";
import searchTMDb from "../../utilities/searchTMDb";
import FavoriteButton from "../buttons/FavoriteButton";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const movies = await searchTMDb(query);
      setResults(movies);
    } catch (error) {
      setErrorMsg("Something went wrong. Try again.");
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["page-wrapper"]}>
      <div className={styles["content-inner"]}>
        <h1 className={styles["title"]}>Search Movies 🎬</h1>

        <form onSubmit={handleSearch} style={{ width: "100%", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "10px 15px",
              fontSize: "16px",
              width: "80%",
              maxWidth: "500px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginRight: "10px"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#b2310b",
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Search
          </button>
        </form>

        {loading && <p style={{ color: "white" }}>Loading...</p>}
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

        {results.length > 0 && (
          <div className={styles["movie-grid"]}>
            {results.map((movie) => (
              <div className={styles["movie-card"]} key={movie.id}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className={styles["movie-poster"]}
                />
                <div className={styles["movie-info"]}>
                  <p className={styles["movie-title"]}>{movie.title}</p>
                  <p className={styles["movie-plot"]}>Year: {movie.year}</p>
                  <p className={styles["movie-description"]}>
                    {movie.overview
                      ? movie.overview.split(" ").slice(0, 25).join(" ") + (movie.overview.split(" ").length > 50 ? "..." : "")
                      : "No description available."}
                  </p>
                  <FavoriteButton movie={movie} /> {/* Use FavoriteButton component here */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
