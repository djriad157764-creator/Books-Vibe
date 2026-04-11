import React from "react";
import Navbar from "../components/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../page/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
