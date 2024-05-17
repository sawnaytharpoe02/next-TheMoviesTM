import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AiFillHeart } from 'react-icons/ai';
import { apiCall, backendApiUrl } from '../services/apiService';
import { useNavigate } from 'react-router';

const MovieCard = ({ movies, setMovies }) => {
  const navigate = useNavigate();

  const handleFavorite = async (id) => {
    setMovies((prevMovies) => {
      const updatedMovies = [...prevMovies];
      return updatedMovies.map((movie) => {
        if (movie.id === id) {
          return { ...movie, favorite: !movie.favorite };
        }
        return movie;
      });
    });

    const currentMovie = movies.find((movie) => movie.id === id);
    const data = {
      title: currentMovie.title,
      original_title: currentMovie.original_title,
      original_language: currentMovie.original_language,
      overview: currentMovie.overview,
      popularity: currentMovie.popularity,
      release_date: currentMovie.release_date,
      vote_average: currentMovie.vote_average,
      vote_count: currentMovie.vote_count,
    };

    const url = `${backendApiUrl}/movie_favorite`;
    const res = await apiCall('get', url);
    if (!res?.data.find((item) => item.title === currentMovie.title)) {
      await apiCall('post', url, data);
      navigate('/movie-favorite');
    } else {
      return alert('already saved in favorite lists');
    }
  };

  return (
    <div className="flex gap-6 flex-wrap justify-center p-5 md:p-0">
      {movies !== null ? (
        movies?.map((movie) => (
          <div
            key={uuidv4()}
            className="card w-full md:w-52 bg-base-100 shadow-md">
            <figure>
              <AiFillHeart
                onClick={() => handleFavorite(movie?.id)}
                className={
                  movie.favorite
                    ? 'text-red-600 absolute top-2 right-3 text-2xl cursor-pointer'
                    : 'text-purple-600 absolute top-2 right-3 text-2xl cursor-pointer'
                }
              />
              <img
                src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                alt="movie poster"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title relative">
                {movie?.original_title.length >= 18
                  ? movie?.original_title.slice(0, 10) + '...'
                  : movie?.original_title}
                <div className="badge badge-secondary absolute right-[-10px] top-[-18px]">
                  {movie?.original_language}
                </div>
              </h2>
              <p>
                {movie?.overview.length >= 30
                  ? movie?.overview.slice(0, 30) + '...'
                  : movie?.overview}
              </p>
              <div className="card-actions flex-col justify-end mt-auto">
                <div className="badge badge-outline cursor-pointer hover:bg-primary-focus hover:border-primary">
                  {movie?.release_date}
                </div>
                <div className="badge badge-outline cursor-pointer hover:bg-primary-focus hover:border-primary">
                  {movie?.vote_average}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-primary text-2xl mt-8">No Movies Found...</p>
      )}
    </div>
  );
};

export default MovieCard;
