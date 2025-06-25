import { useState } from 'react'
import {Routes, Route} from 'react-router-dom' 
import Home from './Components/Home'
import Chat from './Components/Chat' 
import Login from './Components/Login'
import Profile from './Components/Profile'
import PageNotFound from './Components/PageNotFound'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function Routing_app() {
  const [login, setLogin] = useState(false)
  return (
    <>
    <Routes>
      <Route path='/' element={<ProtectedRoute isLogged={login} > <Home setLogin={setLogin}/> </ProtectedRoute>} />

      <Route path='/chat/:uniqueID' element={     <ProtectedRoute isLogged={login}>
        <Chat />
      </ProtectedRoute>} />

      <Route path='/profile' element={   <ProtectedRoute isLogged={login}>
        <Profile />
      </ProtectedRoute>} />

      <Route path='*' element={<PageNotFound />} />

      <Route path='/login' element={<Login setLogin={setLogin} />} />
    </Routes>
      
    </>
  )
}

export default Routing_app
