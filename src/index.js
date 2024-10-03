import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importation du fichier CSS global
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Screens/Login/Login';
import Register from './Screens/Register/Register';
import Details from './Screens/Details';
import About from './Components/About';
import DashBoard from './Screens/DashBoard/DashBoard';
import Contact from './Screens/Contact/contact';
import Admins from './Screens/Admins/Admins';
import Users from './Screens/Users/Users';
import Quiz from './Screens/Quiz/Quiz';
import AboutPage from './Screens/AboutPage/AboutPage';
import CategoriesPage from './Screens/Categorie';
import ProfilePage from './Screens/profile/profile';
import ManageMessagesPage from './Screens/MessageAdmin';
import ManageCategoriesPage from './Screens/CategorieAdmin/CategorieAdmin';
import QuizPage from './Screens/FakeQuiz/FakeQuiz';
import UserDashboardPage from './Screens/DashBoardUser/DashBoardUser';
import QuizListingPage from './Screens/UsersQuiz/UsersQuiz';
import NewsletterAdmin from './Screens/NewsletterAdmin/newsletterAdmin';
import Profile from './Screens/UserProfile/Profile';

// Création du router avec les différentes routes et les composants associés
const router = createBrowserRouter([
  { path: '/', element: <App></App> }, // Route principale
  { path: '/auth', element: <Login></Login> }, // Route pour la page de connexion
  { path: '/register', element: <Register></Register> }, // Route pour la page d'inscription
  // { path: '/startQuiz', element: <Details></Details> }, // Commenté: Peut être ajouté plus tard si nécessaire
  { path: '/about', element: <AboutPage></AboutPage> }, // Route pour la page À propos
  { path: '/dashboard', element: <DashBoard></DashBoard> }, // Route pour la page du tableau de bord admin
  { path: '/contact', element: <Contact></Contact> }, // Route pour la page de contact
  { path: '/messageAdmin', element: <ManageMessagesPage></ManageMessagesPage> }, // Route pour la gestion des messages
  { path: '/admins', element: <Admins></Admins> }, // Route pour la gestion des admins
  { path: '/users', element: <Users></Users> }, // Route pour la gestion des utilisateurs
  { path: '/categories', element: <CategoriesPage></CategoriesPage> }, // Route pour l'affichage des catégories
  { path: '/categorieADmin', element: <ManageCategoriesPage></ManageCategoriesPage> }, // Route pour la gestion des catégories
  { path: '/quizManagment', element: <Quiz></Quiz> }, // Route pour la gestion des quiz
  { path: '/profile', element: <ProfilePage></ProfilePage> }, // Route pour la page du profil utilisateur
  { path: "/quiz", element: <QuizPage></QuizPage> }, // Route pour la page des quiz
  { path: "/DashboardUser", element: <UserDashboardPage></UserDashboardPage> }, // Route pour le tableau de bord de l'utilisateur
  { path: "/UsersQuiz", element: <QuizListingPage></QuizListingPage> }, // Route pour l'affichage des quiz utilisateur
  { path: "/newsletterAdmin", element: <NewsletterAdmin></NewsletterAdmin> }, // Route pour l'affichage des quiz utilisateur
  { path: "/userProfile", element: <Profile></Profile> }
]);

// Création du root de l'application et rendu du composant RouterProvider pour la gestion des routes
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}> </RouterProvider>
  </React.StrictMode>
);
