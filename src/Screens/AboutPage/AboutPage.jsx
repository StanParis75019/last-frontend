import React from 'react';
import Navbar from '../../Components/newNav';
import Footer from '../../Components/Footer/Footer';

const AboutPage = () => {
  return (
    <div className="AboutPage">
      <Navbar />

      {/* Section Héro */}
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x400')" }}>
        {/* Superposition sombre pour améliorer la lisibilité du texte */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl text-white font-bold">À propos de QuizStan</h1>
        </div>
      </section>

      {/* Contenu de la section À propos */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            {/* Titre et description de la section À propos */}
            <h2 className="text-3xl font-bold mb-4">Découvrez QuizStan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              QuizStan est une application qui vous permet de tester vos connaissances dans une variété de catégories. Que vous soyez un passionné de culture générale, un expert en sciences ou simplement un curieux, QuizStan a quelque chose pour vous. Nous croyons en l'apprentissage par le jeu et en la puissance de la communauté.
            </p>
          </div>

          {/* Section des fonctionnalités */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fonctionnalité 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Diversité des Quiz</h3>
              <p className="text-gray-600">
                Explorez des quiz dans divers domaines, allant des sciences à la culture générale. Nous ajoutons régulièrement de nouveaux quiz pour vous maintenir engagé.
              </p>
            </div>

            {/* Fonctionnalité 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Conception Intuitive</h3>
              <p className="text-gray-600">
                Une interface simple et intuitive pour une expérience utilisateur fluide. Commencez un quiz en quelques clics, sans tracas.
              </p>
            </div>

            {/* Fonctionnalité 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Communauté Active</h3>
              <p className="text-gray-600">
                Rejoignez notre communauté dynamique où vous pouvez partager vos résultats et affronter vos amis dans des défis amusants.
              </p>
            </div>
          </div>

          {/* Section Équipe ou Vision (à développer) */}
          
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
