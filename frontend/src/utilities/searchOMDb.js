export default async function searchOMDb(searchTerm) {
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      return data.Search;
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error("Error fetching from OMDb API:", error.message);
    return [];
  }
}