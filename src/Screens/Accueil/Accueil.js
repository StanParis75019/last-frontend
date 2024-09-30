import React from 'react'
import Navbar from '../../Components/NavBar/Navbar'
import Header from '../../Components/Header/Header'
import Newsletter from '../../Components/Newsletter/Newsletter'

import Footer from '../../Components/Footer/Footer'
import QuizType from '../../Components/QuizType/QuizType'
import NewNav from '../../Components/newNav'
import HeroSection from '../../Components/Header/Header'
import AboutSection from '../../Components/About'
import CategorySection from '../../Components/QuizType/QuizType'
import NewsletterSection from '../../Components/Newsletter/Newsletter'

const Accueil = () => {
  return (
    <div>
        {/* Navigation principale du site */}
        <NewNav></NewNav>

        {/* Section d'en-tête ou section héro */}
        <HeroSection></HeroSection>

        {/* Section À propos */}
        <AboutSection></AboutSection>

        {/* Section de catégories ou types de quiz */}
        <CategorySection></CategorySection>

        {/* Section d'inscription à la newsletter */}
        <NewsletterSection></NewsletterSection>

        {/* Pied de page */}
        <Footer></Footer>
    </div>
  )
}

export default Accueil
