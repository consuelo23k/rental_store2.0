import { useEffect, useState } from "react";
import MovieCard from "../../src/components/MovieCard";

import "./MoviesGrid.css";

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setTopMovies(data.results);
  };

  useEffect(() => {
    const getTopRatedUrl = `http://localhost:3000/top_rated`;
    getTopRatedMovies(getTopRatedUrl);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando....</p>}
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Home;
