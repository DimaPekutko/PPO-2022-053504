import React, { useState } from "react";
import styles from "./styles/styles";



export const SettingsContext = React.createContext({
  isDarkTheme: null,
  fontSize: null,
  
  setDarkTheme: null,
  setFontSize: null
})

export const SettingsProvider = ({children}) => {

  const [isDarkTheme, setDarkTheme] = useState(false)
  const [fontSize, setFontSize] = useState(18)

  return (
    <SettingsContext.Provider value={{
      isDarkTheme: isDarkTheme,
      fontSize: fontSize,
      setDarkTheme: setDarkTheme,
      setFontSize: setFontSize
    }}>
      {children}
    </SettingsContext.Provider>
  )
}
