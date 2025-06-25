import React from 'react'
import Login from '../src/Components/Login';
import { Navigate } from 'react-router-dom';
import Home from '../src/Components/Home';

function ProtectedRoute({ isLogged, setLogin, children }) {
      if (!isLogged) {
            return <Navigate to='/login' />
      } else {
            return children
      }
}


export default ProtectedRoute
