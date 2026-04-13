import React, { useContext } from "react";
import ReadAndWishlistCard from "./ReadAndWishlistCard";
import { ReadsBookContext } from "../../context/BookContext";
import EmptyPage from "./EmptyPage";

const ReadBooksList = ({ sortType }) => {
  const contextValue = useContext(ReadsBookContext);

  const { storedBook = [], handleReadListClearBtn = () => {} } =
    contextValue || {};

  const getFilteredBook = () => {
    const sortBook = [...storedBook];

    if (sortType === "name") {
      sortBook.sort((a, b) => a.bookName.localeCompare(b.bookName));
    } else if (sortType === "page") {
      sortBook.sort((a, b) => (a.totalPages || 0) - (b.totalPages || 0));
    } else if (sortType === "ratting") {
      sortBook.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return sortBook;
  };

  const filteredBook = getFilteredBook();

  if (filteredBook.length === 0) {
    return <EmptyPage name="ReadList" />;
  }

  return (
    <>
      <button
        onClick={handleReadListClearBtn}
        className="text-white w-fit btn border-0 font-medium text-base bg-primary"
      >
        Clear All
      </button>
      {filteredBook.map((book, index) => (
        <ReadAndWishlistCard key={index} book={book} />
      ))}
    </>
  );
};

export default ReadBooksList;
