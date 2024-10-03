import React, { useState } from 'react';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/newNav';
import axios from 'axios';
import { BASE_URL } from '../../Components/Constant';
import { toast, Toaster } from 'react-hot-toast';

const ContactPage = () => {
  // État pour stocker les données du formulaire de contact
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // État pour gérer le chargement lors de l'envoi du message
  const [loading, setLoading] = useState(false);

  // Gère les changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gère la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Active le spinner
    setLoading(true);

    try {
      await axios.post(BASE_URL + "messages", {
        senderName: formData.name,
        email: formData.email,
        messageBody: formData.message
      });

      toast.success("Message envoyé avec succès", {
        style: { backgroundColor: "green", color: 'white' }
      });

      // Réinitialise le formulaire après l'envoi
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message");
    } finally {
      // Désactive le spinner
      setLoading(false);
    }
  };

  return (
    <div className="ContactPage"> 
      <Toaster />
      <Navbar />

      {/* Section Héro */}
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x400?contact')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl text-white font-bold">Contactez-Nous</h1>
        </div>
      </section>

      {/* Informations de Contact */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Détails de Contact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              N'hésitez pas à nous contacter pour toutes questions ou assistance. Nous sommes ici pour vous aider !
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Élément de contact 1 : Adresse */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Adresse</h3>
              <p className="text-gray-600">
                123 Rue de l'Informatique, Paris, France
              </p>
            </div>

            {/* Élément de contact 2 : Email */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Email</h3>
              <p className="text-gray-600">
                <a href="mailto:contact@monquiz.com" className="hover:text-blue-600">contact@monquiz.com</a>
              </p>
            </div>

            {/* Élément de contact 3 : Téléphone */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Téléphone</h3>
              <p className="text-gray-600">
                <a href="tel:+33123456789" className="hover:text-blue-600">+33 1 23 45 67 89</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de Contact */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Envoyez-nous un message</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Utilisez le formulaire ci-dessous pour nous envoyer un message. Nous vous répondrons dans les plus brefs délais.
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Champ Nom */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              {/* Champ Email */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
            </div>

            {/* Champ Message */}
            <div className="mt-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            {/* Bouton de soumission */}
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
                disabled={loading}  // Disable button while loading
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Envoi...
                  </div>
                ) : (
                  'Envoyer le Message'
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
