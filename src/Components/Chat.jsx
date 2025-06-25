import React from 'react'
import { useParams } from 'react-router-dom'
function Chat() {
  const { uniqueID } = useParams();
  return (

    <div>
      Chat:
      {uniqueID }
    </div>
  )
}

export default Chat
