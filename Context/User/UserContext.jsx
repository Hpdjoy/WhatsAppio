import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { auth, db, Storage } from '../../firebaseconfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Loader } from 'lucide-react';

const UserContext = React.createContext();

export function UseUserData() {
  return useContext(UserContext);
}

function UserWrapper({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const user = docSnap.data();
            const formattedData = {
              name: user.name,
              email: user.email,
              photoURL: user.photoURL,
              uid: user.uid,
              lastSeen: user.lastSeen,
              status: user.status,
            };
            setUserData(formattedData);

            // ✅ Update lastSeen after userData is set
            const now = new Date();
            const timestamp = now.toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
              day: '2-digit',
              month: 'short',
            });
            await updateDoc(docRef, {
              lastSeen: timestamp,
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateName = async (newName) => {
    if (!userData?.uid) return;
    try {
      const docRef = doc(db, 'users', userData.uid);
      await updateDoc(docRef, { name: newName });
      setUserData((prev) => ({ ...prev, name: newName }));
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  const updateStatus = async (newStatus) => {
    if (!userData?.uid) return;
    try {
      const docRef = doc(db, 'users', userData.uid);
      await updateDoc(docRef, { status: newStatus });
      setUserData((prev) => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const updatePhoto = async (file) => {
    if (!userData?.uid) return;
    try {
      const storageRef = ref(Storage, `/ProfilePic/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setIsUploading(true);
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload failed:', error);
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const docRef = doc(db, 'users', userData.uid);
          await updateDoc(docRef, { photoURL: downloadURL });
          setUserData((prev) => ({ ...prev, photoURL: downloadURL }));
          setIsUploading(false);
        }
      );
    } catch (error) {
      console.error('Error uploading photo:', error);
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='animate-spin text-red-600 h-10 w-10' />
        <p className='text-black ml-2'>Loading...</p>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ userData, setUserData, updateName, updateStatus, updatePhoto, isUploading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserWrapper;
