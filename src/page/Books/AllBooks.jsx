import React, { use } from "react";
import BooksCard from "./BooksCard";
const booksPromise = fetch("/booksData.json").then((res) => res.json());
const AllBooks = () => {
  const books = use(booksPromise);

  console.log(books);
    return (
      <div className="page-width px-5 xl:px-0">
        <h2 className="mb-9 font-bold text-2xl text-center bg-linear-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">Books</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BooksCard key={book.bookId} book={book} />
          ))}
        </div>
      </div>
    );
};

export default AllBooks;
