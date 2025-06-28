import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, MessageSquareText,Phone } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseconfig'; // Make sure your db import is correct
import { PlusIcon, SendHorizontal} from 'lucide-react'; // Import PlusIcon from lucide-react
function Chat() {
  const { uniqueID } = useParams();
  const [chatUser, setChatUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState('');


  const handleSendMessage = () => {
    console.log("Message sent:", msg);
    setMsg(''); 
    }

  useEffect(() => {
    const getUser = async () => {
      if (!uniqueID) return;

      try {
        const docRef = doc(db, 'users', uniqueID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = {
            name: docSnap.data().name,
            email: docSnap.data().email,
            photoURL: docSnap.data().photoURL,
            uid: docSnap.data().uid
          };
          setChatUser(userData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [uniqueID]);
;

  // Case 1: No chat selected
  if (!uniqueID) {
    return (
      <>
      <div className='flex flex-col h-screen w-full justify-end'>
      <div className="flex flex-col items-center justify-center h-screen w-full bg-[#eff2f5] text-gray-500">
        <MessageSquareText className="w-15 h-15 mb-4 text-gray-400" />
        <div className="text-center text-sm space-y-1">
          <p>No chat selected</p>
          <p>Select any contact</p>
          <p>to start chat with</p>
        </div>
      </div>
      </div>
      </>
    );
  }

  // Case 2: Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-[#eff2f5] text-gray-500">
        <Loader className="w-10 h-10 animate-ping text-gray-400" />
      </div>
    );
  }

  // Case 3: Chat loaded
  return (
    <div className="flex flex-col h-screen w-full bg-[#eff2f5]" key={chatUser?.uid}>
      <div className="p-4 border-b border-gray-300 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={chatUser.photoURL} alt={chatUser.uid} className='h-10 w-10 rounded-full' />
          <h1 className="text-lg font-semibold text-gray-700">{chatUser?.name}</h1>
        </div>
        <Phone />
      </div>
      <div className='flex flex-grow flex-col gap-12 p-6 bg-amber-300'>

      </div>

      <div className="flex items-center p-4 shadow-md bg-[#eff2f5]">
        <PlusIcon />
        <input type="text" 
        className='w-full rounded py-2 px-4 bg-white focus:outline-none' 
        placeholder='Type a message...'
        value={msg} 
        onChange={(e)=>{
          setMsg(e.target.value);
          console.log(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }}
          }
        />
        <button className='px-4' onClick={handleSendMessage}><SendHorizontal /></button>
        
      </div>
      {/* Chat content goes here */}
    </div>
  );
}

export default Chat;

