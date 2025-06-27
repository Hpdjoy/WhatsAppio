import React, { useEffect } from 'react'
import { useState } from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../firebaseconfig';
import { Sun, MessageSquare, UserRound, Loader, Search, Moon } from 'lucide-react';
import UserProfile from './userProfile';
import { UseUserData } from '../../../Context/User/UserContext';
import { useTheme } from '../../../Context/ThemeChanger/Theme';
import RecentChats from './RecentChats';


function ChatPannel() {
      const [isloading, setIsLoading] = useState(true);
      const [users, setUsers] = useState([]);
      const [showProfile, setShowProfile] = useState(false);
      
      const {isDarkMode, handleThemeChange} = useTheme();
      const { userData } = UseUserData();

      function handleShowProfile() {
            // Function to handle showing the profile 
            setShowProfile(true);
            console.log("Profile button clicked");

      }
      

      useEffect(() => {
            const fetchUsers = async () => {
                  const response = await getDocs(collection(db, 'users'));
                  const usersData = response.docs.map((doc) => doc.data());
                  setUsers(usersData);
                  console.log("Fetched users:", usersData);  // immediate log
                  console.log("Number of users:", response.docs.length);  // correct
                  setIsLoading(false);
            };
            fetchUsers();
      }, []);




      if (isloading) {
            return (
                  <div className='flex items-center justify-center h-screen'>
                        <Loader className='animate-spin text-[#04a784] h-10 w-10' />
                        <p className='text-[#04a784]'>Loading...</p>
                  </div>
            )
      }
      if (showProfile == true) {
            return (
                  <UserProfile setShowProfile={setShowProfile} />
            )
      }
      return (
            <> 
            <div className={`flex flex-col h-screen w-[30%] bg-white shadow-lg ${isDarkMode ? 'dark' : ''}`}>
                  <div className='flex items-center justify-between  bg-[#eff2f5] text-black p-4'>
                        <button onClick={handleShowProfile}> <img src={userData.photoURL} alt="Hello" className='h-10 w-10 rounded-full' /></button>

                        <div className='flex items-center gap-4 justify-between '>
                             <button onClick={handleThemeChange}> {isDarkMode?<Sun />:<Moon />}</button>
                              <MessageSquare />
                              <UserRound />

                        </div>
                  </div>
                  <div className="flex items-center bg-white w-full px-4 h-10 rounded-md shadow-sm">
                        <input
                              type="text"
                              placeholder="Search..."
                              className="w-full outline-none border-none focus:outline-none focus:border-none"
                        />
                        <button>
                              <Search className="text-gray-500" />
                        </button>
                  </div>
                  <div className='flex flex-col gap-4 p-4'>
                        {users.map((user) => (
                            <RecentChats userObject = {user} />
                        ))}
                  </div>
            </div>
            </>

      );



}

export default ChatPannel
