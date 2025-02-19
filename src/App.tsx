import { useEffect, useState } from "react";
import { Card, Search } from "./components";
import Movie from "./models/Movie";
import "./App.css";
import "./variables.css";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([] as Movie[]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();

      if (data.Response === "False") {
        setMovieList([]);
        throw new Error(data.error);
      }
      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <header>
        <h1>
          <span aria-hidden="true">🍿</span>
          &nbsp;Popcorn Pal&nbsp;
          <span aria-hidden="true">🎬</span>
        </h1>
        <p>Find your new favorite</p>
      </header>
      <main>
        <Search setSearchTerm={setSearchTerm} />
        <section>
          {isLoading ? (
            <p>Loading...</p>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <li key={movie.id}>
                  <Card movie={movie} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <footer>
        <p>Created by Sam R. Sexton</p>
        <ul>
          <li>
            <a href="https://srsexton94.github.io/">Portfolio</a>
          </li>
          <li>
            <a href="https://github.com/srsexton94">Github</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/sam-sexton/">LinkedIn</a>
          </li>
        </ul>
      </footer>
    </>
  );
}

export default App;
