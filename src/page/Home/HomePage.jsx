import React from "react";
import Banner from "../Banner/Banner";
import AllBooks from "../AllBooks/AllBooks";

const HomePage = () => {
  return (
    <div>
      <div className="fade-up">
        <Banner />
      </div>
      <div className="fade-up ">
        <AllBooks />
      </div>
    </div>
  );
};

export default HomePage;
