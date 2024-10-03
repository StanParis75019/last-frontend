// CategoriesPage.js
import React from 'react';
import Navbar from '../Components/newNav';
import Footer from '../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: "Culture Générale",
    image: "https://i0.wp.com/wallacekpond.com/wp-content/uploads/2017/07/culture.jpg?resize=705%2C435&ssl=1",
    quizzes: 15,
    description: "Testez vos connaissances générales sur des sujets divers et variés."
  },
  {
    id: 2,
    title: "Science",
    image: "https://as2.ftcdn.net/v2/jpg/05/79/64/29/1000_F_579642932_z3CUhYjjYWcGIWJtO30pMyYVFpDyoa1W.jpg",
    quizzes: 10,
    description: "Explorez les merveilles de la science avec nos quiz captivants."
  },
  {
    id: 3,
    title: "Histoire",
    image: "https://www.mooc.org/hubfs/history.jpg",
    quizzes: 8,
    description: "Voyagez dans le passé avec des quiz sur l'histoire du monde."
  },
  {
    id: 4,
    title: "Sport",
    image: "https://www.macsf.fr/var/macsf/storage/images/2/0/2/5/935202-12-fre-FR/Quel-sport-est-adapte_615x555.jpg",
    quizzes: 12,
    description: "Mettez vos connaissances sportives à l'épreuve avec nos quiz."
  },
  {
    id: 5,
    title: "Technologie",
    image: "https://img.freepik.com/photos-gratuite/coup-moyen-homme-portant-lunettes-vr_23-2149126949.jpg?t=st=1727972220~exp=1727975820~hmac=0b17f7cf54a91984555aeb2095f4f928735224080a621b693c6cc18a69405a1d&w=1060",
    quizzes: 7,
    description: "Découvrez les dernières avancées technologiques avec nos quiz."
  },
  {
    id: 6,
    title: "Art",
    image: "https://esoftskills.com/fr/wp-content/uploads/2024/03/Limportance-de-lart-et-de-la-creativite-pour-le-bien-etre.jpg",
    quizzes: 9,
    description: "Exprimez-vous à travers des quiz sur l'art et la créativité."
  }
];

const CategoriesPage = () => {
  const router = useNavigate()
  const handlequizshow = (Search) =>{
    const user = localStorage.getItem('user');
    if(!user){
      router('/auth')
    } else {
      router (`/usersquiz?query=${Search}`)
    }
  }
  return (
    <div className="CategoriesPage">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x400?categories')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl text-white font-bold">Explorez Nos Catégories</h1>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Choisissez une Catégorie</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Parcourez les différentes catégories de quiz et plongez dans une expérience enrichissante en testant vos connaissances.
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                {/* Category Image */}
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-48 object-cover"
                />

                {/* Category Details */}
                <div className="p-6 text-center">
                  {/* Badge for Quiz Count */}
                  {/* <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
                    {category.quizzes} Quizs
                  </span> */}

                  {/* Category Title */}
                  <h3 className="text-xl font-semibold mb-4">{category.title}</h3>

                  {/* Category Description */}
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>

                  {/* Explore Button */}
                  <a onClick={()=>handlequizshow(category.title)} className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition ease-in-out duration-300">
                    Voir les Quizs
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoriesPage;
