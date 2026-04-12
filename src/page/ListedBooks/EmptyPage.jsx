import React from 'react';

const EmptyPage = ({ name }) => {
  return (
    <div className="text-center ff-fade-up py-16 px-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="w-20 h-20 text-white/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>

        <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Empty {name}
        </h3>

        <p className="text-white/50 text-center max-w-md">
          Your wishlist is feeling lonely! 📚
          <br />
          Start adding books from the home page.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-4 px-6 py-2.5 bg-linear-to-r from-blue-500 to-blue-700 text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Browse Books
        </button>
      </div>
    </div>
  );
};

export default EmptyPage;