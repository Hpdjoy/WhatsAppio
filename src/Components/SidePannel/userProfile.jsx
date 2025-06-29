import React from 'react'
import { ArrowLeft, Check, LogOut, LoaderIcon, Edit2Icon } from 'lucide-react';
import { UseUserData } from '../../../Context/User/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseconfig';

function UserProfile({ setShowProfile }) {
  const { userData, setUserData, updateName, updateStatus, updatePhoto, isUploading } = UseUserData();
  const [name, setName] = React.useState(userData?.name || '');
  const [status, setStatus] = React.useState(userData?.status || '');

  const handleLogout = async () => {
    await signOut(auth);
    setUserData(null);
    alert("You have been logged out successfully!");
  };

  function handleShowProfile() {
    setShowProfile(false);
  }

  return (
    <div className='flex flex-col h-screen w-full md:w-[100%] relative'>
      {/* Header */}
      <div className='flex items-center bg-[#0993E9] w-full p-4 gap-4 text-white'>
        <button onClick={handleShowProfile}><ArrowLeft /></button>
        <span className="text-lg font-semibold">Profile</span>
      </div>

      {/* Main content */}
      <div className='flex flex-col items-center justify-start flex-grow bg-[#eff2f5] text-black gap-4 w-full overflow-y-auto pb-20'>

        {/* Profile Image */}
        <div className='flex flex-col items-center justify-center mt-6'>
          <label className={`relative group cursor-pointer ${isUploading ? 'pointer-events-none' : ''}`}>
            <img
              src={userData.photoURL}
              alt={userData.uid}
              className="h-28 w-28 md:h-32 md:w-32 rounded-full object-cover"
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

        {/* Name Section */}
        <div className='flex flex-col items-start bg-white w-full py-4 px-6 md:px-8'>
          <label className='text-sm text-[#0993E9] mb-2'>Your Name</label>
          <div className='flex items-center w-full gap-2'>
            <input
              type="text"
              placeholder='Name'
              value={name}
              className='bg-transparent w-full focus:outline-none text-sm'
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={() => updateName(name)}>
              <Check className='h-5 w-5' />
            </button>
          </div>
        </div>

        {/* Status Section */}
        <div className='flex flex-col items-start bg-white w-full py-4 px-6 md:px-8'>
          <label className='text-sm text-[#0993E9] mb-2'>Status</label>
          <div className='flex items-center w-full gap-2'>
            <input
              type="text"
              placeholder='Status'
              value={status}
              className='bg-transparent w-full focus:outline-none text-sm'
              onChange={(e) => setStatus(e.target.value)}
            />
            <button onClick={() => updateStatus(status)}>
              <Check className='h-5 w-5' />
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className='flex items-center justify-center bg-white w-full py-4 px-6 md:px-8'>
          <button
            onClick={handleLogout}
            className='flex gap-3 items-center bg-[#0993E9] px-4 py-2 rounded text-white hover:bg-[#0880cb] transition-colors text-sm'
          >
            Logout <LogOut className='w-4 h-4' />
          </button>
        </div>

        {/* Footer Message */}
        <div className='text-xs text-gray-500 text-center absolute bottom-3 px-4 w-full'>
          <p>MADE WITH ❤️ BY HPDJOY</p>
          <p><span className='text-red-500'>Attention:</span> Your chats are not encrypted</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
