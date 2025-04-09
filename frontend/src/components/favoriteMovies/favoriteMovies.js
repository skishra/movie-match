import React, { useEffect, useState } from "react";
import axios from "axios";

const FavoriteMovies = ({ userId, limit }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (movies.length === 0) return <p>No favorite movies found.</p>;

  return (
    <div className="result">
      <div className="page-wrapper">
        <div className="content-inner">
          <h1 className="title">My Loves . . .</h1>
          {loading ? (
            <p>Loading favorites...</p>
          ) : movies.length > 0 ? (
            <div className="movie-grid">
              {movies.map((movie) => (
                <div className="movie-card" key={movie._id}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="movie-poster"
                  />
                  <div className="movie-info">
                    <p className="movie-title">{movie.title}</p>
                    <p className="movie-plot">{movie.plot}</p>
                    <button
                      className="love-button"
                      onClick={() => {
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
            <div className="confirm-overlay">
              <div className="confirm-modal">
                <h2>Confirm Delete</h2>
                <p>
                  Are you sure you want to remove this movie from your
                  favorites?
                </p>
                <div className="confirm-actions">
                  <button
                    className="confirm-yes"
                    onClick={async () => {
                      try {
                        const response = await fetch(
                          `http://localhost:8081/favoriteMovies/deleteFavoriteMoviesById/${selectedMovieId}`,
                          { method: "DELETE" }
                        );
                        if (response.ok) {
                          // Optional: refresh movie list
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
                        setShowConfirm(false);
                        setSelectedMovieId(null);
                      }
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="confirm-no"
                    onClick={() => {
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
        </div>
        {/* {"Close content inner "} */}
      </div>
      {/* {" Close page wrapper"} */}
    </div> /*{ Close result }*/
  );
};

export default FavoriteMovies;
