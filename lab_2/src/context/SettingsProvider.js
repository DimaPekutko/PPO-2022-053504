import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const SETTINGS_KEYS = {
  isDarkTheme: "isDarkTheme",
  fontSize: "fontSize",
  language: "language"
}

export const languages = {
  rus: "rus",
  eng: "eng"
}

export const SettingsContext = React.createContext({
  isDarkTheme: null,
  fontSize: null,
  language: null,

  setDarkTheme: null,
  setFontSize: null,
  setLanguage: null
})

export const SettingsProvider = ({ children }) => {

  const [isDarkTheme, _setDarkTheme] = useState(!false)
  const [fontSize, _setFontSize] = useState(20)
  const [language, _setLanguage] = useState(languages.eng)

  useEffect(() => {
    async function setStoredSettings() {
      let isDarkTheme = await AsyncStorage.getItem(SETTINGS_KEYS.isDarkTheme) === "true"
      let fontSize = await AsyncStorage.getItem(SETTINGS_KEYS.fontSize)
      let language = await AsyncStorage.getItem(SETTINGS_KEYS.language)


      _setDarkTheme(isDarkTheme)
      fontSize !== null && _setFontSize(parseInt(fontSize))
      language !== null && _setLanguage(String(language))
    }

    setStoredSettings()
  }, [])

  const setDarkTheme = async (status) => {
    _setDarkTheme(status)
    try {
      await AsyncStorage.setItem(SETTINGS_KEYS.isDarkTheme, String(status))

    }
    catch (err) {
      console.error(err)
    }
  }
  const setFontSize = async (size) => {
    _setFontSize(size)
    try {
      await AsyncStorage.setItem(SETTINGS_KEYS.fontSize, String(size))

    }
    catch (err) {
      console.error(err)
    }
  }
  const setLanguage = async (lang) => {
    _setLanguage(lang)
    try {
      await AsyncStorage.setItem(SETTINGS_KEYS.language, String(lang))

    }
    catch (err) {
      console.error(err)
    }
  }


  return (
    <SettingsContext.Provider value={{
      isDarkTheme: isDarkTheme,
      fontSize: fontSize,
      language: language,
      setDarkTheme: setDarkTheme,
      setFontSize: setFontSize,
      setLanguage: setLanguage
    }}>
      {children}
    </SettingsContext.Provider>
  )
}
