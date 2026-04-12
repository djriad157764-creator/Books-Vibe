import React, { useContext } from "react";
import { ReadsBookContext } from "../../context/BookContext";

const PageToRead = () => {
  const contextValue = useContext(ReadsBookContext);
  const { wishlistBook = [], setWishlistBook = () => {} } = contextValue || {};
  return <div>Pages to Read</div>;
};

export default PageToRead;
