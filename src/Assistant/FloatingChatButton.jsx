import React, { useState } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import GemmaChatbot from "./GemmaChatbot";
import aiImage from '../assets/riad.png'

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* চ্যাট টগল বাটন */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-linear-to-r from-blue-500 to-blue-700 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:scale-110 transition-all duration-300 z-50 group"
      >
        {isOpen ?
          <FaTimes className="group-hover:rotate-90 transition-transform" />
        :  (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={aiImage}
              alt="AI Assistant"
              className="w-10 h-10 rounded-full object-cover border-2 border-white/50 group-hover:scale-110 transition-transform"
            />
            {/* টেক্সট টুলটিপ */}
            <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Ask Question 💬
            </div>
          </div>
        )
        }
      </button>

      {/* চ্যাট উইন্ডো */}
      {isOpen && <GemmaChatbot />}
    </>
  );
};

export default FloatingChatButton;
