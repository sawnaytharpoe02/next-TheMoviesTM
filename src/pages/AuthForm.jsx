import React, { useRef, useState } from 'react';
import { apiCall } from '../services/apiService';
import { useNavigate } from 'react-router';
import { setToken } from '../utils/cache';
import { useForm } from 'react-hook-form';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const url = isLogin
      ? 'http://localhost:3000/login'
      : 'http://localhost:3000/register';
    const res = await apiCall('post', url, {
      email: data.email,
      password: data.password,
    });
    setToken(res.data.accessToken);
    navigate('/');
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] p-5 flex flex-col justify-center gap-6">
        <h2 className="text-3xl">{isLogin ? 'Login' : 'Register'}</h2>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered input-primary w-full mb-2"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className="text-red-600">Email is required.</span>
          )}
        </div>
        <div className="relative">
          <input
            type={isShowPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="input input-bordered input-primary w-full mb-2"
            {...register('password', { required: true })}
          />
          {isShowPassword ? (
            <AiFillEye
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute cursor-pointer text-xl top-4 right-5"
            />
          ) : (
            <AiFillEyeInvisible
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute cursor-pointer text-xl top-4 right-5"
            />
          )}
          {errors.password && (
            <span className="text-red-600">Password is required.</span>
          )}
        </div>
        <button type="submit" className="btn btn-active btn-primary">
          {isLogin ? 'Login' : 'Register'}
        </button>
        <p>
          {isLogin ? "Don't have an account ? " : 'Alreay have an account ? '}
          <span
            className="cursor-pointer text-primary underline underline-offset-2"
            onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
