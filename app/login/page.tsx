"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Login = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#161616] to-[#101010] text-white px-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-8">Login</h2>
      <form className="w-full max-w-sm bg-[#1C1C1C] p-6 rounded-lg shadow-lg">
        <motion.input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 bg-[#222] text-white rounded focus:outline-none focus:bg-[#2a2a2a] transition"
          whileFocus={{ scale: 1.03 }}
        />
        <motion.input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 bg-[#222] text-white rounded focus:outline-none focus:bg-[#2a2a2a] transition"
          whileFocus={{ scale: 1.03 }}
        />
        <motion.button
          className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 transition transform hover:scale-105 active:scale-95 shadow-lg"
          whileHover={{ boxShadow: "0px 0px 10px rgba(59, 130, 246, 0.6)" }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </form>
      <p className="mt-4 text-gray-400">
        Don’t have an account?{' '}
        <Link className="text-blue-400 hover:text-blue-500 transition" href={'/register'}>
          Register
        </Link>
      </p>
    </motion.div>
  );
};

export default Login;
