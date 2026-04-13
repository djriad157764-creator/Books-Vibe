import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Logo from "../assets/riad.png";

export const ReadsBookContext = createContext();

const BookProvider = ({ children }) => {
  const newDate = new Date();
  console.log(newDate);
  // get data from localStorage
  const loadFromLocalStorage = (key, defaultValue) => {
    const saveData = localStorage.getItem(key);
    if (saveData) {
      return JSON.parse(saveData);
    }
    return defaultValue;
  };

  // create state with localStorage data
  const [storedBook, setStoredBook] = useState(() =>
    loadFromLocalStorage("storedBook", []),
  );
  const [wishlistBook, setWishlistBook] = useState(() =>
    loadFromLocalStorage("wishlistBook", []),
  );

  // set data in local storage
  useEffect(() => {
    localStorage.setItem("storedBook", JSON.stringify(storedBook));
  }, [storedBook]);
  // set data in local storage
  useEffect(() => {
    localStorage.setItem("wishlistBook", JSON.stringify(wishlistBook));
  }, [wishlistBook]);

  // handle Read List btn
  const handleReadNowBtn = (findBook) => {
    if (!findBook) return;
    const alreadyInWishlist = wishlistBook.find(
      (b) => b.bookId === findBook.bookId,
    );
    const exitingBook = storedBook.find((b) => b.bookId === findBook.bookId);
    if (alreadyInWishlist) {
      toast.error("Book Already WishList");
      return;
    }
    if (exitingBook) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-custom-enter" : "animate-custom-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="w-15 rounded-full h-15 object-cover"
                  src={Logo}
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {findBook.bookName}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Already Available try another Books!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-none rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 "
            >
              Close
            </button>
          </div>
        </div>
      ));
      return;
    } else {
      setStoredBook([...storedBook, findBook]);
      toast.success(
        <p>
          Success <span className="font-bold">{findBook.bookName}</span> Added
          in <span className="text-pink-500">ReadList</span> ❤️
        </p>,
      );
    }
  };

  // handle wishlist btn
  const handleWishListNowBtn = (findBook) => {
    if (!findBook) return;
    const alreadyInReading = storedBook.find(
      (b) => b.bookId === findBook.bookId,
    );
    const exitingBook = wishlistBook.find((b) => b.bookId === findBook.bookId);

    if (alreadyInReading) {
      toast.error("Book already StoredList");
      return;
    }
    if (exitingBook) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-custom-enter" : "animate-custom-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="w-15 rounded-full h-15 object-cover"
                  src={Logo}
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {findBook.bookName}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Already Available try another Books!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-none rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 "
            >
              Close
            </button>
          </div>
        </div>
      ));
      return;
    } else {
      setWishlistBook([...wishlistBook, findBook]);
      toast.success(
        <p>
          Success <span className="font-bold">{findBook.bookName}</span> Added
          in <span className="text-pink-500">Wishlist</span> ❤️
        </p>,
      );
    }
  };

  // const handleReadListClearBtn = () => {
  //   if (storedBook.length === 0 || !storedBook) return;
  //     const isConfirmed = window.confirm(
  //       `⚠️ Are you sure?\n\nYou have ${storedBook.length} book(s) in your reading list.\n\nThis action cannot be undone!`,
  //     );

  //     if (isConfirmed) {
  //       setStoredBook([]);
  //       alert("All books removed from reading list!");
  //     }
  // };

  const handleReadListClearBtn = () => {
    if (storedBook.length === 0) {
      toast.error("No books in reading list!", {
        duration: 2000,
        position: "top-center",
        icon: "📭",
      });
      return;
    }

    // confirm toast
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="font-bold">⚠️ Clear Reading List?</p>
          <p>You have {storedBook.length} book(s). This cannot be undone!</p>
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setStoredBook([]);
                toast.success(`🗑️ ${storedBook.length} books removed!`, {
                  duration: 3000,
                  icon: "✅",
                });
              }}
              className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm cursor-pointer"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-500 text-white rounded-lg text-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
      },
    );
  };

  // const handleWishListClearBtn = () => {
  //   if (wishlistBook.length === 0 || !wishlistBook) return;
  //   setWishlistBook([]);
  // };

  const handleWishListClearBtn = () => {
    if (wishlistBook.length === 0) {
      toast.error("No Books in Wishlist!", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }

    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="font-bold">⚠️ Clear Wishlist?</p>
          <p>You have {wishlistBook.length} books(s). This cannot be undone!</p>
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setWishlistBook([]);
                toast.success(
                  `❤️ ${wishlistBook.length} books removed from wishlist!`,
                );
              }}
              className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm cursor-pointer"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 bg-gray-500 text-white rounded-lg text-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
        position: "top-center",
      },
    );
  };

  const allStatsAndFunction = {
    storedBook,
    setStoredBook,
    wishlistBook,
    setWishlistBook,
    handleReadNowBtn,
    handleWishListNowBtn,
    handleWishListClearBtn,
    handleReadListClearBtn,
  };

  return (
    <ReadsBookContext.Provider value={allStatsAndFunction}>
      {children}
    </ReadsBookContext.Provider>
  );
};

export default BookProvider;
