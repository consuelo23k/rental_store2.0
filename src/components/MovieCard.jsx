import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";

const imagesURL = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  const [watched, setWatched] = useState(movie.watched);
  const [isInWishlist, setIsInWishlist] = useState(movie.isInWishlist || false);

  const handleWatchedChange = async (movie_id) => {
    if (watched === false) {
      await axios.post(
        `http://localhost:3000/filmeAssistido?movieId=${movie_id}`
      );
      setWatched(true);
    } else {
      await axios.delete(
        `http://localhost:3000/filmeNaoAssistido?movieId=${movie_id}`
      );
      setWatched(false);
    }
  };
  const toggleWishlist = async (movie_id) => {
    if (isInWishlist) {
      await axios.delete(
        `http://localhost:3000/removeWishlist?movieId=${movie_id}`
      );
      setIsInWishlist(false);
    } else {
      await axios.post(`http://localhost:3000/addWishlist?movieId=${movie_id}`);
    }
  };

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
      <button
        onClick={() => toggleWishlist(movie.id)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        {isInWishlist ? (
          <FaRegStar color="gold" size={24} />
        ) : (
          <FaRegStar color="gold" size={24} />
        )}
      </button>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
};

export default MovieCard;
