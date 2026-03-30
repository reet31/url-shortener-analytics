import {useState} from "react";
import { Link, NavLink } from "react-router-dom";

 const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#0b0f14] border-b border-gray-800">

      {/* Logo */}
      <h1 className="text-xl font-bold text-white">
        LNK<span className="text-green-400">.IO</span>
      </h1>

      {/* Nav links */}
      <div className="flex gap-6 text-sm">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-green-400 pb-1"
              : " text-gray-400 hover:text-white"
          }
        >
          Links
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-green-400 pb-1"
              : "text-gray-400 hover:text-white"
          }
        >
          Analytics
        </NavLink>

      </div>
    </div>
  );
};

export default Navbar;