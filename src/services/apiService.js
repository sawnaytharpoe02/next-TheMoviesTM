import axios from 'axios';
import { getToken } from '../utils/cache';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const apiCall = async (method, url, data, isMovieApi = false) => {
  const token = await getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  axios.defaults.headers = headers;

  if (isMovieApi) {
    axios.defaults.headers = 'something';
  }
  return await axios[method](url, data).then((response) => response);
};
