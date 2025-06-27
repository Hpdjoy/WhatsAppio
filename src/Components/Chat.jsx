import React from 'react'
import { useParams } from 'react-router-dom'
function Chat() {
  const { uniqueID } = useParams();

  if(!uniqueID) {
    return (
      <div className='flex flex-col items-center h-screen bg-[#eff2f5] text-black'>
        <p>No chat selected</p>
      </div>
    );
  }
  return (

    <div className='flex flex-col items-center h-screen bg-[#eff2f5] text-black'>
      Chat:
      {uniqueID }
    </div>
  )
}

export default Chat
