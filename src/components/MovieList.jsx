import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const API_KEY = "f101a5c7988ffa0a6d395ce6c25e575b";
  const imgBaseUrl = "https://image.tmdb.org/t/p/";
  const posterSizeS = "w780";

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
          console.error("No movies found");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {movies.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {movies.map((movie) => (
            <li key={movie.id} className="group">
              <Link to={`/movies/${movie.id}`} className=" relative">
                <img
                  src={`${imgBaseUrl}${posterSizeS}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-bold">
                  <p className=" text-2xl">{movie.title}</p>
                  <p className='text-lg'>{movie.release_date}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found. Please check back later.</p>
      )}
    </>
  );
};

export default MovieList;
