import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseconfig';

function Home(props) {
 const setLogin = props.setLogin;

const handleLogout = async() => {
  setLogin(false);
  await signOut(auth);
  alert("You have been logged out successfully!");
}

  return (
    <div>
      Home
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
