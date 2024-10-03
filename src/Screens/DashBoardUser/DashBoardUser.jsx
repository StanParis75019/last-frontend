import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaListAlt, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Components/Constant';

const UserDashboardPage = () => {
  const router = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/auth';
  };

  // State to keep track of the user's score and other data
  const [score, setScore] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch user data from the backend and update localStorage
  const fetchUserData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        handleLogout();
        return;
      }
      const response = await axios.get(`${BASE_URL}users/${storedUser.id}`, {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      });
      const updatedUser = response.data;

      // Update localStorage and state with the new user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setScore(updatedUser.score);

    } catch (error) {
      console.error('Error fetching user data:', error);
      handleLogout();
    }
  };

  // Fetch quizzes and categories data from the backend
  const fetchQuizzesAndCategories = async () => {
    try {
      const quizResponse = await axios.get(BASE_URL + 'quizzes');
      setQuizCount(quizResponse.data.length);

      const categoryResponse = await axios.get(BASE_URL + 'categories');
      setCategoryCount(categoryResponse.data.length);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching quizzes or categories:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchQuizzesAndCategories();
  }, []);

  return (
    <div className="UserDashboardPage bg-gray-100 min-h-screen flex">
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
        <h1 className="text-3xl font-bold mb-8">Bienvenue dans votre tableau de bord</h1>

        {/* Display loading spinner or statistics */}
        {loading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Score card */}
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

            {/* Quiz count card */}
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

            {/* Category count card */}
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
