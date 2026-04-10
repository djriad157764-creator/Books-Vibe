import { Link } from "react-router";
import { FaHome, FaBook, FaSearch, FaArrowLeft } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className=" flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <div className="text-[120px] sm:text-[180px] lg:text-[220px] font-extrabold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-[120px] sm:text-[180px] lg:text-[220px] font-extrabold text-white">
              404
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/15 shadow-xl">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
              <FaSearch className="text-red-400 text-3xl" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Page Not Found
            </h1>
            <p className="text-white/60 text-base sm:text-lg mb-6">
              Oops! The page you're looking for seems to have wandered off into
              the wrong genre.
            </p>

            {/* Book suggestion */}
            <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
              <p className="text-white/50 text-sm mb-2">
                📖 While you're here, why not try:
              </p>
              <p className="text-white/80 font-medium">
                "The Art of Finding Your Way Back" — by Book Vibe
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-blue-700 text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <FaHome />
              Back to Home
            </Link>
            <Link
              to="/listed"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300"
            >
              <FaBook />
              Browse Books
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white/80 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
            >
              <FaArrowLeft />
              Go Back
            </button>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm mb-3">Popular destinations:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="text-white/50 hover:text-blue-400 text-sm transition-colors"
            >
              Home
            </Link>
            <span className="text-white/20">•</span>
            <Link
              to="/listed"
              className="text-white/50 hover:text-blue-400 text-sm transition-colors"
            >
              Listed Books
            </Link>
            <span className="text-white/20">•</span>
            <Link
              to="/read"
              className="text-white/50 hover:text-blue-400 text-sm transition-colors"
            >
              Pages to Read
            </Link>
            <span className="text-white/20">•</span>
            <Link
              to="/about"
              className="text-white/50 hover:text-blue-400 text-sm transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
