import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../Constant';
import {toast, Toaster} from 'react-hot-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
const [isloading, setisloading] = useState(false)
  // Gère l'envoi du formulaire
  const handleSubmit = async (e)  => {
    e.preventDefault();
    setisloading(true)
    // Logique de souscription ici
    try {
      await axios.post(BASE_URL+'newsletter/create', {email})
      toast.success("Vous etes inscrit à la Newsletter")
    } catch (error) {
      toast.error("Erreur d'envoi")
    }
    setEmail(''); // Réinitialise le champ de saisie après la soumission
  };

  return (
    <section id="newsletter" className="py-12 bg-blue-600">
      <Toaster></Toaster>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          {/* Titre de la section */}
          <h2 className="text-3xl font-bold text-white">Abonnez-vous à notre Newsletter</h2>
          {/* Description de la section */}
          <p className="text-blue-200 mt-2">Recevez les dernières mises à jour et quiz directement dans votre boîte email.</p>
        </div>

        {/* Formulaire d'inscription */}
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex flex-col sm:flex-row items-center">
              {/* Champ de saisie pour l'email */}
              <input
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4 sm:mb-0 sm:mr-4"
                required
              />
              {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full sm:w-auto bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition ease-in-out duration-300"
              >
                S'abonner
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
