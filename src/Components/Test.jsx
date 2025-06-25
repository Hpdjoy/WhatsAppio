import React from 'react'
import { useTheme } from '../../Context/ThemeChanger/Theme';

function Test() {
      
      const { isDarkMode, handleThemeChange } = useTheme();

      return (
            
           
            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                  <div className={`bg-red-200 text-white p-4 ${isDarkMode ? 'bg-red-800' : 'bg-red-200'}`}>
                        Header
                  </div>

                  <div className={`bg-amber-200 text-white p-4 ${isDarkMode ? 'bg-amber-800' : 'bg-amber-200'}`}>
                        Main
                  </div>

                  <div className={`bg-emerald-300 text-white p-4 ${isDarkMode ? 'bg-emerald-800' : 'bg-emerald-300'}`}>
                        Footer
                  </div>

                  <button 
                        className={`px-5 py-2 rounded m-4 bg-emerald-300 text-white p-4 ${isDarkMode ? 'bg-emerald-800' : 'bg-emerald-300'}`} 
                        onClick={handleThemeChange}
                  >
                        Change Theme (Current: {isDarkMode ? 'Dark' : 'Light'})
                  </button>
            </div>
            
      )
}

export default Test
