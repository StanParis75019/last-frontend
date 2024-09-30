import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import NavBarAdmin from '../../Components/NavBar/NavBarAdmin';
import axios from 'axios';
import { BASE_URL } from '../../Components/Constant';

const ProfilePage = () => {
  // Utilise `useState` pour stocker les informations du profil de l'utilisateur
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // États pour gérer la visibilité des mots de passe (afficher/masquer)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Charge les données de l'utilisateur à partir de `localStorage` au montage du composant
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')); // Récupère les données de l'utilisateur
    if (userData) {
      setProfile({
        id: userData.id,
        firstName: userData.firstname || '', // Stocke le prénom de l'utilisateur
        lastName: userData.lastname || '', // Stocke le nom de famille de l'utilisateur
        email: userData.email || '', // Stocke l'email de l'utilisateur
        phone: userData.telephone || '', // Stocke le numéro de téléphone de l'utilisateur
      });
    }
  }, []); // Le tableau vide signifie que l'effet s'exécute uniquement lors du montage

  // Fonction pour basculer la visibilité du champ de mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Fonction pour basculer la visibilité du champ de confirmation de mot de passe
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Gère les changements de valeur dans les champs du formulaire
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Gère la soumission du formulaire pour mettre à jour le profil
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      // Envoie une requête PUT à l'API pour mettre à jour le profil de l'utilisateur
      const response = await axios.put(BASE_URL + 'auth/updateProfile', {
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        password: profile.password
      });

      // Supposons que le backend renvoie les données utilisateur mises à jour
      const updatedUser = response.data;
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Met à jour `localStorage` avec les nouvelles données utilisateur
      alert('Profil mis à jour avec succès !'); // Alerte de succès
    } catch (error) {
      console.error('Échec de la mise à jour du profil :', error);
      alert('Échec de la mise à jour du profil. Veuillez réessayer.'); // Alerte d'échec
    }
  };

  return (
    <div className="ProfilePage bg-gray-100 min-h-screen">
      <NavBarAdmin /> {/* Barre de navigation pour l'admin */}
      <div className="ml-72 p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Mon Profil</h2>

        {/* Formulaire pour éditer les informations du profil */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          {/* Prénom */}
          <div className="mb-4">
            <TextField
              fullWidth
              label="Prénom"
              variant="outlined"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser /> {/* Icône utilisateur */}
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Nom de famille */}
          <div className="mb-4">
            <TextField
              fullWidth
              label="Nom de famille"
              variant="outlined"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser /> {/* Icône utilisateur */}
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={profile.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaEnvelope /> {/* Icône enveloppe pour l'email */}
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Bouton Enregistrer */}
          <div className="text-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className="w-full"
            >
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
