import { createContext, useState } from "react";

export const ReadsBookContext = createContext();

const BookProvider = ({ children }) => {
  const [storedBook, setStoredBook] = useState([]);
  const [wishlistBook, setWishlistBook] = useState([]);

  const handleReadNowBtn = (findBook) => {
    if (!findBook) return;
    const alreadyInWishlist = wishlistBook.find((b) => b.bookId === findBook.bookId,);
    const exitingBook = storedBook.find((b) => b.bookId === findBook.bookId);
    if (alreadyInWishlist) {
      alert("book already wishList");
      return;
    }
    if (exitingBook) {
      alert("book already added");
      return;
    } else {
      setStoredBook([...storedBook, findBook]);
    }
  };
  const handleWishListNowBtn = (findBook) => {
    if (!findBook) return;
    const alreadyInReading = storedBook.find(
      (b) => b.bookId === findBook.bookId,
    );
    const exitingBook = wishlistBook.find((b) => b.bookId === findBook.bookId);

    if (alreadyInReading) {
      alert("book already storedList");
      return;
    }
    if (exitingBook) {
      alert("book already added");
      return;
    } else {
      setWishlistBook([...wishlistBook, findBook]);
    }
  };

  const allStatsAndFunction = {
    storedBook,
    setStoredBook,
    wishlistBook,
    setWishlistBook,
    handleReadNowBtn,
    handleWishListNowBtn,
  };

  return (
    <ReadsBookContext.Provider value={allStatsAndFunction}>
      {children}
    </ReadsBookContext.Provider>
  );
};

export default BookProvider;
