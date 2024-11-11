"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Login = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-[#161616] text-white px-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-8">Login</h2>
      <form className="w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 bg-[#222] text-white rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 bg-[#222] text-white rounded"
        />
        <button className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 transition">
          Login
        </button> 
      </form>
      <p className="mt-4">Dont have an account? <a href="" className="text-blue-400"><Link href={'/register'}>Register</Link></a></p>
    </motion.div>
  );
};

export default Login;
