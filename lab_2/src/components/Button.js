import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles/styles";

import { SettingsContext } from "../context/SettingsProvider";

const Button = ({ title, onPress }) => {
  const settingsCtx = React.useContext(SettingsContext)
  const isDarkTheme = settingsCtx.isDarkTheme

  const css = styles(isDarkTheme)
  
  return (
    <TouchableOpacity style={css.button} onPress={onPress}>
      <Text style={css.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button