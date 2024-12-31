"use client";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Welcome = () => {
  // Stan do kontrolowania, która sekcja jest aktualnie widoczna
  const [sectionIndex, setSectionIndex] = useState(0);

  // Funkcja do zmiany sekcji
  const handleNextSection = () => {
    setSectionIndex((prevIndex) => prevIndex + 1);
  };
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center p-6 relative">
      {/* Animacja sekcji */}
      <motion.div
        key={sectionIndex} // Klucz na zmianę sekcji (zapewnia reset animacji przy zmianie)
        initial={{ opacity: 0, y: 50 }} // Początkowy stan: niewidoczna i przesunięta w dół
        animate={{ opacity: 1, y: 0 }} // Animacja: widoczna i na swoim miejscu
        exit={{ opacity: 0, y: -50 }} // Sekcja znika i przesuwa się w górę
        transition={{ duration: 1, ease: "easeInOut" }} // Czas trwania animacji
        className="text-center text-white z-10"
      >
        {/* Sekcje zależne od indeksu */}
        {sectionIndex === 0 && (
          <div>
            <h1 className="text-5xl font-extrabold mb-4 text-white font-poppins">
              Welcome to Foodify!
            </h1>
            <p className="text-xl mb-6 font-poppins">
              Discover amazing content and enjoy exploring our website.
            </p>
            <button
              onClick={handleNextSection}
              className="flex m-auto items-center bg-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-xl mt-8 active:scale-95 active:bg-blue-700"
            >
              Get Started <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}

        {sectionIndex === 1 && (
          <div>
            <h1 className="text-3xl font-extrabold mb-4">About Us</h1>
            <p className="text-lg mb-4">
              We are a team dedicated to providing the best food experience!
            </p>
            <button
              onClick={handleNextSection}
              className="flex m-auto items-center bg-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-xl mt-8 active:scale-95 active:bg-blue-700"
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}

        {sectionIndex === 2 && (
          <div>
            <h1 className="text-3xl font-extrabold mb-4">Features</h1>
            <p className="text-lg mb-4">
              Discover the amazing features we offer to enhance your experience.
            </p>
            <button
              onClick={handleNextSection}
              className="flex m-auto items-center bg-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-xl mt-8 active:scale-95 active:bg-blue-700"
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}

        {sectionIndex === 3 && (
          <div>
            <h1 className="text-3xl font-extrabold mb-4">Contact Us</h1>
            <p className="text-lg mb-4">
              Get in touch with us for any queries or feedback!
            </p>
            <button
              onClick={handleNextSection}
              className="flex m-auto items-center bg-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-xl mt-8 active:scale-95 active:bg-blue-700"
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        )}

        {sectionIndex === 4 && (
          <div>
            <h1 className="text-3xl font-extrabold mb-4">Register / Login</h1>
            <p className="text-lg mb-4">
              Create an account or log in to continue.
            </p>
            <div className="flex gap-5">
              <button
                onClick={() => router.push("/register")}
                className="flex m-auto items-center bg-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-xl mt-8 active:scale-95 active:bg-blue-700"
              >
                Register
              </button>
              <button
                onClick={() => router.push("/login")}
                className="flex m-auto items-center bg-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-xl mt-8 active:scale-95 active:bg-blue-700"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Welcome;
