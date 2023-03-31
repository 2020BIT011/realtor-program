import React from 'react';
import{useState} from "react";
import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai"
import { Link, useNavigate, useNavigation } from "react-router-dom";
import OAuth from '../components/OAuth';
// import { signInWithEmailAndPassword, getAuth ,auth} from 'firebase/auth';
import { signInWithEmailAndPassword  } from 'firebase/auth';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import { auth } from 'firebase/auth';

export default function SignIn() { 
  const[showPassword,setShowPassword]=useState(false);
  const[formData,setFormData]= useState({
    email:"",
    password:"",
  });
  const{email,password}=formData;

  const navigate=useNavigate()

  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value,
    }));
  }

async function onSubmit(e){
    e.preventDefault()
try{
  const auth = getAuth()
  const userCredential = await
  signInWithEmailAndPassword(auth,email,password)
  if(userCredential.user){
    navigate("/");
  }


}
catch(error){
  toast.error("Invalid User Credentials");

}

}


  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>

      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>

        <div className='md:w-[67%] lg:w=[50%] mb-12 md:mb-6'>

          <img className='w-full rounded-2xl' src="https://media.istockphoto.com/id/1426988809/photo/security-password-login-online-concept-hands-typing-and-entering-username-and-password-of.jpg?b=1&s=170667a&w=0&k=20&c=AJD5Wv30lmyILccJyMpQGhkmh0VhZ5WNDtk53MO1OVM=" alt="sign-in" />
        
        </div>
      <form onSubmit={onSubmit}  className='w-full md:w-[67%] lg:w-[40%] lg:ml:20'>
        <input className='w-full' 
        type="email"
         id='email'
          value={email}
          onChange={onChange}
          placeholder='Enter Email......' 
          className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded  transition ease-in-out'   />
          
      <div className='relative mb-6'>
      <input className='w-full' 
        type={showPassword ? "text":"password"}
         id='password'
          value={password}
          onChange={onChange}
          placeholder='Enter Password....' 
          className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded  transition ease-in-out'   />
          {showPassword ? (
            <AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>
          ):(
            
            <AiFillEye  className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>
          )}
      </div>

      <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
        
        <p className='mb-6'>Don't have account?
          <Link to="/sign-up" className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out mb-1'>Register
          </Link>
        </p>
        <p>
          <Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out '>Forgot Password?</Link>
        </p>
      </div>
          
      <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium upper
       rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' type='submit'>Sign in</button>
      
      <div className=' flex items-center my-4  before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1  after:border-gray-300'>
        <p className='text-center font-semibold mx-4 '>OR</p>
      </div>

           <OAuth />

        </form>    

            

      </div>
   
   
   </section>
  
  )
}
