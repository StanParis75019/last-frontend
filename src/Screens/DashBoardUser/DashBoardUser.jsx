import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaListAlt, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserDashboardPage = () => {
  const router = useNavigate()
  const handlelogout = () =>{
    localStorage.removeItem("user");
    router("/auth")
  }
  // Garde une trace du score de l'utilisateur (sera récupéré plus tard du backend)
  const [score, setScore] = useState(0); 
  // Garde une trace du nombre de quiz (sera récupéré plus tard du backend)
  const [quizCount, setQuizCount] = useState(0);
  // Garde une trace du nombre de catégories (sera récupéré plus tard du backend)
  const [categoryCount, setCategoryCount] = useState(0);
  // Gère l'état de chargement lors de la récupération des données
  const [loading, setLoading] = useState(true);

  // Simule la récupération des données du backend
  useEffect(() => {
    // Simule le chargement des données pour le score, le nombre de quiz, et le nombre de catégories
    setTimeout(() => {
      setScore(120); // Faux score
      setQuizCount(15); // Faux nombre de quiz
      setCategoryCount(5); // Faux nombre de catégories
      setLoading(false); // Arrête l'état de chargement après 2 secondes
    }, 2000);
  }, []);

  return (
    <div className="UserDashboardPage bg-gray-100 min-h-screen flex">
      {/* Barre de navigation latérale */}
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
              <a href="/UsersQuiz" className="flex items-center space-x-2 hover:text-gray-300">
                <FaClipboardList />
                <span>Quiz</span>
              </a>
            </li>
            <li>
              <a onClick={handlelogout} className="flex items-center space-x-2 hover:text-gray-300">
                <FaSignOutAlt />
                <span>Déconnexion</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenu principal du tableau de bord */}
      <main className="ml-72 p-8 w-full">
        <h1 className="text-3xl font-bold mb-8">Bienvenue dans votre tableau de bord</h1>

        {/* Affichage des cartes de statistiques */}
        {loading ? (
          // Affiche une animation de chargement si les données sont en cours de récupération
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          // Affiche les cartes une fois que les données sont récupérées
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Carte du score */}
            <Card className="shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <CardContent>
                <Typography variant="h5" component="h2" className="mb-4">
                  Score
                </Typography>
                <div className="flex justify-between items-center">
                  <FaUserCircle className="text-4xl text-blue-500" />
                  <Typography variant="h3" className="font-bold">
                    {score}
                  </Typography>
                </div>
              </CardContent>
            </Card>

            {/* Carte du nombre de quiz */}
            <Card className="shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <CardContent>
                <Typography variant="h5" component="h2" className="mb-4">
                  Nombre de Quiz
                </Typography>
                <div className="flex justify-between items-center">
                  <FaClipboardList className="text-4xl text-green-500" />
                  <Typography variant="h3" className="font-bold">
                    {quizCount}
                  </Typography>
                </div>
              </CardContent>
            </Card>

            {/* Carte du nombre de catégories */}
            <Card className="shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <CardContent>
                <Typography variant="h5" component="h2" className="mb-4">
                  Nombre de Catégories
                </Typography>
                <div className="flex justify-between items-center">
                  <FaListAlt className="text-4xl text-purple-500" />
                  <Typography variant="h3" className="font-bold">
                    {categoryCount}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboardPage;
