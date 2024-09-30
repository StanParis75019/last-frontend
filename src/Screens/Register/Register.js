import { RiLockPasswordLine } from "react-icons/ri"
import Navbar from "../../Components/NavBar/Navbar"
import {toast, Toaster} from "react-hot-toast"
import NewNav from "../../Components/newNav"
import { useState } from "react"
import axios from "axios"
import {BeatLoader, DotLoader} from 'react-spinners'
import { RotateSpinner } from "react-spinners-kit"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userName, setuserName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isloading, setLoading] = useState(false)
  const handleSubmit = async () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const {data} = await axios.post("http://localhost:3001/user/register", {
          email,
          password,
          username: userName,
          firstName,
          lastName,
          
        })
        toast.success('Inscription réussie!',{
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#34D36F',
            color: 'white',
          },
        });
        setLoading(false)

        setEmail("")
        setPassword("")
        setuserName("")
        setFirstName("")
        setLastName("")
  
      } catch (error) {
        toast.error("Inscription echouée")
          }
    }, 3000);
   
    
  }
  return (
    <>
    <NewNav />
    <Toaster></Toaster>
    <div className="w-full h-[60rem] mx-auto flex flex-col justify-center items-center ">
      
      <div className="w-[500px] min-h-[500px] rounded-xl shadow shadow-gray-500 p-4 ">
      <h1 className="text-3xl font-semibold my-2  text-center">Créer un compte</h1>
      <div className=" w-full flex flex-col justify-start items-center">
      <div className='w-full flex flex-col justify-start items-start ml-4 mt-4  '>
            <div className='w-full flex flex-row justify-start items-center'>
              <RiLockPasswordLine className='text-lg text-blue-500 mr-2'/>
            <label className='text-lg text-start font-semibold '>email</label>
            </div>
            
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Entrez votre email' className='w-[95%] h-[50px] border-2 border-gray-300 rounded-lg px-2 text-start my-2 ' >
          </input>
          </div>
          <div className='w-full flex flex-col justify-start items-start ml-4 mt-4  '>
            <div className='w-full flex flex-row justify-start items-center'>
              <RiLockPasswordLine className='text-lg text-blue-500 mr-2'/>
            <label className='text-lg text-start font-semibold '>password</label>
            </div>
            
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Entrez votre mot de passe' className='w-[95%] h-[50px] border-2 border-gray-300 rounded-lg px-2 text-start my-2 ' >
          </input>
          </div>
          <div className='w-full flex flex-col justify-start items-start ml-4 mt-4  '>
            <div className='w-full flex flex-row justify-start items-center'>
              <RiLockPasswordLine className='text-lg text-blue-500 mr-2'/>
            <label className='text-lg text-start font-semibold '>userName</label>
            </div>
            
              <input type='text' value={userName} onChange={(e) => setuserName(e.target.value)} placeholder="Entrez votre nom d'utilisateur" className='w-[95%] h-[50px] border-2 border-gray-300 rounded-lg px-2 text-start my-2 ' >
          </input>
          </div>
          <div className='w-full flex flex-col justify-start items-start ml-4 mt-4  '>
            <div className='w-full flex flex-row justify-start items-center'>
              <RiLockPasswordLine className='text-lg text-blue-500 mr-2'/>
            <label className='text-lg text-start font-semibold '>firstName</label>
            </div>
            
              <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Entrez votre prenom' className='w-[95%] h-[50px] border-2 border-gray-300 rounded-lg px-2 text-start my-2 ' >
          </input>
          </div>
          <div className='w-full flex flex-col justify-start items-start ml-4 mt-4  '>
            <div className='w-full flex flex-row justify-start items-center'>
              <RiLockPasswordLine className='text-lg text-blue-500 mr-2'/>
            <label className='text-lg text-start font-semibold '>lastNamet</label>
            </div>
            
              <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Entrez votre prenom' className='w-[95%] h-[50px] border-2 border-gray-300 rounded-lg px-2 text-start my-2 ' >
          </input>
          </div>
          <div className='w-full flex justify-center items-center mt-4'>
            <button onClick={handleSubmit} className='text-white w-[95%]  bg-black rounded-lg px-5 py-2 mb-4 text-center flex flex-row justify-center items-center '>{isloading ? (<RotateSpinner size={20} color="#fff"></RotateSpinner>):"S'inscrire"} </button>
          </div>
      </div>
      </div>
      
    </div>
    </>
    
  )
}

export default Register