"use client";
import React, { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../components/LoadingSpinner';
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    setErrorMessage(null); // Resetujemy błąd przed wysyłką

    try {
      const response = await axios.post('/api/login', data);

      if (response.status === 200) {
        console.log('Login successful', response.data);
        router.push('/home'); // Przekierowanie po udanym logowaniu
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Login failed', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-[#161616] text-white px-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-8">Login</h2>
      <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <motion.div
          className="flex items-center bg-[#222] rounded px-3 py-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaEnvelope className="text-gray-400 mr-3" />
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
            className="w-full bg-transparent text-white focus:outline-none"
            autoFocus
          />
        </motion.div>
        {errors.email && (
          <motion.p
            className="text-red-500 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errors.email?.message?.toString()}
          </motion.p>
        )}

        {/* Password Input */}
        <motion.div
          className="flex items-center bg-[#222] rounded px-3 py-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <FaLock className="text-gray-400 mr-3" />
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            className="w-full bg-transparent text-white focus:outline-none"
          />
        </motion.div>
        {errors.password && (
          <motion.p
            className="text-red-500 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errors.password?.message?.toString()}
          </motion.p>
        )}

        {/* Error Message */}
        {errorMessage && (
          <motion.p
            className="text-red-500 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.p>
        )}

        {/* Login Button */}
        <motion.button
          type="submit"
          className="w-full bg-blue-500 py-2 rounded flex items-center justify-center hover:bg-blue-600 transition"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {isLoading ? <LoadingSpinner /> : <FaLock className="mr-2" />} Login
        </motion.button>
      </form>

      <p className="mt-4">
        Dont have an account?{' '}
        <Link className="text-blue-400" href={'/register'}>
          Register
        </Link>
      </p>
    </motion.div>
  );
};

export default Login;
