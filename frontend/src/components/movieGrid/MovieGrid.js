// MovieGrid.js
import React from "react";
import styles from "../../css/favoriteMovie.module.css";

/**
 * MovieGrid component renders a grid of movie cards.
 *
 * @param {Object[]} results – array of movie objects
 * @param {React.ComponentType<{movie: Object}>} FavoriteButton – component to render a favorite button
 */
const MovieGrid = ({ results, FavoriteButton }) => (
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
              ? movie.overview
                  .split(" ")
                  .slice(0, 25)
                  .join(" ") +
                (movie.overview.split(" ").length > 50 ? "..." : "")
              : "No description available."}
          </p>
          {FavoriteButton && <FavoriteButton movie={movie} />}
        </div>
      </div>
    ))}
  </div>
);

export default MovieGrid;
