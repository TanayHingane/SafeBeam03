"use client";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen transition-colors duration-300 bg-white text-gray-800 dark:bg-black dark:text-gray-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
        }

        .beam {
            position: absolute;
            width: 150px;
            height: 2px;
            background: linear-gradient(90deg, #58a6ff, rgba(88, 166, 255, 0));
            transform-origin: left;
            opacity: 0;
            animation: beam-animate 3s forwards ease-in-out;
        }
        
        .beam-broken {
            position: absolute;
            width: 150px;
            height: 2px;
            background: linear-gradient(90deg, #ff7b72, rgba(255, 123, 114, 0));
            transform-origin: left;
            opacity: 0;
            animation: beam-animate-broken 3s forwards ease-in-out;
        }

        @keyframes beam-animate {
            0% { transform: rotate(0deg) scaleX(0); opacity: 1; }
            50% { transform: rotate(45deg) scaleX(1); opacity: 1; }
            100% { transform: rotate(90deg) scaleX(0.5); opacity: 0; }
        }

        @keyframes beam-animate-broken {
            0% { transform: rotate(0deg) scaleX(0); opacity: 0; }
            50% { transform: rotate(45deg) scaleX(1); opacity: 1; }
            100% { transform: rotate(135deg) scaleX(0.7); opacity: 1; }
        }

        .gradient-text {
            background-image: linear-gradient(45deg, #38bdf8, #818cf8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .dark .gradient-text {
            background-image: linear-gradient(45deg, #818cf8, #c7d2fe);
        }
      `}</style>
      <div className="rounded-3xl backdrop-filter backdrop-blur-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black p-12 text-center max-w-lg mx-auto shadow-2xl">
        <div className="relative inline-block mb-8">
          <h1
            className="text-9xl font-extrabold text-transparent gradient-text"
            style={{ WebkitTextStroke: "1px currentColor" }}
          >
            404
          </h1>
          <div className="beam top-1/2 left-1/4 -translate-y-1/2"></div>
          <div className="beam-broken top-1/2 right-1/4 -translate-y-1/2"></div>
        </div>
        <p className="text-2xl font-semibold mb-4">
          The beam couldn&apos;t find its destination.
        </p>
        <p className="mb-8 text-lg">
          It seems the file was beamed into the void.
        </p>
        <a
          href="/"
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full px-8 py-3 font-semibold transition-all duration-300 ease-in-out"
        >
          Beam Me Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
