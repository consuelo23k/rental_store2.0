import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const imagesURL = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true, handleWatchedChange }) => {
  return (
    <div className="movie_card">
      <img src={imagesURL + movie.poster_path} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {movie.vote_average}
      </p>
      {/* Checkbox para marcar como assistido */}
      <label>
        <input
          type="checkbox"
          checked={movie.watched}
          onChange={() => handleWatchedChange(movie.id)}
        />
        Marcar como assistido
      </label>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
};

export default MovieCard;
