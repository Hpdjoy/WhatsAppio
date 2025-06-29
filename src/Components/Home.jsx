import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, Storage } from '../../firebaseconfig';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import ChatPannel from './SidePannel/ChatPannel';
import Chat from './Chat';
import { UseUserData } from '../../Context/User/UserContext';
import { useParams } from 'react-router-dom';

function Home() {
  const { setUserData } = UseUserData();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { uniqueID } = useParams(); // Assume chat/:uniqueID is the route to open chat

  const handleChangeImage = (e) => {
    const image = e.target.files[0];
    const StorageRef = ref(Storage, `/images${image.name}`);
    const uploadTask = uploadBytesResumable(StorageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log('File available at', url);
        });
      }
    );
  };

  // Watch screen size changes
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <main className='w-full h-screen bg-[#e3e1db]'>
      <div className='flex h-full w-full bg-[#eff2f5] shadow-md'>

        {/* Chat Panel */}
        {(!isMobile || (isMobile && !uniqueID)) && (
          <div className='w-full md:w-[30%]'>
            <ChatPannel />
          </div>
        )}

        {/* Chat Window */}
        {(!isMobile || (isMobile && uniqueID)) && (
          <div className='w-full md:w-[70%]'>
            <Chat />
          </div>
        )}

      </div>
    </main>
  );
}

export default Home;
