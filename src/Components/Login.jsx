import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseconfig';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { Fingerprint,LogOut } from 'lucide-react';

import { useTheme } from '../../Context/ThemeChanger/Theme';




function Login({ setLogin }) {
  const navigate = useNavigate();
  const { isDarkMode, handleThemeChange } = useTheme();

  const handleSignIn = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider);
    console.log(result);
    setLogin(true);
    navigate('/');
  };

  return (
    <>
      <div className='h-52 bg-[#04a784]'>
        <div className='flex ml-[20px] pt-[80px] items-center gap-4'>
          <img src="https://whatsapp-clone-826a9.web.app/whatsapp.svg" alt="" className='h-8' />
          <div className='text-white uppercase font-semibold'> Whatsapp</div>
        </div>
      </div>

      <div className='bg-[#eff2f5] h-[calc(100vh-220px)] flex items-center justify-center relative'>
        <div className='h-[80%] w-[50%] bg-white shadow-lg rounded-lg flex flex-col gap-4 items-center justify-center absolute top-[-70px]'>
           <Fingerprint className='text-[#04a784] h-20 w-20 stroke-1' />
          <div className='text-2xl font-sans font-bold'>Sign In</div>
          <div className='text-sm text-gray-400'>Sign in with your google account to get Started</div>
          <div onClick={handleSignIn} className='bg-[#04a784]  text-white py-2 px-4 rounded-sm flex gap-4 active:bg-[#04a7848f]'>Sign In with google <LogOut /></div>

        </div>

      </div>
    </>

  )
}

export default Login
