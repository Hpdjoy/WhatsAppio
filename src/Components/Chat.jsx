import React, { useEffect, useState, useRef  } from 'react';
import { useParams } from 'react-router-dom';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebaseconfig';
import { Loader, MessageSquareText, Phone, PlusIcon, SendHorizontal } from 'lucide-react';
import { UseUserData } from '../../Context/User/UserContext';

function Chat() {
  const { uniqueID } = useParams();
  const [chatUser, setChatUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [msgList, setMsgList] = useState([]);

  const { userData } = UseUserData();
  const senderId = userData?.uid;

  const chatId = chatUser && senderId
    ? [senderId, chatUser.uid].sort().join('-')
    : null;
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgList]);

  const handleSendMessage = async () => {
    if (!msg.trim()) return;

    const timestamp = new Date().toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const newMsg = {
      text: msg,
      senderId: senderId,
      receiverId: chatUser?.uid,
      time: timestamp,
    };

    try {
      if (msgList.length === 0) {
        await setDoc(doc(db, "users-chat", chatId), {
          chatId,
          messages: [newMsg],
        });
      } else {
        await updateDoc(doc(db, "users-chat", chatId), {
          messages: arrayUnion(newMsg),
        });
      }
      setMsg('');
      console.log("Message sent:", msg);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // 1. Fetch selected chat user
  useEffect(() => {
    const fetchUser = async () => {
      if (!uniqueID) return;
      try {
        const userDoc = await getDoc(doc(db, "users", uniqueID));
        if (userDoc.exists()) {
          setChatUser({
            ...userDoc.data(),
            uid: userDoc.id,
          });
        }
      } catch (err) {
        console.error("Error loading chat user:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [uniqueID]);

  // 2. Subscribe to messages when chatId is ready
  useEffect(() => {
    if (!chatId) return;

    const unsub = onSnapshot(doc(db, "users-chat", chatId), (docSnap) => {
      if (docSnap.exists()) {
        setMsgList(docSnap.data()?.messages || []);
      } else {
        setMsgList([]);
        console.log("No previous messages.");
      }
    });

    return () => {
      unsub();
      console.log("Unsubscribed from Firestore messages.");
    };
  }, [chatId]);

  if (!uniqueID) {
    return (
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
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-[#eff2f5] text-gray-500">
        <Loader className="w-10 h-10 animate-ping text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-[#eff2f5]" key={chatUser?.uid}>
      <div className="p-4 border-b border-gray-300 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={chatUser.photoURL} alt={chatUser.uid} className='h-10 w-10 rounded-full' />
          <h1 className="text-lg font-semibold text-gray-700">{chatUser?.name}</h1>
        </div>
        <Phone />
      </div>

      <div className='flex flex-grow flex-col gap-4 p-6 bg-amber-300 overflow-y-auto'>
        {msgList.map((message, index) => (
          <div
            key={index}
            data-sender={message.senderId === senderId ? 'true' : 'false'}
            className={` w-fit rounded-md p-2 shadow-sm max-w-[400px] break-words ${
              message.senderId === senderId ? 'ml-auto bg-[#D9FDD3]' : 'mr-auto bg-[#fff]'
            }`}
          >
            <p>{message.text}</p>
            <p className="text-xs text-gray-500">{message.time}</p>
          </div>
        ))}
         <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center p-4 gap-4 shadow-md bg-[#eff2f5]">
        <PlusIcon />
        <input
          type="text"
          className='w-full rounded py-2 px-4 bg-white focus:outline-none'
          placeholder='Type a message...'
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <button className='' onClick={handleSendMessage}><SendHorizontal /></button>
      </div>
    </div>
  );
}

export default Chat;
