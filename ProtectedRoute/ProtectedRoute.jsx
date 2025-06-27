import React from 'react'
import Login from '../src/Components/Login';
import { Navigate } from 'react-router-dom';
import Home from '../src/Components/Home';
import { UseUserData } from '../Context/User/UserContext';

function ProtectedRoute({children }) {
      const {userData} = UseUserData();
      if (!userData) {
            return <Navigate to='/login' />
      } else {
            return children
      }
} 


export default ProtectedRoute
