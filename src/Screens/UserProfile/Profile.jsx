import React, { useEffect, useState } from 'react';
import { FaClipboardList, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from '../../Components/Constant';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material'; // Import CircularProgress for the spinner

const Profile = () => {
  const router = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '', // New password input
    role: '',
  });

  const [loading, setLoading] = useState(false); // Loading state to handle the spinner
  
  // Fetch user data from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setFormData({
        ...user,
        password: '', // Keep password empty initially
      });
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Password validation function
  const isValidPassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasUppercase && hasNumber && hasSpecialChar;
  };

  // Handle form submission to update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    // If the password is filled, validate it
    if (formData.password && !isValidPassword(formData.password)) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères, un caractère majuscule, un chiffre et un caractère spécial.');
      setLoading(false); // Set loading to false if validation fails
      return;
    }

    try {
      const updateData = {
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
      };

      // Include the password if the user provided a new one
      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await axios.patch(`${BASE_URL}users/update/${formData.id}`, updateData);

      // Update the localStorage with the new data
      localStorage.setItem('user', JSON.stringify(response.data));

      toast.success('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error("Une erreur s'est produite lors de la mise à jour du profil");
    } finally {
      setLoading(false); // Set loading to false after completion
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
    if (!confirmed) return;

    setLoading(true);
    
    try {
      await axios.delete(`${BASE_URL}users/${formData.id}`);
      toast.success('Compte supprimé avec succès');
      localStorage.removeItem('user');
      router('/auth'); // Redirect to auth page after account deletion
    } catch (error) {
      console.error('Account deletion failed:', error);
      toast.error("Une erreur s'est produite lors de la suppression du compte");
    } finally {
      setLoading(false);
    }
  };

  const handlelogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="QuizListingPage bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white h-screen p-6 fixed">
        <h2 className="text-2xl font-bold mb-6">Tableau de bord utilisateur</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <a href="/" className="flex items-center space-x-2 hover:text-gray-300">
                <FaUserCircle />
                <span>Home page</span>
              </a>
            </li>
            <li>
              <a href="/DashboardUser" className="flex items-center space-x-2 hover:text-gray-300">
                <FaUserCircle />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/UsersQuiz?query=" className="flex items-center space-x-2 hover:text-gray-300">
                <FaClipboardList />
                <span>Quiz</span>
              </a>
            </li>
            <li>
              <a href="/userProfile" className="flex items-center space-x-2 hover:text-gray-300">
                <FaClipboardList />
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a onClick={handlelogout} className="flex cursor-pointer items-center space-x-2 hover:text-gray-300">
                <FaSignOutAlt />
                <span>Déconnexion</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="container mx-auto py-12 px-4">
        <Toaster />
        <h2 className="text-3xl font-bold mb-6 text-center">Gérer le Profil Utilisateur</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
          {/* Username */}
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
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Email */}
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
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* First Name */}
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
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Nom de famille
            </label>
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

          {/* Role (Display Only, Can't Change) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Rôle
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200"
              readOnly
            />
          </div>

          {/* Password (Optional) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Nouveau mot de passe (laisser vide si inchangé)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Laissez vide pour ne pas changer"
            />
          </div>

          {/* Submit Button with Spinner */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: 'white' }} /> // Show spinner when loading
              ) : (
                'Mettre à jour le profil'
              )}
            </button>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 mx-4 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition ease-in-out duration-300"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <CircularProgress size={24} style={{ color: 'white' }} /> // Show spinner when loading
            ) : (
              'Supprimer mon compte'
            )}
          </button>
          </div>
        </form>

        {/* Delete Account Button */}
        <div className="text-center mt-8">
        </div>
      </div>
    </div>
  );
};

export default Profile;
