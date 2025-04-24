// SearchBar.js
import React from "react";
import styles from "../../css/favoriteMovie.module.css";

const SearchBar = ({ query, onQueryChange, onSearch }) => (
  <form onSubmit={onSearch} style={{ width: "100%", marginBottom: "20px" }}>
    <input
      type="text"
      placeholder="Search for a movie..."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      style={{
        padding: "10px 15px",
        fontSize: "16px",
        width: "80%",
        maxWidth: "500px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginRight: "10px",
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
        cursor: "pointer",
      }}
    >
      Search
    </button>
  </form>
);

export default SearchBar;
