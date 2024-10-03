import React, { useEffect, useState } from 'react';
import { FaClipboardList, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Components/Constant';

const QuizListingPage = () => {
  const [score, setScore] = useState(0); // State for user's score
  const [user, setUser] = useState(null); // Initialize user state
  const [quizResults, setQuizResults] = useState({});
  const [playedQuizzes, setPlayedQuizzes] = useState([]); // State to track played quizzes
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [searchTerm, setSearchTerm] = useState(query);
  const [quizzes, setQuizzes] = useState([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true); // Loading state for fetching quizzes
  const [loadingAnswer, setLoadingAnswer] = useState({}); // Loading state for each answer
  const navigate = useNavigate();

  // Fetch quizzes and user's played quizzes
  const fetchQuizzesAndPlayedQuizzes = async () => {
    try {
      setLoadingQuizzes(true); // Start loading quizzes
      if (user) {
        const quizResponse = await axios.get(BASE_URL + 'quizzes');
        setQuizzes(quizResponse.data);
      
        // Fetch user's played quizzes
        const playedResponse = await axios.get(`${BASE_URL}users/${user.id}/played-quizzes`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setPlayedQuizzes(playedResponse.data);
      }
    } catch (error) {
      console.error('Error fetching quizzes or played quizzes:', error);
    } finally {
      setLoadingQuizzes(false); // Stop loading after fetch
    }
  };

  // Get user data from localStorage and initialize score
  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem('user'));
    if (getUser) {
      setUser(getUser);
      setScore(parseInt(getUser.score)); // Initialize the score from the user in localStorage
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchQuizzesAndPlayedQuizzes();
    }
  }, [user]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  // Handle answer submission for the quiz
  const handleAnswerClick = async (quizId, selectedAnswer) => {
    const selectedQuiz = quizzes.find((quiz) => quiz.id === quizId);
    if (!selectedQuiz) return;

    // Check if the user has already played this quiz
    if (isQuizPlayed(quizId)) {
      alert("Le quiz a déjà été joué.");
      return;
    }

    // Set loading state for the current quiz answer button
    setLoadingAnswer((prevState) => ({ ...prevState, [quizId]: true }));

    // Check if the selected answer matches the correct response stored in the quiz
    const isCorrect = selectedQuiz.response.toLowerCase() === selectedAnswer.toLowerCase();

    try {
      // Send the answer to the backend and get the new score
      const response = await axios.post(
        `${BASE_URL}users/${user.id}/quizzes/${quizId}/play`,
        { response: selectedAnswer },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const {score :  newScore } = response.data;
      console.log(newScore);
      console.log("Stanhim01@gmail.com")

      // Update the local score and quiz results
      setScore(newScore); // Update score in the state to reflect in the UI
      setQuizResults((prevResults) => ({
        ...prevResults,
        [quizId]: {
          answered: true,
          correct: isCorrect,
        },
      }));

      // Update the user in localStorage with the new score
      const updatedUser = { ...user, score: newScore };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser); // Update user state to trigger UI changes
    } catch (error) {
      console.error('Error playing quiz:', error);
      alert('Erreur lors de la soumission du quiz');
    } finally {
      setLoadingAnswer((prevState) => ({ ...prevState, [quizId]: false })); // Stop loading for this quiz answer
    }
  };

  // Check if a quiz has already been played by the user
  const isQuizPlayed = (quizId) => {
    return playedQuizzes.some((quiz) => quiz.id === quizId);
  };

  // Filter quizzes based on the search term
  const filteredQuizzes = quizzes?.filter((quiz) =>
    quiz.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="QuizListingPage bg-gray-100 min-h-screen flex">
      {/* Sidebar navigation */}
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
              <a onClick={handleLogout} className="flex cursor-pointer items-center space-x-2 hover:text-gray-300">
                <FaSignOutAlt />
                <span>Déconnexion</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-72 p-8 w-full">
        <h1 className="text-3xl font-bold mb-8">Liste des Quiz</h1>

        {/* Search bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Rechercher par catégorie"
            className="w-full p-3 rounded-lg border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term as the user types
          />
        </div>

        {/* Display user's score */}
        <div className="mb-8">
          <Typography variant="h5">Score: {score}</Typography>
        </div>

        {/* Display filtered quizzes */}
        {loadingQuizzes ? (
          <div className="flex justify-center items-center">
            <CircularProgress /> {/* Spinner while fetching quizzes */}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz) => (
                <Card
                  key={quiz.id}
                  className={`shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 ${
                    isQuizPlayed(quiz.id) ? 'bg-gray-300 cursor-not-allowed' : ''
                  }`}
                >
                  <CardContent>
                    <Typography variant="h5" component="h2" className="mb-4">
                      {quiz.question}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className="mb-4">
                      Catégorie: {quiz.category}
                    </Typography>

                    {/* True/False buttons with spinners */}
                    <div className="flex justify-center space-x-4">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAnswerClick(quiz.id, 'true')}
                        disabled={isQuizPlayed(quiz.id) || loadingAnswer[quiz.id]} // Disable button if quiz already played or loading
                      >
                        {loadingAnswer[quiz.id] ? (
                          <CircularProgress size={24} style={{ color: 'white' }} /> // Spinner in button
                        ) : (
                          'Vrai'
                        )}
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleAnswerClick(quiz.id, 'false')}
                        disabled={isQuizPlayed(quiz.id) || loadingAnswer[quiz.id]} // Disable button if quiz already played or loading
                      >
                        {loadingAnswer[quiz.id] ? (
                          <CircularProgress size={24} style={{ color: 'white' }} /> // Spinner in button
                        ) : (
                          'Faux'
                        )}
                      </Button>
                    </div>

                    {/* Display feedback */}
                    {quizResults[quiz.id]?.answered && (
                      <Typography variant="body1" className="mt-4">
                        {quizResults[quiz.id].correct
                          ? 'Bonne réponse!'
                          : 'Mauvaise réponse!'}
                      </Typography>
                    )}

                    {/* Show that the quiz has already been played */}
                    {isQuizPlayed(quiz.id) && (
                      <Typography variant="body1" className="mt-4 text-red-500">
                        Ce quiz a déjà été joué.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1">Aucun quiz trouvé pour cette catégorie.</Typography>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizListingPage;
