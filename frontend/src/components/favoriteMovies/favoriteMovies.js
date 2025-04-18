import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../css/favoriteMovie.module.css";

const FavoriteMovies = ({ userId, limit }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const params = { userId };
        if (limit) params.limit = limit;

        const response = await axios.get(
          "http://localhost:8081/favoriteMovies/getAll",
          {
            params,
          }
        );

        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch favorite movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [userId, limit]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowDetail(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (movies.length === 0) return <p>No favorite movies found.</p>;

  return (
    <div className="result">
      <div className={styles["page-wrapper"]}>
        <div className={styles["content-inner"]}>
          <h1 className={styles["title"]}>My Loves . . .</h1>
          {loading ? (
            <p>Loading favorites...</p>
          ) : movies.length > 0 ? (
            <div className={styles["movie-grid"]}>
              {movies.map((movie) => (
                <div
                  className={styles["movie-card"]}
                  key={movie._id}
                  onClick={() => {
                    setSelectedMovie(movie);
                    setShowDetail(true);
                  }}
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className={styles["movie-poster"]}
                  />
                  <div className={styles["movie-info"]}>
                    <p className={styles["movie-title"]}>{movie.title}</p>
                    <p className={styles["movie-plot"]}>{movie.plot}</p>
                    <button
                      className={styles["love-button"]}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening detail popup
                        setSelectedMovieId(movie._id);
                        setShowConfirm(true);
                      }}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No favorite movies found.</p>
          )}

          {showConfirm && (
            <div className={styles["confirm-overlay"]}>
              <div className={styles["confirm-modal"]}>
                <h2>Confirm Delete</h2>
                <p>
                  Are you sure you want to remove this movie from your
                  favorites?
                </p>
                <div className={styles["confirm-actions"]}>
                  <button
                    className={styles["confirm-yes"]}
                    onClick={async () => {
                      try {
                        const response = await fetch(
                          `http://localhost:8081/favoriteMovies/deleteFavoriteMoviesById/${selectedMovieId}`,
                          { method: "DELETE" }
                        );
                        if (response.ok) {
                          setMovies(
                            movies.filter(
                              (movie) => movie._id !== selectedMovieId
                            )
                          );
                        } else {
                          alert("Failed to delete movie.");
                        }
                      } catch (error) {
                        alert("An error occurred.");
                        console.error(error);
                      } finally {
                        // ✅ Close both dialogs
                        setShowConfirm(false);
                        setShowDetail(false);
                        setSelectedMovieId(null);
                      }
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className={styles["confirm-no"]}
                    onClick={() => {
                      // ✅ Just close confirm, keep detail open
                      setShowConfirm(false);
                      setSelectedMovieId(null);
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          {showDetail && selectedMovie && (
            <div
              className={styles["detail-overlay"]}
              onClick={() => setShowDetail(false)}
            >
              <div
                className={styles["detail-modal"]}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className={styles["detail-poster"]}
                />

                <div className={styles["detail-info"]}>
                  <h2 className={styles["detail-title"]}>
                    {selectedMovie.title}
                  </h2>

                  <p className={styles["detail-label"]}>
                    <strong>Description:</strong>
                  </p>
                  <p className={styles["detail-plot"]}>{selectedMovie.plot}</p>

                  <div className={styles["detail-bottom"]}>
                    <div className={styles["detail-left"]}>
                      <p>
                        <strong>Year:</strong> {selectedMovie.year}
                      </p>
                      <p>
                        <strong>Genre:</strong> {selectedMovie.genre}
                      </p>
                    </div>

                    <div className={styles["detail-right"]}>
                      <button
                        className={styles["love-button"]}
                        onClick={(e) => {
                          e.stopPropagation(); // prevent background click
                          setSelectedMovieId(selectedMovie._id);
                          setShowConfirm(true); // open confirm modal
                        }}
                      >
                        ❤️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* {"Close content inner "} */}
      </div>
      {/* {" Close page wrapper"} */}
      <footer className={styles.footer}>
        Designed by Yannie - SK - Trevor
      </footer>
    </div> /*{ Close result }*/
  );
};

export default FavoriteMovies;
