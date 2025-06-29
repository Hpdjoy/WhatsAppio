import React from 'react'
import { ArrowLeft, Check, LogOut, LoaderIcon, Edit2Icon } from 'lucide-react';
import { UseUserData } from '../../../Context/User/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseconfig';

function UserProfile(props) {
  const { userData, setUserData, updateName, updateStatus, updatePhoto, isUploading } = UseUserData();
  const [name, setName] = React.useState(userData?.name || '');
  const [status, setStatus] = React.useState(userData?.status || '');
  const setShowProfile = props.setShowProfile;


  console.log("User Data in Profile:", userData);

  const handleLogout = async () => {
    await signOut(auth);
    setUserData(null);
    alert("You have been logged out successfully!");
  }


  function handleShowProfile() {
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

          <div className='flex flex-col items-center justify-center'>
            <label className={`relative group cursor-pointer ${isUploading ? 'pointer-events-none' : ''}`}>
              <img
                src={userData.photoURL}
                alt={userData.uid}
                className="h-32 w-32 rounded-full object-cover"
              />

              {isUploading ? (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 z-10">
                  <LoaderIcon className="w-6 h-6 text-white animate-spin z-10" />
                </div>
              ) : (
                <div className="absolute inset-0 hidden rounded-full group-hover:flex items-center justify-center bg-black/30 z-10">
                  <Edit2Icon className="w-6 h-6 text-white" />
                </div>
              )}

               <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              className='hidden'
              onChange={(e) => {
                updatePhoto(e.target.files?.[0]);
              }}
            />
            </label>
          </div>
          <div className='flex flex-col items-start justify-start bg-[#fff]  w-full py-4 px-8 '>
            <label className='text-sm text-[#10775F] mb-2'>Your Name</label>
            <div className='flex items-center justify-between w-full gap-2'>
              <input type="text"
                placeholder='Name'
                value={name}
                className='bg-transparent w-full focus:outline-none'
                onChange={(e) => setName(e.target.value)}
              />
              <button
                onClick={() => {
                  updateName(name);
                }}>
                <Check className='h-5 w-5' />
              </button>
            </div>
          </div>
          <div className='flex flex-col items-start justify-start bg-[#fff]  w-full py-4 px-8 '>
            <label className='text-sm text-[#10775F] mb-2'>Status</label>
            <div className='flex items-center justify-between w-full gap-2'>
              <input type="text"
                placeholder='Status'
                value={status}
                className='bg-transparent w-full focus:outline-none'
                onChange={(e) => setStatus(e.target.value)} />
              <button
                onClick={() => {
                  updateStatus(status);
                }}>
                <Check className='h-5 w-5' />
              </button>
            </div>
          </div>

          <div className='flex items-center justify-center bg-[#fff] w-full py-4 px-8'>
            <button onClick={handleLogout} className='flex gap-4 bg-green-400 px-4 py-2 rounded text-white hover:bg-[#767899]'>Logout <LogOut /></button>
          </div>

          <div className='text-sm text-gray-500 absolute ' style={{ bottom: '10px', }}>
            <p>MADE WITH ❤️ BY HPDJOY</p>
            <span className='text-red-500'>Attaintion:</span>Your Chats are not encrypted
          </div>

        </div>

      </div>
    </>
  )
}

export default UserProfile