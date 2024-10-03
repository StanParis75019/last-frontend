import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import NavBarAdmin from '../../Components/NavBar/NavBarAdmin';
import axios from 'axios';
import { BASE_URL } from '../../Components/Constant';
import { Toaster,toast } from 'react-hot-toast';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '', // New password input
    role: '',
  });

  // Fetch admin data from localStorage
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('user'));
    if (admin && admin.role === 'ADMIN') {
      setFormData({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        firstName: admin.firstname,
        lastName: admin.lastname,
        password: '', // Keep password empty initially
        role: admin.role,
      });
    } else {
      toast.error('No admin data found');
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

  // Handle form submission to update admin profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If the password is filled, validate it
    if (formData.password && !isValidPassword(formData.password)) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères, un caractère majuscule, un chiffre et un caractère spécial.');
      return;
    }

    try {
      const updateData = {
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        id: formData.id
      };

      // Include the password if the admin provided a new one
      if (formData.password) {
        updateData.password = formData.password;
      }

      // Make the update request to the backend
      const response = await axios.put(`${BASE_URL}auth/update/${formData.id}`, updateData);

      // Update the localStorage with the new data
      localStorage.setItem('user', JSON.stringify(response.data));

      toast.success('Profil admin mis à jour avec succès');
    } catch (error) {
      console.error('Admin profile update failed:', error);
      toast.error("Une erreur s'est produite lors de la mise à jour du profil admin");
    }
  };
  return (
    <div className="ProfilePage bg-gray-100 min-h-screen">
      <NavBarAdmin /> {/* Barre de navigation pour l'admin */}
      <div className="container mx-auto py-12 px-4">
      <Toaster />
      <h2 className="text-3xl font-bold mb-6 text-center">Gérer le Profil Admin</h2>
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

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
          >
            Mettre à jour le profil admin
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ProfilePage;
