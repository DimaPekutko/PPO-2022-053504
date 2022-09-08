import React, { useContext, useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsContext } from "../SettingsProvider";

import { lightTheme, darkTheme } from "../styles/colors";

import HomePage from "./HomePage"
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
          component={HomePage}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsPage}
        />
      </Stack.Navigator>
    <NavigationBar/>
    </NavigationContainer>
  )

}

export default MainContainer