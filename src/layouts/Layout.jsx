import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Outlet, useNavigate } from 'react-router';
import Footer from '../components/Footer';
import { getToken } from '../utils/cache';

const Layout = ({ setMovies }) => {
  const navigate = useNavigate();

  const check = async () => {
    const token = await getToken();
    if (!token) {
      navigate('/auth');
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setMovies={setMovies} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
