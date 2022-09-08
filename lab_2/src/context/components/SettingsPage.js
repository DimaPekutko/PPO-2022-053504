import React from "react";
import {SafeAreaView, Text, TextInput } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import styles from "../styles/styles";

import Button from "./Button"
import { SettingsContext } from "../SettingsProvider";


const SettingsPage = () => {
  const settingsCtx = React.useContext(SettingsContext)
  const isDarkTheme = settingsCtx.isDarkTheme
  const css = styles(isDarkTheme, settingsCtx.fontSize)

  const onThemeChangeCheckboxChange = (e) => {
    settingsCtx.setDarkTheme(!isDarkTheme)
  }

  const onFontSizeInputChange = (text) => {
    let size = parseInt(text)
    if (size >= 10 && size <= 25) {
      settingsCtx.setFontSize(size)
    }
  }


  return (
    <SafeAreaView>

      <SafeAreaView style={css.rowView}>
        <Text style={css.text}>
          Dark theme
        </Text>
        <CheckBox 
          style={css.checkBox} 
          value={isDarkTheme} 
          tintColors={css.checkBoxColors}
          onValueChange={onThemeChangeCheckboxChange} 
        />
      </SafeAreaView>

      <SafeAreaView style={css.rowView}>
        <Text style={css.text}>
          Font size: ({settingsCtx.fontSize}px) 
        </Text>
        <TextInput
          style={css.textInput}
          value={settingsCtx.fontSize}
          keyboardType="number-pad"
          placeholder="Font size"
          onChangeText={onFontSizeInputChange}
        />
      </SafeAreaView>

      <SafeAreaView style={css.rowView}>
        <Button title={"Clear all data"} />
      </SafeAreaView>


    </SafeAreaView>
  )
}

export default SettingsPage