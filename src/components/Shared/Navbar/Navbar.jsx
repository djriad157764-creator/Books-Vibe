import React from "react";
import { NavLink } from "react-router";

const navItem = [
  { id: 1, path: "/", name: "Home" },
  { id: 2, path: "/listed", name: "Listed Books" },
  { id: 3, path: "/read", name: "Pages to Read" },
];

const Navbar = () => {
  return (
    <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg mb-12 sticky top-0 z-50">
      <div className="navbar page-width mx-auto  ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItem.map((item) => (
                <li className="mb-4" key={item.id}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ?
                        "text-blue-600 text-lg border rounded-md font-semibold"
                      : "text-lg text-white"
                    }
                    to={item.path}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <a className="font-bold text-xl sm:text-2xl lg:text-[28px] bg-linear-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
            Book Vibe
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItem.map((item) => (
              <li className="mr-4" key={item.id}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ?
                      "text-blue-600 text-lg border rounded-md font-semibold"
                    : "text-lg text-white"
                  }
                  to={item.path}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:navbar-end space-x-4 ">
          <button className="btn bg-[#23BE0A] text-white  text-lg rounded-lg hidden lg:flex">
            Sign In
          </button>
          <button className="btn bg-[#59C6D2] text-white  text-lg rounded-lg hidden lg:flex">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
