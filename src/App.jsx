import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import FavMovies from './pages/FavMovies';
import AuthForm from './pages/AuthForm';
import { apiCall } from './services/apiService';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movieType, setMovieType] = useState('now_playing');

  const fetchData = async () => {
    const apiKey = 'e127983d3410f2900733ce87f046c848';
    const url = `https://api.themoviedb.org/3/movie/${movieType}?api_key=${apiKey}`;
    const favUrl = 'http://localhost:3000/movie_favorite';

    const favorites = await apiCall('get', favUrl);
    const response = await apiCall('get', url);
    const moviesWithFavorites = response.data.results.map((movie) => {
      if (favorites.data.find((eachFav) => eachFav.title === movie.title)) {
        return { ...movie, favorite: true };
      } else {
        return { ...movie, favorite: false };
      }
    });

    setMovies(moviesWithFavorites);
  };

  useEffect(() => {
    fetchData();
  }, [movieType]);

  return (
    <Routes>
      <Route path="/" element={<Layout setMovies={setMovies} />}>
        <Route
          index
          element={
            <Home
              setMovies={setMovies}
              movies={movies}
              movieType={movieType}
              setMovieType={setMovieType}
            />
          }
        />
        <Route path="movie-favorite" element={<FavMovies />} />
      </Route>
      <Route path="/auth" element={<AuthForm />} />
    </Routes>
  );
};

export default App;
