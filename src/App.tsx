import { useEffect, useState } from "react";
import { Card, LoadingCard, Search } from "./components";
import Movie from "./models/Movie";
import { useDebounce } from "react-use";
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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

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
      console.error(error);
      setErrorMessage("Oops! Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

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
            <ul>
              {new Array(20).fill(
                <li>
                  <LoadingCard />
                </li>
              )}
            </ul>
          ) : errorMessage ? (
            <p id="page-error" role="alert">{errorMessage}</p>
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
