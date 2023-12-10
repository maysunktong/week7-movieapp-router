import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const API_KEY = 'f101a5c7988ffa0a6d395ce6c25e575b';

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  console.log("movie", movie)

  return (
    <div className="relative">
      <img className="absolute inset-0 w-full h-full object-cover blur-lg" src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt={`${movie.title} Background`} />
      <div className="relative bg-opacity-50 bg-black">
        <Link to="/">Back</Link>
        <h1>{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
