"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post("/api/login", data);
      if (response.status === 200) {
        console.log("Login successful", response.data);
        router.push("/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login failed", error);
      setErrorMessage(error.response?.data?.message || "Login failed");
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
      <form
        className="w-full max-w-sm space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email Input */}
        <motion.div
          className="flex items-center bg-[#222] rounded px-3 py-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaEnvelope className="text-gray-400 mr-3" />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full bg-transparent text-white focus:outline-none"
          />
        </motion.div>
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}

        {/* Password Input */}
        <motion.div
          className="flex items-center bg-[#222] rounded px-3 py-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaLock className="text-gray-400 mr-3" />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full bg-transparent text-white focus:outline-none"
          />
        </motion.div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full bg-blue-500 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaSignInAlt className="mr-2" /> Login
        </motion.button>
      </form>

      {/* Loading and Error Messages */}
      <div className="my-4">
        {isLoading && <LoadingSpinner text="Logging in..." />}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}

      {/* Link to Register */}
      <p className="text-sm mt-4">
        Don’t have an account?{" "}
        <Link href="/register" className="text-blue-400 hover:text-blue-300">
          Register
        </Link>
      </p>
    </motion.div>
  );
};

export default Login;
