import Navbar from "../components/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../page/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop";
import useScrollAnimation from "../Hooks/useScrollAnimation";
import FloatingChatButton from "../Assistant/FloatingChatButton";

const RootLayout = () => {
  useScrollAnimation();
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <main className="relative">
        <Outlet />
      </main>
      <div className="fade-up">
        <Footer />
      </div>

      <FloatingChatButton />
    </div>
  );
};

export default RootLayout;
