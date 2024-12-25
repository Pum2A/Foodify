"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaUserPlus, FaKey } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<{ name: string; email: string; password: string; confirmPassword: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const router = useRouter();

  // Regex for special characters in password
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const onSubmit = async (data: { name: string; email: string; password: string }) => {
    setIsLoading(true);
    setErrorMessage(null);

    if (!data.name || !data.email || !data.password) {
      setErrorMessage('All fields are required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/register', data);
      if (response.status === 200) {
        console.log('Registration successful', response.data);
        router.push('/login');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Registration failed', error);
      if (error.response) {
        setErrorMessage(error.response?.data?.message || 'An error occurred during registration');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the password is valid (has special character and length >= 6)
  const passwordValid = password && password.length >= 6 && specialCharRegex.test(password);
  const confirmPasswordValid = confirmPassword && confirmPassword === password;

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-[#161616] text-white px-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-8">Register</h2>
      <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Name Input */}
        <motion.div
          className="flex items-center bg-[#222] rounded px-3 py-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaUserPlus className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Name"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters long',
              },
            })}
            className="w-full bg-transparent text-white focus:outline-none"
          />
        </motion.div>
        {errors.name && <p className="text-red-500 text-xs">{errors.name?.message?.toString()}</p>}

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
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
            className="w-full bg-transparent text-white focus:outline-none"
          />
        </motion.div>
        {errors.email && <p className="text-red-500 text-xs">{errors.email?.message?.toString()}</p>}

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
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            className={` w-full bg-transparent text-white focus:outline-none ${passwordValid ? 'border-2 border-green-500' : ''}`}
          />
        </motion.div>
        {errors.password && <p className="text-red-500 text-xs">{errors.password?.message?.toString()}</p>}

        {/* Confirm Password Input */}
        <motion.div
          className="flex items-center bg-[#222] rounded px-3 py-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <FaKey className="text-gray-400 mr-3" />
          <input
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword', {
              required: 'Confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
            className={`w-full bg-transparent text-white focus:outline-none ${confirmPasswordValid ? 'border-2 border-green-500' : ''}`}
          />
        </motion.div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">{errors.confirmPassword?.message?.toString()}</p>
        )}

        {/* Register Button */}
        <motion.button
          className="w-full bg-blue-500 py-2 rounded flex items-center justify-center hover:bg-blue-600 transition"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : <><FaUserPlus className="mr-2" /> Register</>}
        </motion.button>
      </form>

      {/* Error Message for Password Mismatch */}
      {password && confirmPassword && password !== confirmPassword && (
        <p className="text-red-500 mt-2">Passwords do not match!</p>
      )}

      <p className="mt-4">
        Already have an account?{' '}
        <Link className="text-blue-400" href={'/login'}>
          Login
        </Link>
      </p>

      {errorMessage && <p className="text-red-500 text-xs mt-4">{errorMessage}</p>}
    </motion.div>
  );
};

export default Register;
