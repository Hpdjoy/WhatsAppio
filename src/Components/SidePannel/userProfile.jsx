import React from 'react'
import { ArrowLeft } from 'lucide-react';
import { UseUserData } from '../../../Context/User/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseconfig';

function UserProfile(props) {
  const setShowProfile = props.setShowProfile;

  const {userData, setUserData} = UseUserData();

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
    <div className='flex h-screen bg-[#eff2f5] w-[30%] '>
    <div className='flex flex-col items-center justify-start h-screen bg-[#eff2f5] text-black gap-4 w-[100%]'>
      <div className='flex items-center justify-start bg-[#04a784] w-full p-4 gap-6 text-white'>
            <button onClick={handleShowProfile}><ArrowLeft /> </button>Profile
            
      </div>

      <div className='flex items-center justify-center'>
            <img src={userData.photoURL} alt={userData.uid} className='h-30 w-30 rounded-full'/>
      </div>
      <div className='flex flex-col justify-start gap-2 bg-[#eff2f5] p-4 '>
            <div>{userData.displayName}</div>
            <div>{userData.email}</div>
            <div>{userData.phoneNumber}</div>
      </div>
      <div className='flex  gap-4  bg-[#eff2f5]'>
            <textarea type="text" placeholder='Status'  className='border-1 rounded' />
            <button className='bg-[#04a784] px-3 py-1 rounded text-white'>Save</button>
      </div>

      <div>
            <button onClick={handleLogout}  className='bg-green-400 px-4 py-2 rounded text-white'>Logout</button>
      </div>
    </div>

      </div>
    </>
  )
}

export default UserProfile