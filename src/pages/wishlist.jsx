import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/wishlist/details"
      );
      const data = response.data;

      if (data.results && Array.isArray(data.results)) {
        setWishlist(data.results);
      } else {
        console.error("Formato inesperado de resposta da API:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar a wishlist:", error.message);
    }
  };

  const removeFromWishlist = async (movieId) => {
    try {
      await axios.delete(
        `http://localhost:3000/wishlist/remove?movieId=${movieId}`
      );

      setWishlist((prev) => prev.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error("Erro ao remover o filme da wishlist:", error.message);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-h2">Minha Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="empty-message">Sua lista de desejos está vazia.</p>
      ) : (
        <ul className="wishlist-list">
          {wishlist.map((movie) => (
            <li key={movie.id} className="wishlist-item">
              {/* Card do Filme */}
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title || "Sem título"}
                  className="wishlist-poster"
                />
              ) : (
                <div className="no-poster">Sem imagem</div>
              )}
              {/* Detalhes do Filme */}
              <div className="wishlist-details">
                <h4 className="movie-title">{movie.title || "Sem título"}</h4>
              </div>
              {/* Botão Remover */}
              <button
                className="remove-button"
                onClick={() => removeFromWishlist(movie.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
