import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import { Storage } from '../../firebaseconfig';
import { uploadBytesResumable, ref } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import ChatPannel from './SidePannel/ChatPannel';
import Chat from './Chat';
import { UseUserData } from '../../Context/User/UserContext';


function Home() {

  const { setUserData } = UseUserData();

  const handleChangeImage = (e) => {
    const image = e.target.files[0];
    const StorageRef = ref(Storage, `/images${image.name}`);
    const uploadTask = uploadBytesResumable(StorageRef, image);
    uploadTask.on('state_changed', ProgressCB, errorCB, finishCB);

    function ProgressCB(snapshot) {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }

    function errorCB(error) {
      console.error('Upload failed:', error);
    }

    function finishCB() {
      console.log('Upload completed successfully!');
      getDownloadURL(uploadTask.snapshot.ref).then(function (url) {
        console.log('File available at', url);
      })
    }

  }

  return (
    <>
      <main className='w-full h-screen bg-[#e3e1db]'>
        <div className='flex h-full w-full bg-[#eff2f5] shadow-md '>
          <ChatPannel></ChatPannel>
          <Chat></Chat>
        </div>

      </main>
    </>
  )
}

export default Home
