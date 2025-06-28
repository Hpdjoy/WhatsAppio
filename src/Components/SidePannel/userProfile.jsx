import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { UseUserData } from '../../../Context/User/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseconfig';

function UserProfile(props) {
  const setShowProfile = props.setShowProfile;

  const {userData, setUserData} = UseUserData();

  console.log("User Data in Profile:", userData);

  const handleLogout = async() => {
  await signOut(auth);
  setUserData(null);
  alert("You have been logged out successfully!");
}
  
  
  function handleShowProfile(){
      // Function to handle showing the profile 
      setShowProfile(false);
      console.log("Profile button clicked");
  }
  return (
    <> 
    <div className='flex h-[100vh] w-[40%] relative overflow-scroll'>
    <div className='flex flex-col items-center justify-start h-screen bg-[#eff2f5] text-black gap-4 w-[100%]'>
      <div className='flex items-center justify-start bg-[#04a784] w-full p-4 gap-6 text-white'>
            <button onClick={handleShowProfile}><ArrowLeft /> </button>Profile
            
      </div>

      <div className='flex items-center justify-center'>
            <img src={userData.photoURL} alt={userData.uid} className='h-30 w-30 rounded-full'/>
      </div>
      <div className='flex flex-col items-center gap-1 bg-[#fff]  w-full p-4 '>
            <div className='font-bold text-2xl'>{userData.name}</div>
            <div>{userData.email}</div>
            <div>{userData.phoneNumber}</div>
      </div>
      <div className='flex w-full gap-4 bg-[#fff] p-2 '>
            <textarea type="text" placeholder='Status'  className='border-1 rounded w-full ml-10 mr-10' />
            <button className='bg-[#04a784] px-3 py-1 rounded text-white'>Save</button>
      </div>

      <div>
            <button onClick={handleLogout}  className='bg-green-400 px-4 py-2 rounded text-white hover:bg-[#767899]'>Logout</button>
      </div>
     <div className='text-sm text-gray-500 absolute 'style={{bottom: '10px', }}> 
      <p>MADE WITH ❤️ BY HPDJOY</p>
      <span className='text-red-500'>Attaintion:</span>Your Chats are not encrypted
    </div> 

    </div>
    
      </div>
    </>
  )
}

export default UserProfile