import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../firebaseconfig';
import { Sun, MessageSquare, UserRound, Loader, Search, Moon } from 'lucide-react';
import UserProfile from './userProfile';
import { UseUserData } from '../../../Context/User/UserContext';
import { useTheme } from '../../../Context/ThemeChanger/Theme';
import RecentChats from './RecentChats';

function ChatPannel() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [seachQuery, setSeachQuery] = useState('');

  const { isDarkMode, handleThemeChange } = useTheme();
  const { userData } = UseUserData();


  let filteredUsers = users;

  if (seachQuery) {
    filteredUsers = users.filter((user) =>
      user.name.toLowerCase().startsWith(seachQuery.toLowerCase())
    );
  }

  function handleShowProfile() {
    setShowProfile(true);
    console.log('Profile button clicked');
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getDocs(collection(db, 'users'));
        const usersData = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
        console.log('Fetched users:', usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <Loader className='animate-spin text-[#04a784] h-10 w-10' />
        <p className='text-[#04a784] ml-2'>Loading...</p>
      </div>
    );
  }

  if (showProfile) {
    return <UserProfile setShowProfile={setShowProfile} />;
  }

  return (
    <div className={`flex flex-col h-full md:w-[100%] min-w-[300px] bg-white shadow-lg ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <div className='flex items-center justify-between bg-[#eff2f5] text-black p-4'>
        <button onClick={handleShowProfile}>
          <img src={userData?.photoURL} alt='Profile' className='h-10 w-10 rounded-full  object-cover' />
        </button>

        <div className='flex items-center gap-4'>
          <button onClick={handleThemeChange}>
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
          <MessageSquare />
          <UserRound />
        </div>
      </div>

      {/* Search Bar */}
      <div className='flex items-center bg-white w-full px-4 h-10 shadow-sm'>
        <input
          type='text'
          placeholder='Search...'
          onChange={(e) => setSeachQuery(e.target.value)}
          value = {seachQuery}
          className='w-full outline-none border-none'
        />
        <button>
          <Search className='text-gray-500' />
        </button>
      </div>

      {/* Recent Chats */}
      <div className='flex flex-col gap-4 p-4 overflow-y-auto'>
        {filteredUsers.map((user) => (
          <RecentChats key={user.id} userObject={user} />
        ))}
      </div>
    </div>
  );
}

export default ChatPannel;
