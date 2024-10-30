import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const imagesURL = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  const [watched, setWatched] = useState(movie.watched);

  const handleWatchedChange = async (movie_id) => {};

  return (
    <div className="movie_card">
      <img src={imagesURL + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {movie.vote_average}
      </p>
      <label>
        <input
          type="checkbox"
          checked={watched}
          onChange={() => handleWatchedChange(movie.id)}
        />
        Marcar como assistido
      </label>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
};

export default MovieCard;
