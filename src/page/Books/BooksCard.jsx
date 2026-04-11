import React from "react";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router";

const BooksCard = ({ book }) => {
  const {
    author,
    bookName,
    category,
    image,
    rating,
    tags,
    bookId,
  } = book;

  return (
    <Link
      to={`/bookDetails/${bookId}`}
      className="fade-up group bg-white/8 backdrop-blur-md rounded-2xl p-5 border border-white/15 shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-white/12 hover:-translate-y-1"
    >
      <div className=" py-8 px-12 sm:px-16 md:px-20 lg:px-24 mb-4 bg-linear-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center">
        <div className=" h-48">
          <img
            className=" w-full rounded-xl h-full  object-contain  shadow-md"
            src={image}
            alt={bookName}
          />
        </div>
      </div>
      <div className="">
        <div className="flex items-center mb-4 gap-3 text-[#23BE0A]">
          {tags.map((tag, index) => (
            <p key={index} className="px-4 py-1.5 bg-[#23BE0A]/5 rounded-2xl ">
              {tag}
            </p>
          ))}
        </div>
        <div className="mb-10 ">
          <h2 className="font-bold text-2xl mb-4 bg-linear-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
            {bookName}
          </h2>
          <p className="font-medium text-accent">By : {author}</p>
        </div>
        <div className="flex items-center justify-between text-warning font-medium">
          <p>{category}</p>
          <div className="flex items-center gap-1 ">
            <p>{rating}</p>
            <FaRegStar />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BooksCard;
