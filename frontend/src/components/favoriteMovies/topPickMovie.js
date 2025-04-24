import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/topPickMovie.module.css";

const TopPickMovie = ({ userId }) => {
  const [topMovie, setTopMovie] = useState(null);
  const [bottomMovies, setBottomMovies] = useState([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/favoriteMovies/getAll",
          {
            params: { userId },
          }
        );

        const [first, ...rest] = response.data;
        setTopMovie(first);
        setBottomMovies(rest);
      } catch (error) {
        console.error("Failed to fetch favorite movies:", error);
      }
    };

    fetchFavoriteMovies();
  }, [userId]);

  const handleThumbUp = () => {
    if (bottomMovies.length === 0) return;

    const nextMovie = bottomMovies[0];
    const updatedBottom = [...bottomMovies.slice(1), topMovie];

    setTopMovie(nextMovie);
    setBottomMovies(updatedBottom);
  };

  const handleThumbDown = () => {
    if (bottomMovies.length === 0) {
      setTopMovie(null); // Only one left
    } else {
      const nextMovie = bottomMovies[0];
      const updatedBottom = bottomMovies.slice(1);

      setTopMovie(nextMovie);
      setBottomMovies(updatedBottom);
    }
  };

  if (!topMovie) return <p>No movies left to display!</p>;
  const isLastMovie = bottomMovies.length === 0;

  return (
    <div className={styles.container}>
      {/* Top-left Restart button */}
      <div className={styles["top-left-button"]}>
        <button
          className={styles["top-action-button"]}
          onClick={() => window.location.reload()}
        >
          🔄 Restart
        </button>
      </div>

      {/* Top Movie Section */}
      <div className={styles.topMovie}>
        <div className={styles.posterColumn}>
          <img
            src={topMovie.poster}
            alt={topMovie.title}
            className={styles.topPoster}
          />
        </div>

        <div className={styles.infoColumn}>
          <h1>{topMovie.title}</h1>
          <p>
            <strong>Description:</strong>
          </p>
          <p className={styles.plotClamp}>{topMovie.plot}</p>
          <p>
            <strong>Year:</strong> {topMovie.year}
          </p>
        </div>

        {!isLastMovie && (
          <div className={styles.buttonColumn}>
            <button
              className={`${styles.thumbButton} ${styles.thumbUp}`}
              onClick={handleThumbUp}
            >
              👍
            </button>
            <button
              className={`${styles.thumbButton} ${styles.thumbDown}`}
              onClick={handleThumbDown}
            >
              👎
            </button>
          </div>
        )}
      </div>

      {/* Bottom Horizontal Scroll Movie List */}
      {bottomMovies.length > 0 && (
        <div className={styles.bottomScroll}>
          {bottomMovies.map((movie) => (
            <div key={movie._id} className={styles.movieCard}>
              <img
                src={movie.poster}
                alt={movie.title}
                className={styles.posterSmall}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopPickMovie;
