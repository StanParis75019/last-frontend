import React, { useState } from 'react';
import Navbar from '../../Components/newNav';
import Footer from '../../Components/Footer/Footer';

// Tableau des questions du quiz avec les réponses correctes
const fakeQuizzes = [
  { id: 1, question: "Est-ce que la Terre est plate?", correctAnswer: "false" },
  { id: 2, question: "Est-ce que le ciel est bleu?", correctAnswer: "true" },
  { id: 3, question: "Est-ce que les chats aboient?", correctAnswer: "false" },
  { id: 4, question: "Est-ce que 2+2=4?", correctAnswer: "true" },
  { id: 5, question: "Est-ce que l'eau bout à 100°C?", correctAnswer: "true" },
  { id: 6, question: "Est-ce que le Soleil est une planète?", correctAnswer: "false" },
];

const QuizPage = () => {
  // Gère le score de l'utilisateur
  const [score, setScore] = useState(0);
  // Message affiché après la soumission d'une réponse
  const [message, setMessage] = useState('');
  // Simule l'état de connexion de l'utilisateur (ici, non connecté)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Garde en mémoire les réponses de l'utilisateur pour chaque question du quiz
  const [quizResults, setQuizResults] = useState({});

  // Fonction pour gérer le clic sur les boutons "Vrai" ou "Faux"
  const handleAnswerClick = (quizId, selectedAnswer) => {
    const selectedQuiz = fakeQuizzes.find((quiz) => quiz.id === quizId);
    if (!selectedQuiz) return; // Sort si le quiz n'existe pas

    // Vérifie si la réponse sélectionnée est correcte
    if (selectedQuiz.correctAnswer === selectedAnswer) {
      setMessage("Bonne réponse!"); // Affiche un message de réussite
      setScore((prevScore) => prevScore + 10); // Augmente le score de 10 points pour chaque bonne réponse
    } else {
      setMessage("Mauvaise réponse!"); // Affiche un message d'erreur
    }

    // Marque le quiz comme répondu
    setQuizResults((prevResults) => ({
      ...prevResults,
      [quizId]: selectedAnswer,
    }));
  };

  return (
    <div className="QuizPage bg-gray-100 min-h-screen">
      <Navbar /> {/* Composant de la barre de navigation */}

      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Apperçu des Quiz</h1>
        <p className='text-center my-2 font-bold text-2xl '>Authentifiez-vous pour accéder à tous nos quiz</p>

        {/* Affichage du score */}
        <div className="text-center mb-6">
          <h2 className="text-2xl">Score: {score}</h2>
        </div>

        {/* Affiche chaque question du quiz */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fakeQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">{quiz.question}</h3>

              {/* Boutons "Vrai" et "Faux" */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleAnswerClick(quiz.id, "true")}
                  className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${
                    quizResults[quiz.id] ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={quizResults[quiz.id]} // Désactive les boutons une fois la question répondue
                >
                  Vrai
                </button>
                <button
                  onClick={() => handleAnswerClick(quiz.id, "false")}
                  className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition ${
                    quizResults[quiz.id] ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={quizResults[quiz.id]} // Désactive les boutons une fois la question répondue
                >
                  Faux
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message affiché après la soumission d'une réponse */}
        {message && (
          <div className="mt-8 text-center">
            <p className="text-xl font-semibold">{message}</p>
          </div>
        )}
      </div>

      <Footer /> {/* Composant du pied de page */}
    </div>
  );
};

export default QuizPage;
