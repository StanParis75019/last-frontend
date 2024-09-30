import React from 'react';
import { FaLightbulb, FaBook, FaUsers, FaCogs } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <section id="about" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Titre principal de la section À propos */}
        <h2 className="text-3xl font-bold text-center mb-8">À propos de QuizStan</h2>

        {/* Grille pour les cartes de contenu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Carte 1 : Quiz Innovants */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
            {/* Icône représentant l'innovation */}
            <FaLightbulb className="text-4xl text-blue-500 mx-auto mb-4" />
            {/* Titre de la carte */}
            <h3 className="text-xl font-semibold mb-2">Quiz Innovants</h3>
            {/* Description de la carte */}
            <p className="text-gray-600">
              Explorez une variété de quiz interactifs pour tester vos compétences dans différents domaines.
            </p>
          </div>

          {/* Carte 2 : Catégories Variées */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
            {/* Icône représentant les catégories */}
            <FaBook className="text-4xl text-green-500 mx-auto mb-4" />
            {/* Titre de la carte */}
            <h3 className="text-xl font-semibold mb-2">Catégories Variées</h3>
            {/* Description de la carte */}
            <p className="text-gray-600">
              Choisissez parmi une large gamme de catégories pour adapter le quiz à vos centres d'intérêt.
            </p>
          </div>

          {/* Carte 3 : Communauté Active */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
            {/* Icône représentant la communauté */}
            <FaUsers className="text-4xl text-purple-500 mx-auto mb-4" />
            {/* Titre de la carte */}
            <h3 className="text-xl font-semibold mb-2">Communauté Active</h3>
            {/* Description de la carte */}
            <p className="text-gray-600">
              Rejoignez une communauté de passionnés et partagez vos résultats avec vos amis.
            </p>
          </div>

          {/* Carte 4 : Simplicité et Performance */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
            {/* Icône représentant la performance */}
            <FaCogs className="text-4xl text-red-500 mx-auto mb-4" />
            {/* Titre de la carte */}
            <h3 className="text-xl font-semibold mb-2">Simplicité et Performance</h3>
            {/* Description de la carte */}
            <p className="text-gray-600">
              Notre application est rapide, simple d'utilisation et conçue pour vous offrir la meilleure expérience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
