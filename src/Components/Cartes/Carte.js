import React from 'react'

const Carte = ({title, image}) => {
  return (
    <div className='w-[300px] h-[400px] flex flex-col justify-around items-center rounded-xl bg-cyan-700  mx-10 my-4 overflow-hidden relative'>
      <img className='absolute w-full h-full z-0 ' src={`${image}`} alt={title} />
      <h1 className='text-2xl font-semibold text-center text-white z-50'>{title}</h1>
      <button className='text-white bg-black rounded-xl text-center px-6 py-4 font-bold mt-6 z-50'>Détails</button>

    </div>
  )
}

export default Carte