import React from 'react'
import { Fade } from 'react-awesome-reveal'

const Bond = (props) => {
  return (
    <div className='w-full h-[20rem] flex flex-col justify-center items-center bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] '>
        <Fade cascade damping={0.2} direction='up' >
        <h1 className='text-5xl text-center font-bold text-white'>{props.contenu}</h1>
        </Fade>
    </div>
  )
}

export default Bond