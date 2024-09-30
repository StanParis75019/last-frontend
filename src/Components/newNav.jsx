import { Label } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const Navbar = () => {
  const handleLogout = () =>{
    localStorage.removeItem('user');
    window.location.href = '/';
    window.location.reload();
  }
  // État local pour gérer l'ouverture/fermeture du menu mobile
  const [navOpen, setNavOpen] = useState(false);
  const [userName, setuserName] = useState(null);
  const [selectLink, setSelectLink] = useState('')
  const handleSelectChange=(e) =>{
    setSelectLink(e.target.value)
    if(e.target.value==='logout'){
      handleLogout()
    }
  }

  const handlelogincheck = () =>{
    
  }
useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  if(user){
    setuserName(user);
  }
}, [])
  return (
    <nav className="z-50 relative bg-gray-800 text-white fixed w-full z-10 top-0 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo du site */}
       
        <Link className='cursor-pointer' to={'/'}>
        <h1 className="text-2xl font-bold">QuizStan</h1>
        
        </Link>


        {/* Liens de navigation pour les écrans de bureau */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">Accueil</Link>
          <Link to="/about" className="hover:text-gray-300">À propos</Link>
          <Link to="/categories" className="hover:text-gray-300">Catégories</Link>
          <Link to="/quiz" className="hover:text-gray-300">Exemples Quiz</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          {userName?(
            <>
            
            <select value={selectLink} onChange={handleSelectChange} className='bg-black text-white rounded-xl font-bold px-4 py-2 outline-none' id='linkselect' >
                <option key={1} value={'logout'}>{`Bonjour ${userName?.username}`}</option>
                <option key={2} value={'dashboard'}>Dashboard</option>
                <option key={3} value={'logout'}>
                Deconnexion

                </option>
            </select>
              </>
          ):(
            <Link to="/auth" className="hover:text-gray-300">Authentification</Link>
          )}
        </div>

        {/* Bouton du menu hamburger pour les mobiles */}
        <div className="md:hidden">
          <button onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile : s'affiche uniquement lorsque navOpen est true */}
      {navOpen && (
        <div className="md:hidden bg-gray-800 p-4 space-y-4">
          <Link to="/" className="block hover:text-gray-300">Accueil</Link>
          <Link to="/about" className="block hover:text-gray-300">À propos</Link>
          <Link to="/categories" className="block hover:text-gray-300">Catégories</Link>
          <Link to="/contact" className="block hover:text-gray-300">Contact</Link>
          <Link to="/auth" className="block hover:text-gray-300">Authentification</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
