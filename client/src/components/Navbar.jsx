import {useState} from "react";
import { Link, NavLink } from "react-router-dom";

 const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#0f0d0a] border-b border-gray-800">

      {/* Logo */}
      <h1 className="text-xl font-bold text-white">
        Clip<span className="text-[#d4a853]">.Trace</span>
      </h1>

      {/* Nav links */}
      <div className="flex gap-6 text-sm">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-[#2a2318] pb-1"
              : " text-[#a09070] hover:text-white"
          }
        >
          Links
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-[#d4a853] pb-1"
              : "text-[#a09070] hover:text-white"
          }
        >
          Analytics
        </NavLink>

      </div>
    </div>
  );
};

export default Navbar;