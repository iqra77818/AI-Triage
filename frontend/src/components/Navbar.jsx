import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi'; // Using Heroicons

const Navbar = ({ isScrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-sky-200 py-2' : 'bg-sky-300 py-4'
      } px-4 md:px-10 shadow-md mb-16 backdrop-blur-lg`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <a href="#home">
          <img
            src="/medisyn.png"
            alt="Medisyn Logo"
            className="h-10 md:h-12 w-auto object-contain scale-125"
          />
        </a>

        {/* Burger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4">
          <a
            href="#home"
            className="nav-link text-white font-bold text-xl hover:bg-white/20 px-4 py-2 rounded-md"
          >
            Home
          </a>
          <a
            href="#features"
            className="nav-link text-white font-bold text-xl hover:bg-white/20 px-4 py-2 rounded-md"
          >
            Features
          </a>
          <a
            href="#workflow"
            className="nav-link text-white font-bold text-xl hover:bg-white/20 px-4 py-2 rounded-md"
          >
            Workflow
          </a>
          <a
            href="#form"
            className="nav-link text-white font-bold text-xl hover:bg-white/20 px-4 py-2 rounded-md"
          >
            Form
          </a>
        </nav>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2 bg-sky-400 rounded-lg p-4 shadow-md">
          <a
            href="#home"
            className="text-white font-semibold text-lg hover:bg-white/20 px-4 py-2 rounded-md"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#features"
            className="text-white font-semibold text-lg hover:bg-white/20 px-4 py-2 rounded-md"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#workflow"
            className="text-white font-semibold text-lg hover:bg-white/20 px-4 py-2 rounded-md"
            onClick={() => setMenuOpen(false)}
          >
            Workflow
          </a>
          <a
            href="#form"
            className="text-white font-semibold text-lg hover:bg-white/20 px-4 py-2 rounded-md"
            onClick={() => setMenuOpen(false)}
          >
            Form
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;







