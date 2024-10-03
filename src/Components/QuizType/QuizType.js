import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: "Culture Générale",
    image: "https://i0.wp.com/wallacekpond.com/wp-content/uploads/2017/07/culture.jpg?resize=705%2C435&ssl=1",
    quizzes: 10,
  },
  {
    id: 2,
    title: "Science",
    image: "https://as2.ftcdn.net/v2/jpg/05/79/64/29/1000_F_579642932_z3CUhYjjYWcGIWJtO30pMyYVFpDyoa1W.jpg",
    quizzes: 8,
  },
  {
    id: 3,
    title: "Histoire",
    image: "https://www.mooc.org/hubfs/history.jpg",
    quizzes: 12,
  },
  {
    id: 4,
    title: "Sport",
    image: "https://www.macsf.fr/var/macsf/storage/images/2/0/2/5/935202-12-fre-FR/Quel-sport-est-adapte_615x555.jpg",
    quizzes: 6,
  },
];

const CategorySection = () => {
  const Navigate = useNavigate();
  const verifyAuthentication= (title) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      Navigate(`/usersquiz?query=${title}`)
    }
    else{
      Navigate('/auth')
    }
  }
  return (
    <section id="categories" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Titre principal de la section Catégories */}
        <h2 className="text-3xl font-bold text-center mb-8">Catégories de Quiz</h2>

        {/* Grille pour les cartes de catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
              {/* Image de la catégorie */}
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-40 object-cover"
              />
              
              <div className="p-6 text-center">
                {/* Badge pour indiquer le nombre de quiz */}
                {/* <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
                  {category.quizzes} Quizs
                </span> */}

                {/* Titre de la catégorie */}
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>

                {/* Bouton pour voir les quizs de la catégorie */}
                <a onClick={()=>verifyAuthentication(category.title)} className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition ease-in-out duration-300">
                  Voir les Quizs
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className='w-full my-6 flex flex-row justify-center items-center'>

        <a href="/categories" className='bg-blue-600 text-center flex flex-row justify-center items-center w-52 cursor-pointer text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition ease-in-out duration-300'>voir tous les catégories</a>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
