import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";
import "./MovieCard.css";

const imagesURL = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  const [watched, setWatched] = useState(movie.watched);
  const [isInWishlist, setIsInWishlist] = useState(movie.inWishlist || false);

  const handleWatchedChange = async (movie_id) => {
    if (!watched) {
      await axios.post(
        `http://localhost:3000/filmeAssistido/add?movieId=${movie_id}`
      );
      setWatched(true);
    } else {
      await axios.delete(
        `http://localhost:3000/filmeNaoAssistido/remove?movieId=${movie_id}`
      );
      setWatched(false);
    }
  };

  const toggleWishlist = async (movie_id) => {
    try {
      if (isInWishlist) {
        const response = await axios.delete(
          `http://localhost:3000/wishlist/remove?movieId=${movie_id}`
        );
        if (response.status === 200) setIsInWishlist(false);
      } else {
        const response = await axios.post(
          `http://localhost:3000/wishlist/add?movieId=${movie_id}`
        );
        if (response.status === 200) setIsInWishlist(true);
      }
    } catch (error) {
      console.error("Erro ao atualizar a wishlist:", error);
    }
  };

  return (
    <div className="movie-card">
      <img
        className="movie-card-image"
        src={imagesURL + movie.poster_path}
        alt={movie.title}
      />
      <h2 className="movie-card-title">
        {movie.title}
        <button
          onClick={() => toggleWishlist(movie.id)}
          className="movie-card-star-button"
        >
          {isInWishlist ? (
            <FaStar className="movie-card-star" />
          ) : (
            <FaRegStar className="movie-card-star" />
          )}
        </button>
      </h2>
      <p className="movie-card-rating">
        <FaStar /> {movie.vote_average}
      </p>
      <label className="movie-card-label">
        <input
          className="movie-card-checkbox"
          type="checkbox"
          checked={watched}
          onChange={() => handleWatchedChange(movie.id)}
        />
        Marcar como assistido
      </label>
      {showLink && (
        <Link className="movie-card-details-link" to={`/movie/${movie.id}`}>
          Detalhes
        </Link>
      )}
    </div>
  );
};

export default MovieCard;
