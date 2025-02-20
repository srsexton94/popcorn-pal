import Movie from "../../models/Movie";
import { FaStar } from "react-icons/fa";
import "./Card.css";

function Card({
  movie: { title, poster_path, vote_average, release_date },
}: {
  movie: Movie;
}) {
  const posterSrc = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const searchSrc = `https://www.google.com/search?q=${title
    .split(" ")
    .join("+")}`;

  return (
    <div className="card">
      {poster_path ? (
        <img src={posterSrc} alt={`${title} Movie Poster`} />
      ) : (
        <div className="no-poster">
          <p>No Movie Poster</p>
        </div>
      )}
      <a
        href={searchSrc}
        aria-label={`Search for ${title}, opens in a new tab`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className="title">{title}</h2>
      </a>
      <div className="content">
        <p className="rating">
          <FaStar className="star" aria-hidden="true" />
          {vote_average ? vote_average.toFixed(1) : "N/A"}
        </p>
        <p>{release_date.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default Card;
