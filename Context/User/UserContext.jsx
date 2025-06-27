import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect } from 'react'
import { auth, db } from '../../firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';

const UserContext = React.createContext();


export function UseUserData() {
  return useContext(UserContext);
}


function UserWrapper({ children }) {
  const [userData, setUserData] = React.useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = {
            name: docSnap.data().displayName,
            email: docSnap.data().email,
            photoURL: docSnap.data().photoURL,
            uid: docSnap.data().uid
          };
          setUserData(userData);
        }
      }

    })
  },[])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserWrapper;
