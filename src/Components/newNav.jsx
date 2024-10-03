import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // State for mobile navigation menu
  const [navOpen, setNavOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
    window.location.reload();
  };

  // Fetch user data from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (user) {
      setUserName(user);
    }
  }, []);

  // Navigate to dashboard based on role
  const navigateToDashboard = () => {
    if (userName?.role === 'USER') {
      window.location.href = '/DashboardAdmin';
    } else {
      window.location.href = '/DashboardUser';
    }
  };
  const navigateToQuiz = () => {
    if (userName?.role === 'ADMIN') {
      window.location.href = '/quizManagment';
    } else {
      window.location.href = '/UsersQuiz?query=';
    }
  }

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="z-50 relative bg-gray-800 text-white fixed w-full z-10 top-0 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link className="cursor-pointer" to="/">
          <h1 className="text-2xl font-bold">QuizStan</h1>
        </Link>

        {/* Desktop navigation links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">Accueil</Link>
          <Link to="/about" className="hover:text-gray-300">À propos</Link>
          <Link to="/categories" className="hover:text-gray-300">Catégories</Link>
          {!userName ?  (
            <Link to="/quiz" className="hover:text-gray-300">Exemples Quiz</Link>

          ) : (
            userName.role === "ADMIN" ? (
              <Link to="/quizManagment" className="hover:text-gray-300">Quiz</Link>
            ) : (
              <Link to="/UsersQuiz?query=" className="hover:text-gray-300">Quiz</Link>
            )
          )}
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          
          {userName ? (
            <div className="relative">
              {/* Dropdown trigger */}
              <button
                onClick={toggleDropdown}
                className="bg-gray-500 text-white rounded-xl font-bold px-4 py-2 outline-none hover:bg-gray-700"
              >
                Bonjour, {userName?.username}
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg py-2 w-48">
                  <button
                    onClick={navigateToDashboard}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={navigateToQuiz}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    quizs
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="hover:text-gray-300">Authentification</Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {navOpen && (
        <div className="md:hidden bg-gray-800 p-4 space-y-4">
          <Link to="/" className="block hover:text-gray-300">Accueil</Link>
          <Link to="/about" className="block hover:text-gray-300">À propos</Link>
          <Link to="/categories" className="block hover:text-gray-300">Catégories</Link>
          <Link to="/contact" className="block hover:text-gray-300">Contact</Link>
          <Link to="/auth" className="block hover:text-gray-300">Authentification</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
