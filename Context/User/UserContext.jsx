import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect } from 'react'
import { auth, db } from '../../firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';
import { Loader } from 'lucide-react';

const UserContext = React.createContext();


export function UseUserData() {
  return useContext(UserContext);
}


function UserWrapper({ children }) {
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
   const ubsubscribe= onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = {
            name: docSnap.data().name,
            email: docSnap.data().email,
            photoURL: docSnap.data().photoURL,
            uid: docSnap.data().uid
          };
          setUserData(userData);
        }
      }
     setLoading(false);
    })
    
    return () => {
      ubsubscribe();
    }
   
  },[])
  console.log("User Data in UserWrapper:", userData);
  if(loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='animate-spin text-[#ff0000] h-10 w-10' />
        <p className='text-[#000000]'>Loading...</p>
      </div>
    )
  }

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserWrapper;
