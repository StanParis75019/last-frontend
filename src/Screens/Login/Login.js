import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../../Components/newNav';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { BASE_URL } from '../../Components/Constant';
import { toast, Toaster } from'react-hot-toast';

const AuthPage = () => {
  // État pour déterminer si l'utilisateur est sur le formulaire de connexion ou d'inscription
  const [isLogin, setIsLogin] = useState(true);
  
  // État pour afficher ou masquer le mot de passe
  const [showPassword, setShowPassword] = useState(false);
  
  // État pour stocker les informations du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    role: 'player', // Rôle par défaut pour la connexion
  });

  // Change entre le formulaire de connexion et d'inscription
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Bascule l'affichage du mot de passe entre visible et masqué
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Met à jour les valeurs du formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gère la soumission du formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (formData.role === "player") {
        const response = await axios.post(BASE_URL + 'users/login', {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
        toast.success('Bien authentifié')
        localStorage.setItem('user', JSON.stringify(response.data));

        
        // Redirige vers la page d'accueil de l'utilisateur
        window.location.href = '/DashboardUser';

      } else {
        console.log(formData);
        const response = await axios.post(BASE_URL + 'auth/login', {
          email: formData.email,
          password: formData.password
        });
        console.log(response);
        toast.success('Bien authentifié')
        // Stocke le token JWT
        localStorage.setItem('user', JSON.stringify(response.data));
        
        
        // Redirige vers la page d'accueil de l'administrateur
        window.location.href = '/Dashboard';
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error("ll y a un probleme avec l'authentification de votre compte")
    }
  };
 
  // Gère la soumission du formulaire d'inscription
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(BASE_URL + 'users/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      
      // Stocke le token JWT
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // Redirige vers la page d'accueil
      window.location.href = '/DashboardUser';
    } catch (error) {
      console.error('Signup failed:', error.response.data)
      toast.error("ll y a un probleme avec l'authentification de votre compte");
    }
  };

  return (
    <div className="AuthPage">
      <Navbar />

      {/* Conteneur du formulaire d'authentification */}
      <section className="py-12 bg-gray-100">
        <Toaster></Toaster>
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isLogin ? "Connexion" : "Inscription"}
            </h2>

            {/* Bascule entre le formulaire de connexion et d'inscription */}
            <div className="text-center mb-6">
              <p className="text-gray-600">
                {isLogin ? "Vous n'avez pas de compte?" : "Vous avez déjà un compte?"}
                <button
                  onClick={toggleForm}
                  className="text-blue-600 font-bold ml-2"
                >
                  {isLogin ? "Inscrivez-vous" : "Connectez-vous"}
                </button>
              </p>
            </div>

            {/* Formulaire de connexion */}
            {isLogin && (
              <form onSubmit={handleLogin}>
                {/* Champ de saisie pour l'email */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
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

                {/* Champ de saisie pour le mot de passe */}
                <div className="mb-4 relative">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Mot de passe
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-10 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Sélection du rôle */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                    Rôle
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  >
                    <option value="player">Joueur</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Bouton de soumission */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
                  >
                    Connexion
                  </button>
                </div>
              </form>
            )}

            {/* Formulaire d'inscription */}
            {!isLogin && (
              <form onSubmit={handleSignup}>
                {/* Champ de saisie pour le nom d'utilisateur */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>

                {/* Champ de saisie pour l'email */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
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

                {/* Champ de saisie pour le mot de passe */}
                <div className="mb-4 relative">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Mot de passe
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-10 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Champ de saisie pour le prénom */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>

                {/* Champ de saisie pour le nom de famille */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Nom de famille
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    name="lastName"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>

                {/* Bouton de soumission */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
                  >
                    Inscription
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AuthPage;
