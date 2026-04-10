import React from "react";
import { useLoaderData, useParams } from "react-router";

const BooksDetails = () => {
  const { id } = useParams();
  const books = useLoaderData();
  console.log( books);
  return (
    <div className="text-white">
      <div className="">
        <img src="" alt="" />
      </div>
      <div className="">
        <div className="">
          <h3>name</h3>
          <p>author</p>
        </div>
        <div className="">
          <p>category</p>
        </div>
        <div className="">
          <p>review</p>
        </div>
        <div className="flex items-center gap-4">
          <p>tag</p>
          <p>young</p>
          <p>identity</p>
        </div>
        <div className="">
          <div className="">
            <div className="flex items-center justify-between text-start">
              <p>number of page</p>
            </div>
            <div className="">324</div>
          </div>
          <div className="">
            <div className="">
              <p>number of page</p>
            </div>
            <div className="">324</div>
          </div>
          <div className="">
            <div className="">
              <p>number of page</p>
            </div>
            <div className="">324</div>
          </div>
          <div className="">
            <div className="">
              <p>number of page</p>
            </div>
            <div className="">324</div>
          </div>
        </div>
        <div className="">
          <button>Read</button>
          <button>Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default BooksDetails;
