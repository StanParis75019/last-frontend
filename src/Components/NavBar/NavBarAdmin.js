import React from 'react';
import { FaUser, FaUsersCog, FaChartLine, FaQuestionCircle, FaListAlt, FaEnvelope, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const NavBarAdmin = () => {
  const handlelogout = () =>{
    console.log("data");
    localStorage.removeItem('user');
    window.location.href = '/auth';
    // window.location.reload();
  }
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-6 fixed">
      {/* Titre de la barre de navigation */}
      <h2 className="text-2xl font-bold mb-6">QuizStan</h2>
      
      {/* Menu de navigation */}
      <nav>
        <ul className="space-y-4">
          {/* Lien pour gérer les utilisateurs */}
          <li>
            <a href="/users" className="flex items-center space-x-2 hover:text-gray-300">
              <FaUser />
              <span>Gérer les Utilisateurs</span>
            </a>
          </li>

          {/* Lien pour gérer les administrateurs */}
          <li>
            <a href="/admins" className="flex items-center space-x-2 hover:text-gray-300">
              <FaUsersCog />
              <span>Gérer les Admins</span>
            </a>
          </li>
          {/* Lien pour gerer les Newsletters**/}
          <li>
            <a href="/newsletterAdmin" className="flex items-center space-x-2 hover:text-gray-300">
              <FaUser />
              <span>Gérer les Newsletters</span>
            </a>
          </li>

          {/* Lien vers la page des statistiques */}
          <li>
            <a href="/dashboard" className="flex items-center space-x-2 hover:text-gray-300">
              <FaChartLine />
              <span>Statistiques</span>
            </a>
          </li>

          {/* Lien pour gérer les quiz */}
          <li>
            <a href="/quizManagment" className="flex items-center space-x-2 hover:text-gray-300">
              <FaQuestionCircle />
              <span>Gérer les Quizs</span>
            </a>
          </li>

          {/* Lien pour gérer les catégories */}
          <li>
            <a href="/categorieADmin" className="flex items-center space-x-2 hover:text-gray-300">
              <FaListAlt />
              <span>Catégories</span>
            </a>
          </li>

          {/* Lien pour les messages */}
          <li>
            <a href="/messageAdmin" className="flex items-center space-x-2 hover:text-gray-300">
              <FaEnvelope />
              <span>Messages</span>
            </a>
          </li>

          {/* Lien vers le profil de l'administrateur */}
          <li>
            <a href="/profile" className="flex items-center space-x-2 hover:text-gray-300">
              <FaUserCircle />
              <span>Profil</span>
            </a>
          </li>

          {/* Lien pour la déconnexion */}
          <li>
            <a onClick={handlelogout} className="flex cursor-pointer items-center space-x-2 hover:text-gray-300">
              <FaSignOutAlt />
              <span>Déconnexion</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBarAdmin;
