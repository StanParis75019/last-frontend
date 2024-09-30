// components/Navbar.js
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from'react-router-dom';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white fixed w-full z-10 top-0 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link className='cursor-pointer' to={'/'}>
        <h1 className="text-2xl font-bold">QuizStan</h1>
        
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-300">Accueil</a>
          <a href="#about" className="hover:text-gray-300">À propos</a>
          <a href="#categories" className="hover:text-gray-300">Catégories</a>
          <a href="#contact" className="hover:text-gray-300">Contact</a>
          <a href="#auth" className="hover:text-gray-300">Authentification</a>
        </div>

        {/* Hamburger Menu for mobile */}
        <div className="md:hidden">
          <button onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <div className="md:hidden bg-gray-800 p-4 space-y-4">
          <a href="#" className="block hover:text-gray-300">Accueil</a>
          <a href="#about" className="block hover:text-gray-300">À propos</a>
          <a href="#categories" className="block hover:text-gray-300">Catégories</a>
          <a href="#contact" className="block hover:text-gray-300">Contact</a>
          <a href="#auth" className="block hover:text-gray-300">Authentification</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
