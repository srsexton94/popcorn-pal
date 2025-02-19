import Movie from "../../models/Movie";
import { FaStar } from "react-icons/fa";
import "./Card.css";

function Card({ movie: { title, poster_path, vote_average, release_date } }: { movie: Movie }) {
  const src = `https://image.tmdb.org/t/p/w500/${poster_path}`
  return (
    <div className="card">
      {poster_path ? (
        <img src={src} alt={`${title} Movie Poster`} />
      ) : (
        <div className="no-poster">
          <p>No Movie Poster</p>
        </div>
      )}
      <h2 className="title">{ title }</h2>
      <div className="content">
        <p className="rating">
          <FaStar className="star" aria-hidden="true" />
          {vote_average ? vote_average.toFixed(1) : "N/A"}
        </p>
        <p>{release_date.split('-')[0]}</p>
      </div>
    </div>
  );
}

export default Card;
