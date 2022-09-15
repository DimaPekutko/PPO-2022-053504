import React, { useContext, useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsContext, languages } from "../context/SettingsProvider";

import { lightTheme, darkTheme } from "../styles/colors";

import HomePage from "./HomePage"
import SeqPage from "./SeqPage"
import TimerControlPage from "./TimerControlPage";
import SettingsPage from "./SettingsPage";
import styles from "../styles/styles";
import NavigationBar from "./NavigationBar";

const Stack = createNativeStackNavigator();

const MainContainer = () => {

  const settingsCtx = useContext(SettingsContext)
  const isDarkTheme = settingsCtx.isDarkTheme
  const css = styles(isDarkTheme, settingsCtx.fontSize)

  return (
    <NavigationContainer theme={isDarkTheme ? darkTheme : lightTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            title: settingsCtx.language === languages.eng ? "Home" : "Домашняя"
          }}
          component={HomePage}
        />
        <Stack.Screen
          name="Sequence"
          options={{
            title: settingsCtx.language === languages.eng ? "Sequence editor" : "Редактор таймера"
          }}
          component={SeqPage}
        />
        <Stack.Screen 
          name="Timer"
          options={{
            title: settingsCtx.language === languages.eng ? "Timer" : "Таймер"
          }}
          component={TimerControlPage}
        />
        <Stack.Screen
          name="Settings"
          options={{
            title: settingsCtx.language === languages.eng ? "Settings" : "Настройки"
          }}
          component={SettingsPage}
        />
      </Stack.Navigator>
    <NavigationBar/>
    </NavigationContainer>
  )

}

export default MainContainer