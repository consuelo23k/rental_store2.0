import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get("http://localhost:3000/wishlist");
      const data = response.data;
      setWishlist(data);
    } catch (error) {
      console.error("Erro ao buscar a wishlist:", error);
    }
  };

  const removeFromWishlist = async (movieId) => {
    try {
      await axios.delete(`http://localhost:3000/wishlist/remove/${movieId}`);

      setWishlist((prev) => prev.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error("Erro ao remover o filme da wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-container">
      <h2> Minha Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="empty-message">Sua lista de desejos está vazia.</p>
      ) : (
        <ul className="wishlist-list">
          {wishlist.map((movie) => (
            <li key={movie.id} className="wishlist-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="wishlist-poster"
              />
              <div className="wishlist-details">
                <h4>{movie.title}</h4>
                <button
                  className="remove-button"
                  onClick={() => removeFromWishlist(movie.id)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
