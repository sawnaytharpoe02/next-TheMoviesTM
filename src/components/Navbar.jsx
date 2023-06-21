import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/cache';
import { apiCall } from '../services/apiService';

const Navbar = ({ setMovies }) => {
  const navigate = useNavigate();
  const searchRef = useRef();

  const handleLogout = () => {
    removeToken();
    navigate('/auth');
  };

  const fetchMovie = async (name) => {
    const apiKey = 'e127983d3410f2900733ce87f046c848';
    const url =
      name !== ''
        ? `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=e127983d3410f2900733ce87f046c848`
        : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
    const res = await apiCall('get', url, null, true);
    if (res.data.results.length === 0) {
      return setMovies(null);
    }
    setMovies(res.data.results);
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      const searchText = searchRef.current.value.toLowerCase();
      fetchMovie(searchText);
    }
  };

  return (
    <div className="relative flex items-center justify-between flex-wrap mt-10 px-5 md:px-12">
      <h1 className="text-2xl font-bold text-primary">
        <Link to="/">TheMoviesTM</Link>
      </h1>
      <div className="flex items-center mt-10 md:mt-0">
        <input
          type="text"
          placeholder="🔍  Searh movie ...."
          className="w-full py-2 px-6 mr-6 rounded-full border border-transparent input-primary"
          ref={searchRef}
          onKeyDown={handleSearch}
        />
        <button
          className="absolute top-0 right-6 md:relative md:top-0 md:right-0 btn btn-sm md:btn-md btn-primary"
          onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
