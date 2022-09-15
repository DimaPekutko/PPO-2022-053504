import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Link } from "@react-navigation/native";

import { SettingsContext, languages } from "../context/SettingsProvider";
import styles from "../styles/styles";
import Button from "./Button";

const NavigationBar = () => {

  const settingsCtx = React.useContext(SettingsContext)
  const isDarkTheme = settingsCtx.isDarkTheme
  const css = styles(isDarkTheme, settingsCtx.fontSize)


  return (
    <SafeAreaView style={css.navigationBar}>
      <Link style={css.text} to={{ screen: "Home" }}>
      {settingsCtx.language === languages.eng ? "Home" : "Домой"}
      </Link>
      <Link style={css.activeText} to={{ screen: "Sequence" }}>
      {settingsCtx.language === languages.eng ? "New" : "Нов"}
      </Link>
      <Link style={css.text} to={{ screen: "Settings" }}>
      {settingsCtx.language === languages.eng ? "Settings" : "Настр."}
      </Link>
    </SafeAreaView>
  )
}


export default NavigationBar