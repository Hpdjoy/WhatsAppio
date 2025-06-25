import React from 'react';

const ThemeContext = React.createContext();

export function useTheme() {
  return React.useContext(ThemeContext);
}


 function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;