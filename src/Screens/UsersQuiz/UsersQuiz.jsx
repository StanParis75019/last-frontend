import React, { useEffect, useState } from 'react';
import { FaClipboardList, FaListAlt, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

// Données fictives pour les quiz
const fakeQuizzes = [
  { id: 1, question: "Est-ce que la Terre est plate?", correctAnswer: "false", category: "Science" },
  { id: 2, question: "Est-ce que 2+2 égale à 4?", correctAnswer: "true", category: "Math" },
  { id: 3, question: "Est-ce que les chat aboient?", correctAnswer: "false", category: "Animals" },
  { id: 4, question: "Est-ce que le ciel est bleu?", correctAnswer: "true", category: "Histoire" },
  { id: 5, question: "Est-ce que l'eau boue à 100°C?", correctAnswer: "true", category: "Science" },
  { id: 6, question: "Est-ce que le Soleil est une planete?", correctAnswer: "false", category: "Astronomy" },
];

const QuizListingPage = () => {
  // État pour stocker le score de l'utilisateur
  const [score, setScore] = useState(0);
  // État pour stocker les réponses aux quiz et les feedbacks
  const [quizResults, setQuizResults] = useState({});
  const [searchParams]= useSearchParams()
  const query = searchParams.get('query');
  // État pour stocker le terme de recherche saisi par l'utilisateur
  const [searchTerm, setSearchTerm] = useState(query);


  // Gère les clics sur les boutons Vrai/Faux
  const handleAnswerClick = (quizId, selectedAnswer) => {
    const selectedQuiz = fakeQuizzes.find((quiz) => quiz.id === quizId);
    if (!selectedQuiz) return;

    // Vérifie si la réponse sélectionnée est correcte
    const isCorrect = selectedQuiz.correctAnswer === selectedAnswer;
    
    if (isCorrect) {
      setScore((prevScore) => prevScore + 10); // Augmente le score de 10 pour chaque bonne réponse
    }

    // Met à jour quizResults pour afficher le feedback et désactiver les boutons pour les quiz déjà répondus
    setQuizResults((prevResults) => ({
      ...prevResults,
      [quizId]: {
        answered: true,
        correct: isCorrect,
      },
    }));
  };

  // Filtre les quiz en fonction du terme de recherche
  const filteredQuizzes = fakeQuizzes.filter((quiz) =>
    quiz.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  
  

  return (
    <div className="QuizListingPage bg-gray-100 min-h-screen flex">
      {/* Barre de navigation latérale */}
      <aside className="w-64 bg-gray-900 text-white h-screen p-6 fixed">
        <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
        <nav>
          <ul className="space-y-4">
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
              <a href="#" className="flex items-center space-x-2 hover:text-gray-300">
                <FaSignOutAlt />
                <span>Déconnexion</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="ml-72 p-8 w-full">
        <h1 className="text-3xl font-bold mb-8">Liste des Quiz</h1>

        {/* Champ de recherche */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Rechercher par catégorie"
            className="w-full p-3 rounded-lg border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Met à jour le terme de recherche à chaque saisie de l'utilisateur
          />
        </div>

        {/* Affichage du score */}
        <div className="mb-8">
          <Typography variant="h5">Score: {score}</Typography>
        </div>

        {/* Affiche les quiz filtrés */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <Card key={quiz.id} className="shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <CardContent>
                  <Typography variant="h5" component="h2" className="mb-4">
                    {quiz.question}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="mb-4">
                    Catégorie: {quiz.category}
                  </Typography>

                  {/* Boutons Vrai/Faux */}
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAnswerClick(quiz.id, "true")}
                      disabled={quizResults[quiz.id]?.answered} // Désactive le bouton si le quiz a été répondu
                    >
                      Vrai
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleAnswerClick(quiz.id, "false")}
                      disabled={quizResults[quiz.id]?.answered} // Désactive le bouton si le quiz a été répondu
                    >
                      Faux
                    </Button>
                  </div>

                  {/* Affiche le feedback */}
                  {quizResults[quiz.id]?.answered && (
                    <Typography variant="body1" className="mt-4">
                      {quizResults[quiz.id].correct ? 'Bonne réponse!' : 'Mauvaise réponse!'}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1">Aucun quiz trouvé pour cette catégorie.</Typography>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizListingPage;
