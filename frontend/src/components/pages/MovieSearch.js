// MovieSearch.js
import React, { useState } from "react";
import styles from "../../css/favoriteMovie.module.css";
import searchTMDb from "../../utilities/searchTMDb";
import SearchBar from "../searchbar/SearchBar";
import MovieGrid from "../movieGrid/MovieGrid";
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

        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
        />

        {loading && <p style={{ color: "white" }}>Loading...</p>}
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

        {results.length > 0 && (
          <MovieGrid
            results={results}
            FavoriteButton={FavoriteButton}
          />
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
