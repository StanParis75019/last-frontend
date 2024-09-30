import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser, FaUsersCog, FaChartLine, FaQuestionCircle, FaListAlt, FaEnvelope, FaUserCircle, FaSignOutAlt, FaSpinner } from 'react-icons/fa';
import { BASE_URL } from '../../Components/Constant';

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [cate, setCate] = useState([]);
  const [messages, setMessages] = useState([]);
  const [quiz, setQuizs] = useState([]);

  // Fonction pour récupérer les utilisateurs
  const fetchers = async () => {
    try {
      const response = await axios.get(BASE_URL + "users/all");
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction pour récupérer les administrateurs
  const adminsfetchers = async () => {
    try {
      const response = await axios.get(BASE_URL + "auth/getalladmins");
      setAdmins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction pour récupérer les quiz
  const quizfetchers = async () => {
    try {
      const response = await axios.get(BASE_URL + "quizzes");
      setQuizs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction pour récupérer les catégories
  const categoerieFetchers = async () => {
    try {
      const response = await axios.get(BASE_URL + "categories");
      setCate(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction pour récupérer les messages
  const messagesFetchers = async () => {
    try {
      const response = await axios.get(BASE_URL + "messages");
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Effectue les appels d'API pour récupérer les données lors du chargement du composant
  useEffect(() => {
    setTimeout(() => {
      fetchers();
      adminsfetchers();
      quizfetchers();
      messagesFetchers();
      categoerieFetchers();
      setLoading(false);
    }, 2000); // Simulation d'un délai de 2 secondes pour afficher le spinner de chargement
  }, []);

  return (
    <div className="ml-72 p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Statistiques</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Carte des utilisateurs */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaUser className="text-4xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4">Utilisateurs</h3>
          {loading ? (
            <FaSpinner className="animate-spin text-3xl text-gray-400 mx-auto" />
          ) : (
            <p className="text-3xl font-bold">{users.length}</p>
          )}
        </div>

        {/* Carte des administrateurs */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaUsersCog className="text-4xl text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4">Admins</h3>
          {loading ? (
            <FaSpinner className="animate-spin text-3xl text-gray-400 mx-auto" />
          ) : (
            <p className="text-3xl font-bold">{admins.length}</p>
          )}
        </div>

        {/* Carte des quiz */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaQuestionCircle className="text-4xl text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4">Quizs</h3>
          {loading ? (
            <FaSpinner className="animate-spin text-3xl text-gray-400 mx-auto" />
          ) : (
            <p className="text-3xl font-bold">{quiz.length}</p>
          )}
        </div>

        {/* Carte des catégories */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaListAlt className="text-4xl text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4">Catégories</h3>
          {loading ? (
            <FaSpinner className="animate-spin text-3xl text-gray-400 mx-auto" />
          ) : (
            <p className="text-3xl font-bold">{cate.length}</p>
          )}
        </div>

        {/* Carte des messages */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaEnvelope className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4">Messages</h3>
          {loading ? (
            <FaSpinner className="animate-spin text-3xl text-gray-400 mx-auto" />
          ) : (
            <p className="text-3xl font-bold">{messages.length}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
