import { Link } from 'react-router-dom';
import React from 'react'

function RecentChats(props) {
const { userObject: user } = props;
  return (
    <>
            <Link key={user.uid} className='flex items-center h-[100%] p-2 gap-3 border-b border-gray-200' to={`/chat/${user.uid}`}>
                    <img
                          src={user.photoURL}
                          alt={user.name}
                          className='rounded-full h-10 w-10 object-cover'
                    />

                    <p>{user.name}</p>
              </Link>

    </>
  )
}

export default RecentChats
