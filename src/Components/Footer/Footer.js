import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Section 1 : Liens importants */}
          <div>
            <h3 className="text-lg font-bold mb-4">Plan du site</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-400">Accueil</a></li>
              <li><a href="#about" className="hover:text-gray-400">À propos</a></li>
              <li><a href="#categories" className="hover:text-gray-400">Catégories</a></li>
              <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
              <li><a href="#auth" className="hover:text-gray-400">Authentification</a></li>
            </ul>
          </div>

          {/* Section 2 : Réseaux sociaux */}
          <div>
            <h3 className="text-lg font-bold mb-4">Suivez-nous</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" className="hover:text-gray-400">
                <FaFacebookF size={24} />
              </a>
              <a href="https://twitter.com" className="hover:text-gray-400">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="hover:text-gray-400">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Section 3 : Informations de contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contactez-nous</h3>
            <p className="text-gray-400">
              Email : <a href="mailto:contact@monquiz.com" className="hover:text-gray-400">contact@quizstan.com</a>
            </p>
            <p className="text-gray-400">
              Téléphone : <a href="tel:+123456789" className="hover:text-gray-400">+123 456 789</a>
            </p>
          </div>
        </div>

        {/* Droits d'auteur */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} QuizStan. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
