import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import { Storage } from '../../firebaseconfig';
import { uploadBytesResumable,ref  } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import ChatPannel from './SidePannel/ChatPannel';
import Chat from './Chat';
import { UseUserData } from '../../Context/User/UserContext';


function Home() {

const {setUserData} = UseUserData();

const handleChangeImage = (e) => {
const image = e.target.files[0];
const StorageRef = ref(Storage,`/images${image.name}`);
const uploadTask = uploadBytesResumable(StorageRef, image);
uploadTask.on('state_changed',ProgressCB, errorCB, finishCB);

function ProgressCB(snapshot) {
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done'); }

function errorCB(error) {
  console.error('Upload failed:', error);
}

function finishCB() {
  console.log('Upload completed successfully!');
  getDownloadURL(uploadTask.snapshot.ref).then(function(url){
    console.log('File available at', url);})
  } 

}

  return (
    <>
      {/* Home <br />
      <input type="file"
       accept='image/jpg, image/png, image/webp'
       onChange={handleChangeImage}/>
       */}
      <div className='flex items-center  h-screen bg-[#eff2f5]'>
        <ChatPannel></ChatPannel>
        <Chat></Chat>
     </div>


    </>
  )
}

export default Home
