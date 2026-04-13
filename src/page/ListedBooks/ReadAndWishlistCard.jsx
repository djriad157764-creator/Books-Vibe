import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { MdOutlineInsertPageBreak } from "react-icons/md";
import { Link } from "react-router";

const ReadAndWishlistCard = ({ book }) => {
  const {
    author,
    bookName,
    category,
    image,
    publisher,
    rating,
    bookId,
    tags,
    yearOfPublishing,
    totalPages,
  } = book;
  const generic = () => {
    if (image && image.trim() !== "") {
      return image;
    }
    return "https://via.placeholder.com/400x500?text=No+Cover";
  };
  return (
    <div className=" border ff-fade-up rounded-2xl border-white/10 lg:flex  items-center gap-6 p-6 page-width ">
      <div className=" bg-white/5 backdrop-blur-sm rounded-2xl py-8 mb-4 px-13 flex items-center justify-center border border-white/10">
        <img
          className="w-32.25  h-auto object-contain rounded-xl shadow-lg "
          src={generic()}
          alt={bookName}
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/400x500?text=No+Cover")
          }
        />
      </div>
      <div className="">
        <div className="  ">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">
            {bookName}
          </h3>
          <p className="font-medium text-xl mb-4">By : {author}</p>
        </div>

        <div className="flex items-center gap-4  flex-wrap mb-4 ">
          <p className="font-bold  text-neutral-400 ">Tag</p>
          {tags.map((tag, index) => (
            <p key={index} className="text-[#23BE0A] font-medium px-4 py-1.5">
              #{tag}
            </p>
          ))}
          <p className="flex items-center gap-1">
            <CiLocationOn /> Year of Publishing: {yearOfPublishing}
          </p>
        </div>
        <div className=" max-w-100 mb-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-4 ">
            <div className="flex items-center gap-2 text-white text-sm">
              <FiUsers />
              <p>
                Publisher : <span className="italic"> {publisher}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-white text-sm">
              <MdOutlineInsertPageBreak />
              <p>Page : {totalPages}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 ">
          <h3 className="px-2 lg:px-6 py-3 text-[#328EFF] rounded-full  bg-[#328EFF]/15    cursor-pointer">
            Category : {category}
          </h3>
          <h3 className="px-2 lg:px-6 py-3 rounded-full  text-[#FFAC33] bg-[#FFAC33]/15    cursor-pointer">
            Ratting : {rating}
          </h3>

          <Link to={`/bookDetails/${bookId}`}>
            <button
              className={`px-2 lg:px-6 py-3 text-white text-lg rounded-full font-medium bg-[#23BE0A]  cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg `}
            >
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReadAndWishlistCard;
