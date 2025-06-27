import { useState } from 'react'
import {Routes, Route} from 'react-router-dom' 
import Home from './Components/Home'
import Chat from './Components/Chat' 
import Login from './Components/Login'
import Profile from './Components/Profile'
import PageNotFound from './Components/PageNotFound'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function Routing_app() {
 
  return (
    <>
    <Routes>
      <Route path='/' element={<ProtectedRoute  > <Home/> </ProtectedRoute>} />

      <Route path='/chat/:uniqueID' element={<ProtectedRoute >
        <Home></Home>
      </ProtectedRoute>} />

      <Route path='/profile' element={<ProtectedRoute >
        <Profile />
      </ProtectedRoute>} />

      <Route path='*' element={<PageNotFound />} />

      <Route path='/login' element={<Login/>} />
    </Routes>
      
    </>
  )
}

export default Routing_app
