import React, { useEffect, useState } from "react";
import "./filmeAssistido.css";
import axios from "axios";

const FilmeAssistido = () => {
  const [filmesAssistidos, setFilmesAssistidos] = useState([]);
  const [ratings, setRatings] = useState({});

  const fetchFilmesAssistidos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/filmeAssistido/details"
      );

      const data = response.data;

      if (data.results && Array.isArray(data.results)) {
        setFilmesAssistidos(data.results);
      } else {
        console.error("Formato inesperado de resposta da API:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar os filmes assistidos:", error.message);
    }
  };

  const handleRating = (movieId, starValue) => {
    setRatings((prev) => ({
      ...prev,
      [movieId]: starValue,
    }));
  };

  const removeFromFilmesAssistidos = async (movieId) => {
    try {
      await axios.delete(
        `http://localhost:3000/filmeAssistido/remove?movieId=${movieId}`
      );

      setFilmesAssistidos((prev) =>
        prev.filter((movie) => movie.id !== movieId)
      );
    } catch (error) {
      console.error(
        "Erro ao remover o filme dos filmes assistidos:",
        error.message
      );
    }
  };

  useEffect(() => {
    fetchFilmesAssistidos();
  }, []);

  return (
    <div className="filme-assistido-container">
      <h2 className="filme-assitido-h2">Filmes Assistidos</h2>
      {filmesAssistidos.length === 0 ? (
        <p className="empty-message">
          Você ainda não marcou nenhum filme como assistido.
        </p>
      ) : (
        <ul className="filme-assistido-list">
          {filmesAssistidos.map((movie) => (
            <li key={movie.id} className="filme-assistido-item">
              {/* Poster do filme */}
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title || "Sem título"}
                  className="filme-assistido-poster"
                />
              ) : (
                <div className="no-poster">Sem imagem</div>
              )}

              {/* Detalhes do filme */}
              <div className="filmes-assistidos-details">
                <h4 className="movie-title">{movie.title || "Sem Título"}</h4>
                <div className="rating-section">
                  <span>Avaliação:</span>
                  <div className="stars">
                    {[...Array(5)].map((_, index) => {
                      const starValue = index + 1;
                      return (
                        <span
                          key={index}
                          className={`star ${
                            (ratings[movie.id] || 0) >= starValue
                              ? "active"
                              : ""
                          }`}
                          onClick={() => handleRating(movie.id, starValue)}
                        >
                          ★
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="comment-section">
                  <textarea
                    className="comment-input"
                    placeholder="Deixe um comentário sobre o filme"
                  ></textarea>

                  {/* Contêiner para os botões */}
                  <div className="button-group">
                    <button
                      className="remove-button"
                      onClick={() => removeFromFilmesAssistidos(movie.id)}
                    >
                      Remover
                    </button>
                    <button className="save-comment-button">
                      Salvar Comentário
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilmeAssistido;
