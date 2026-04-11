import React from "react";
import Navbar from "../components/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../page/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop";
import useScrollAnimation from "../Hooks/useScrollAnimation";

const RootLayout = () => {
  useScrollAnimation();
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
      <div className="fade-up">
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
