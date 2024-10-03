import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../../Components/newNav';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { BASE_URL } from '../../Components/Constant';
import { toast, Toaster } from 'react-hot-toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    role: 'player',
  });

  const [loading, setLoading] = useState(false); // Loading state

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to validate password
  const isValidPassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return minLength && hasUppercase && hasNumber && hasSpecialChar;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner

    try {
      if (formData.role === "player") {
        const response = await axios.post(BASE_URL + 'users/login', {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
        console.log(response.data);
        toast.success('Bien authentifié')
        localStorage.setItem('user', JSON.stringify(response.data));
        window.location.href = '/DashboardUser';
      } else {
        const response = await axios.post(BASE_URL + 'auth/login', {
          email: formData.email,
          password: formData.password
        });
        toast.success('Bien authentifié');
        localStorage.setItem('user', JSON.stringify(response.data));
        window.location.href = '/Dashboard';
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error("ll y a un probleme avec l'authentification de votre compte");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner

    // Check if the password meets the criteria
    if (!isValidPassword(formData.password)) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères, un caractère majuscule, un chiffre et un caractère spécial.");
      setLoading(false); // Hide spinner if validation fails
      return;
    }

    try {
      const response = await axios.post(BASE_URL + 'users/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      
      localStorage.setItem('user', JSON.stringify(response.data));
      window.location.href = '/DashboardUser';
    } catch (error) {
      console.error('Signup failed:', error.response.data);
      toast.error("ll y a un probleme avec l'authentification de votre compte");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="AuthPage">
      <Navbar />
      <section className="py-12 bg-gray-100">
        <Toaster />
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isLogin ? "Connexion" : "Inscription"}
            </h2>

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

            {isLogin ? (
              <form onSubmit={handleLogin}>
                {/* Login Form */}
                {/* Email, password, and role fields */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
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
                <div className="mb-4">
                  <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Rôle</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="player">Joueur</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        Connexion...
                      </div>
                    ) : (
                      'Connexion'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignup}>
                {/* Signup Form */}
                {/* Username, email, password, first name, last name fields */}
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Nom d'utilisateur</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
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
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Nom de famille</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        Inscription...
                      </div>
                    ) : (
                      'Inscription'
                    )}
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
