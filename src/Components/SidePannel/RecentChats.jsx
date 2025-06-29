import { Link } from 'react-router-dom';
import React from 'react'
import { useParams } from 'react-router-dom';

function RecentChats(props) {
  const { userObject: user } = props;
  const params = useParams();
  console.log("check point" + params.uniqueID);
  const isActive = params?.uniqueID === user.uid;

  return (
    <>
      <Link key={user.uid}
        className={`flex items-center h-[100%] p-2 gap-3 border-b border-gray-200 hover:bg-gray-300 rounded ${isActive ? 'bg-gray-300' : ''}`}
        to={`/chat/${user.uid}`}>
        <img
          src={user?.photoURL || "/default.jpg"}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = "/default.jpg"; 
          }}
          alt={user?.uid}
          className='rounded-full h-10 w-10 object-cover'
        />

        <p>{user.name}</p>
      </Link>

    </>
  )
}

export default RecentChats
