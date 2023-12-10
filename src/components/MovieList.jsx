import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const API_KEY = 'f101a5c7988ffa0a6d395ce6c25e575b';
  const imgBaseUrl = "https://image.tmdb.org/t/p/";
  const posterSizeS = "w185";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        if (data.results) {
          setMovies(data.results);
        } else {
          console.error('No movies found');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              <img src={`${imgBaseUrl}${posterSizeS}${movie.poster_path}`} alt={movie.title} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found. Please check back later.</p>
      )}
    </div>
  );
};

export default MovieList;
