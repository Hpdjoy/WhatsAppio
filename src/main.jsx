import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ThemeProvider from './../Context/ThemeChanger/Theme.jsx'
import UserWrapper from './../Context/User/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserWrapper>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </UserWrapper>
    </BrowserRouter>
  </StrictMode>,
)