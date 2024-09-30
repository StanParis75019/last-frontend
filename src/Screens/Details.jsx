import React from 'react'
import { Link } from 'react-router-dom'
import {Fade} from 'react-awesome-reveal'
import NewNav from './../Components/newNav'
import Footer from '../Components/Footer/Footer'

const Details = () => {
  return (
    <div>
        <NewNav>
            
        </NewNav>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white '>
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <Fade cascade damping={0.2} direction="up" className='w-full flex flex-col justify-center items-center'>
            <h1 className='text-6xl font-bold'>Détails de la catégorie</h1>
            <p className='text-lg w-[70%] px-4 my-6 text-center '>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec justo nec ex ullamcorper ullamcorper. Donec vel quam vel ipsum faucibus bibendum. Sed consectetur, velit in commodo tristique, felis dolor cursus purus, non finibus sem ligula in metus.</p>
            <Link className='text-lg font-medium text-white px-4 py-2 rounded-lg hover:bg-gray-400 hover:text-white border-2 border-white py-4 px-8  '>Retour à la liste</Link>
            </Fade>
        </div>
        </section>
        <div className='py-12 my-6 w-full flex flex-col justify-center items-center'>
            <h1 className='text-3xl text-center font-semibold '>
                Commencer le quiz
            </h1>

        </div>
        <section className='w-full py-6 md:py-12 lg:py-16 xl:py-32 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white '>
        <div className='w-full h-full flex flex-col justify-start items-start'>
        <div className='w-full h-[400px] flex flex-row justify-center items-center'>
            <div className='w-[50%] h-full flex flex-col justify-center items-center '>
            <img className='w-full h-full justify-center' src='eiffel-tower-with-clouds.jpg'></img>
            </div>
            <div className='w-[50%] h-full flex flex-col justify-center items-center'>
            <h1 className='text-4xl mb-6 font-semibold text-center '>
                Est-ce que la tour Effeil fait 260 metres ?
            </h1>
            <p className='text-lg text-gray-200 text-start '>
                Répondez par Vrai ou Faux
                </p>
            </div>

        </div>
        
            <Fade cascade direction='up' className='w-full h-full flex flex-row justify-center items-center flex-nowrap my-3'>
            <div className='w-full  flex flex-row justify-center items-center '>
                    <div className='w-[48%] flex flex-col justify-center items-center border-2 border-white rounded mx-2 '>
                        <button className='px-32 py-12  text-center text-4xl hover:underline '>Vrai</button>
                    </div>
                    <div className='w-[48%]  flex flex-col justify-center items-center border-2 border-white rounded mx-2 '>
                    <button className='px-32 py-12  text-center text-4xl hover:underline '>Faux</button>
                    </div>

            

        </div>
        </Fade>
        </div>
        </section>
        <Footer>

        </Footer>
    </div>
  )
}

export default Details