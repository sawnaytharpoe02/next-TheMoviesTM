import React, { useEffect, useState } from 'react';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { apiCall } from '../services/apiService';

const FavMovies = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const url = 'https://next-moviestm-server.onrender.com/movie_favorite';
    const response = await apiCall('get', url);
    setData(response?.data);
  };

  const handleUnsave = async (id) => {
    const url = `https://next-moviestm-server.onrender.com/movie_favorite/${id}`;
    await apiCall('delete', url);
  };

  useEffect(() => {
    fetchData();
  }, [handleUnsave]);

  return (
    <div className="p-10">
      <button
        className="flex items-center justify-center gap-2 btn text-white btn-primary"
        onClick={() => navigate(-1)}>
        <MdOutlineArrowBackIosNew /> Back
      </button>

      <div className="mt-8 flex flex-wrap gap-4">
        {data?.map((row, index) => (
          <div
            key={index}
            className="card w-96 bg-neutral text-neutral-content">
            <div className="card-body">
              <p>Title : {row?.title}</p>
              <p>Original title : {row?.original_title}</p>
              <p>Original language : {row?.original_title}</p>
              <p>Overview : {row?.overview}</p>
              <p>Popularity : {row?.popularity}</p>
              <p>Release date : {row?.release_date}</p>
              <p>Vote average : {row?.vote_average}</p>
              <p>Vote count : {row?.vote_count}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleUnsave(row?.id)}>
                  Unsave
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavMovies;
