import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./ListedBooks.css";
import { useContext, useState } from "react";
import { ReadsBookContext } from "../../context/BookContext";
import ReadBooksList from "./ReadBooksList";
import WishlistBooksList from "./WishlistBooksList";
import { IoIosArrowDown } from "react-icons/io";

const ListedBooks = () => {
  const contextValue = useContext(ReadsBookContext);
  const [sortType, setSortType] = useState("");
  const {
    storedBook = [],
    wishlistBook = [],
  } = contextValue || {};

  return (
    <div className="mx-5 xl:mx-0 fade-up">
      <div className="text-white  page-width">
        <div className="">
          <div className="p-8 bg-white/5 text-center rounded-2xl mb-8">
            <h4 className=" font-bold text-xl sm:text-2xl md:text-3xl ">
              Books
            </h4>
          </div>
          <div className="flex justify-center mb-8">
            <div className="dropdown ">
              <div tabIndex={0} role="button" className="btn m-1">
                <p className="flex items-center gap-1">
                  Sort By : {sortType}
                  <IoIosArrowDown className="text-xl mt-1" />
                </p>
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-transparent backdrop-blur-xl rounded-box z-1 w-40 p-2 shadow-sm"
              >
                <li onClick={() => setSortType("name")}>
                  <a>Name</a>
                </li>
                <li onClick={() => setSortType("page")}>
                  <a>Page</a>
                </li>
                <li onClick={() => setSortType("ratting")}>
                  <a>Ratting</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Tabs>
          <TabList>
            <Tab>Read Books ({storedBook.length})</Tab>
            <Tab>Wishlist Books ({wishlistBook.length})</Tab>
          </TabList>

          <TabPanel>
            <div className="flex flex-col gap-4 mt-8">
              <ReadBooksList sortType={sortType} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-4 mt-8 ">
              <WishlistBooksList sortType={sortType} />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default ListedBooks;
