import React from 'react';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router';

const Home = ({ setMovies, movies, setMovieType, movieType }) => {
  const navigate = useNavigate();

  return (
    <div className="p-2 mt-3 md:mt-0 md:p-10">
      <ul className="menu menu-vertical md:menu-horizontal bg-base-100 rounded-box p-2 mb-8">
        <li>
          <a
            onClick={() => setMovieType('now_playing')}
            className={movieType === 'now_playing' ? 'active' : ''}>
            Now Playing
          </a>
        </li>
        <li>
          <a
            onClick={() => setMovieType('popular')}
            className={movieType === 'popular' ? 'active' : ''}>
            Popular
          </a>
        </li>
        <li>
          <a
            onClick={() => setMovieType('top_rated')}
            className={movieType === 'top_rated' ? 'active' : ''}>
            Top Rated
          </a>
        </li>
        <li>
          <a
            onClick={() => setMovieType('upcoming')}
            className={movieType === 'upcoming' ? 'active' : ''}>
            Upcoming
          </a>
        </li>
        <li>
          <a onClick={() => navigate('/movie-favorite')}>Favorite</a>
        </li>
      </ul>
      <MovieCard movies={movies} setMovies={setMovies} />
    </div>
  );
};

export default Home;
