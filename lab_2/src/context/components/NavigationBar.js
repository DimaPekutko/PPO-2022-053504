import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Link } from "@react-navigation/native";

import { SettingsContext } from "../SettingsProvider";
import styles from "../styles/styles";
import Button from "./Button";

const NavigationBar = () => {

  const settingsCtx = React.useContext(SettingsContext)
  const isDarkTheme = settingsCtx.isDarkTheme
  const css = styles(isDarkTheme, settingsCtx.fontSize)


  return (
    <SafeAreaView style={css.navigationBar}>
      <Link style={css.text} to={{ screen: "Home" }}>
        Home
      </Link>
      <Link style={css.text} to={{ screen: "Settings" }}>
        <Button style={css.button} title={"New"} />
      </Link>
      <Link style={css.text} to={{ screen: "Settings" }}>
        Settings
      </Link>
    </SafeAreaView>
  )
}


export default NavigationBar