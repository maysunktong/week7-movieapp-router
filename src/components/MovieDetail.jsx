import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const API_KEY = "f101a5c7988ffa0a6d395ce6c25e575b";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  console.log("movie", movie);

  return (
    <div className="relative">
      <img
        className="absolute inset-0 w-full h-full object-cover blur-lg"
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt={`${movie.title} Background`}
      />
      <div className="relative bg-opacity-50 bg-black p-2">
        <Link to="/" className="w-fit py-2 px-4 rounded-2xl text-white">
          ← Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 p-2">
          <div className="w-full flex justify-center items-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              className='rounded-xl shadow-xl border-2'
            />
          </div>
          <div className="flex flex-col justify-center gap-4 text-white p-8">
            <p className="font-bold text-2xl lg:text-4xl">{movie.title}</p>
            <div className="w-fit py-2 px-4 rounded-2xl bg-gray-100 text-gray-700 font-semibold">
              ⭐️ {movie.vote_average.toFixed(1)}
            </div>
            <p className="text-md lg:text-lg">{movie.overview}</p>
            <p className="text-sm text-gray-500">
              Released: {movie.release_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
