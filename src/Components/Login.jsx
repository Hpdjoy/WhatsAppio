import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseconfig';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { Fingerprint,LogOut } from 'lucide-react';

import { useTheme } from '../../Context/ThemeChanger/Theme';
import { setDoc, doc} from 'firebase/firestore';
import { db } from '../../firebaseconfig';
import { UseUserData } from '../../Context/User/UserContext';



async function CreateUser(authData) {
  const user = authData.user;
  const userData = {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid
  };

  await setDoc(doc(db, 'users', user.uid), userData);
  console.log("Creating user data:", userData);

  localStorage.setItem('user', JSON.stringify(userData));
  console.log("User created successfully:", userData);
}


function Login() {

  
  const {userData, setUserData} = UseUserData();
  const navigate = useNavigate();
  if(userData!= null){
    navigate('/');
    return <></>
  }
  const { isDarkMode, handleThemeChange } = useTheme();

  const handleSignIn = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider);
    await CreateUser(result);
    setUserData(result.user);
    console.log(result);
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
