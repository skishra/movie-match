// utilities/searchTMDb.js
export default async function searchTMDb(searchTerm) {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY; // Or use a bearer token instead
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    searchTerm
  )}&language=en-US&page=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`, // Make sure this is your TMDb bearer token
        Accept: "application/json"
      }
    });
    const data = await response.json();

    if (data.results) {
      return data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date?.split("-")[0] || "N/A",
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/placeholder.jpg"
      }));
    } else {
      throw new Error("No results found.");
    }
  } catch (error) {
    console.error("Error fetching from TMDb API:", error.message);
    return [];
  }
}
