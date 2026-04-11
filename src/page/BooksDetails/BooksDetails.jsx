import React from "react";
import { useLoaderData, useParams } from "react-router";
import PageNotFound from "../PageNotFound/NotFoundPage";
import { FaStar } from "react-icons/fa";

const BooksDetails = () => {
  const { id } = useParams();
  const books = useLoaderData();

  if (!books || books.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  const findBook = books.find((book) => book.bookId == id);
  if (!findBook) {
    return <PageNotFound />;
  }

  const {
    author,
    bookName,
    category,
    image,
    publisher,
    rating,
    review,
    tags,
    yearOfPublishing,
    totalPages,
    bookId,
  } = findBook;

  const generic = () => {
    if (image && image.trim() !== "") {
      return image;
    }
    return "https://via.placeholder.com/400x500?text=No+Cover";
  };

  return (
    <div className="text-white flex flex-col lg:flex-row items-start gap-12 page-width px-5">
      <div className="lg:flex-1 w-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center border border-white/10">
        <img
          className="w-full max-w-md h-auto object-contain rounded-xl shadow-lg "
          src={generic()}
          alt={bookName}
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/400x500?text=No+Cover")
          }
        />
      </div>
      <div className="lg:flex-2 w-full">
        <div className="border-b pb-4 mb-4 border-white/10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">
            {bookName}
          </h3>
          <p className="font-medium text-xl mb-6">By : {author}</p>
        </div>
        <div className="border-b pb-4 mb-4 border-white/10">
          <p className="font-medium text-xl mb-4">{category}</p>
        </div>
        <div className="">
          <p className="italic mb-4">
            <span className="font-bold  text-neutral-400">Review : </span>
            {review}
          </p>
        </div>
        <div className="flex items-center gap-4   border-b pb-4 mb-4 border-white/10">
          <p className="font-bold  text-neutral-400 ">Tag</p>
          {tags.map((tag, index) => (
            <p className="text-[#23BE0A] font-medium px-4 py-1.5">#{tag}</p>
          ))}
        </div>
        <div className=" max-w-100 mb-8">
          <div className="flex items-center justify-between">
            <p className="text-white/50 text-sm">number of page :</p>
            <h4 className="font-semibold text-white text-lg text-end">
              {totalPages || "N/A"}
            </h4>
          </div>
          <div className="flex items-center justify-between text-start">
            <p className="text-white/50 text-sm">Publisher :</p>
            <h4 className="font-semibold text-white text-lg ">
              {publisher || "N/A"}
            </h4>
          </div>
          <div className="flex items-center justify-between text-start">
            <p className="text-white/50 text-sm">Year of Publishing:</p>
            <h4 className="font-semibold text-white text-lg">
              {yearOfPublishing || "N/A"}
            </h4>
          </div>
          <div className="flex items-center justify-between text-start">
            <p className="text-white/50 text-sm">Rating:</p>
            <h4 className="font-semibold text-white text-lg flex items-center gap-1">
              {rating || "N/A"}
              <FaStar className="text-yellow-400 " />
            </h4>
          </div>
        </div>
        <div className="flex items-center justify-center lg:justify-start gap-4 ">
          <button className="px-2 lg:px-6 py-3 cursor-pointer bg-linear-to-r from-blue-500 to-blue-700 text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg">
            📖 Read Now
          </button>
          <button className="px-2 lg:px-6 py-3 cursor-pointer bg-linear-to-r from-[#50B1C9] to-[#3B82F6] text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg">
            ❤️ Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksDetails;
