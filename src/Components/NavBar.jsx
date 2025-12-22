import { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { FiSearch, FiX } from "react-icons/fi";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] bg-white shadow-md rounded-2xl z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <span className="text-2xl font-bold text-[#73301c]">
            EventSphere
          </span>

          {/* Navigation */}
          <div className="flex items-center space-x-8">
            <a href="#home" className="nav-link">Home</a>
            <a href="#events" className="nav-link">Events</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4 relative">

            {/* Search input */}
            <div
              className={`flex items-center transition-all duration-300 ease-in-out overflow-hidden
              ${showSearch ? "w-64 opacity-100" : "w-0 opacity-0"}`}
            >
              <div className="flex items-center bg-white rounded-lg shadow-md border-2 border-[#73301c] px-2">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full px-3 py-2 text-sm outline-none bg-transparent"
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="text-gray-500 hover:text-red-500 cursor-pointer"
                >
                  <FiX />
                </button>
              </div>
            </div>

            {/* Search Icon */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-gray-600 hover:text-[#73301c] cursor-pointer transition-colors"
            >
              <FiSearch className="text-xl" />
            </button>

            {/* Cart */}
            <button className="relative text-gray-600 hover:text-[#73301c] cursor-pointer">
              <BsCart2 className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-[#73301c] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>

            {/* Admin */}
            <button className="text-gray-600 hover:text-[#73301c] cursor-pointer">
              <GrUserAdmin className="text-xl" />
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}
