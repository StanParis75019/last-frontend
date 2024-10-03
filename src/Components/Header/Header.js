import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const router = useNavigate();
  const handleredirection = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      router("/auth")
    }
    else {
      if (user.role === 'ADMIN'){
        router("/dashboard")
      }
      else {
        router("/categories")
      }
    }

  };
  return (
    <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('Header.jpg')" }}>
      {/* Superposition sombre pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        {/* Texte animé */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-bounce">
          Bienvenue à QuizStan!
        </h1>
        
        <p className="text-lg md:text-xl mb-6">
          Testez vos connaissances dans différents domaines!
        </p>

        {/* Boutons */}
        <div className="space-x-4">
          <a onClick={handleredirection} className="bg-blue-600 px-6 py-3 cursor-pointer rounded-full text-lg font-semibold hover:bg-blue-700 transition ease-in-out duration-300">
            Commencer <FaArrowRight className="inline ml-2" />
          </a>
          <a href="/about" className="bg-transparent border-2 border-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-800 transition ease-in-out duration-300">
            À propos
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
