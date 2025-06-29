import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebaseconfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Fingerprint, LogOut } from 'lucide-react';
import { useTheme } from '../../Context/ThemeChanger/Theme';
import { setDoc, doc } from 'firebase/firestore';

async function CreateUser(authData) {
  const time = new Date();

  const timestamp = time.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const user = authData.user;
  const userData = {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid,
    lastSeen: timestamp,
  };

  await setDoc(doc(db, 'users', user.uid), userData);
  localStorage.setItem('user', JSON.stringify(userData));
}

function Login() {
  const navigate = useNavigate();
  const { isDarkMode, handleThemeChange } = useTheme();

  const handleSignIn = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    await CreateUser(result);
    navigate('/');
  };

  return (
    <>
      <div className='h-52 bg-[#0993E9]'>
        <div className='flex ml-5 pt-20 items-center gap-3'>
          <img src="/icon.png" alt="App Icon" className='h-8' />
          <div className='text-white uppercase font-semibold text-lg'>Chat-Wat</div>
        </div>
      </div>

      <div className='bg-[#eff2f5] min-h-[calc(100vh-208px)] flex items-center justify-center relative px-4'>
        <div className='w-full max-w-[90%] md:w-[50%] bg-white shadow-lg rounded-lg flex flex-col gap-4 items-center justify-center py-10 px-6 absolute top-[-70px]'>
          <Fingerprint className='text-[#0993E9] h-16 w-16 stroke-1' />
          <div className='text-2xl font-bold text-center'>Sign In</div>
          <div className='text-sm text-gray-500 text-center'>
            Sign in with your Google account to get started
          </div>
          <button
            onClick={handleSignIn}
            className='bg-[#0993E9] text-white py-2 px-4 rounded-sm flex items-center gap-3 mt-2 hover:bg-[#0880cb] transition-colors'
          >
            Sign In with Google <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
