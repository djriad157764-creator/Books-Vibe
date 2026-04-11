import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              📚 Book Vibe
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Discover your next favorite book from our vast collection. Read,
              review, and connect with book lovers worldwide.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-white/50 hover:text-blue-400 transition-colors duration-300"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-blue-400 transition-colors duration-300"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-pink-500 transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-gray-400 transition-colors duration-300"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-white/50 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/listed"
                  className="text-white/50 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  Listed Books
                </a>
              </li>
              <li>
                <a
                  href="/read"
                  className="text-white/50 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  Pages to Read
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-white/50 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-white/50 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  Fiction
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  Fantasy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  Romance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  Mystery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/50 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  Science Fiction
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>123 Book Street, Library City, BC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <FaPhone className="text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <FaEnvelope className="text-blue-400" />
                <span>info@bookvibe.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="text-white/80 text-sm font-medium mb-2">
                Subscribe to Newsletter
              </h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-blue-400 transition-colors"
                />
                <button className="px-4 py-2 bg-linear-to-r from-blue-500 to-blue-700 text-white text-sm rounded-lg hover:scale-105 transition-transform duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm text-center sm:text-left">
              © {currentYear} Book Vibe. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-white/40 hover:text-white/60 transition-colors duration-300 text-xs"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white/40 hover:text-white/60 transition-colors duration-300 text-xs"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-white/40 hover:text-white/60 transition-colors duration-300 text-xs"
              >
                Cookies Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
