import React from "react";
import { SafeAreaView, Text, TextInput } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import styles from "../styles/styles";

import Button from "./Button"
import { SettingsContext, languages } from "../context/SettingsProvider";
import { DatabaseContext } from "../context/DatabaseProvider";

const SettingsPage = ({ navigation }) => {
  const databaseCtx = React.useContext(DatabaseContext)
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

  const onClearDataBtnPress = async (e) => {
    await databaseCtx.deleteAllSeqs()
    navigation.navigate("Home")
  }

  return (
    <SafeAreaView>

      <Text style={css.textLogo}>
        {settingsCtx.language === languages.eng ? "Common:" : "Общие:"}
      </Text>

      <SafeAreaView style={css.rowView}>
        <Text style={css.text}>
        {settingsCtx.language === languages.eng ? "Dark theme:" : "Темная тема:"}
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
        {settingsCtx.language === languages.eng ? "Font size:" : "Шрифта:"} ({settingsCtx.fontSize}px)
        </Text>
        <TextInput
          style={css.textInput}
          value={settingsCtx.fontSize}
          keyboardType="number-pad"
          placeholder="Font size"
          placeholderTextColor={css.textInput.placeholderColor}
          onChangeText={onFontSizeInputChange}
        />
      </SafeAreaView>

      <Text style={css.textLogo}>
      {settingsCtx.language === languages.eng ? "Language:" : "Язык:"}
      </Text>

      <SafeAreaView style={css.rowView}>
        <Text style={css.text}>
        {settingsCtx.language === languages.eng ? "Russian:" : "Русский:"}
        </Text>
        <CheckBox
          style={css.checkBox}
          value={settingsCtx.language === languages.rus}
          tintColors={css.checkBoxColors}
          onValueChange={() => settingsCtx.setLanguage(languages.rus)}
        />
      </SafeAreaView>

      <SafeAreaView style={css.rowView}>
        <Text style={css.text}>
        {settingsCtx.language === languages.eng ? "English:" : "Анлийский:"}
        </Text>
        <CheckBox
          style={css.checkBox}
          value={settingsCtx.language === languages.eng}
          tintColors={css.checkBoxColors}
          onValueChange={() => settingsCtx.setLanguage(languages.eng)}
        />
      </SafeAreaView>

      <SafeAreaView style={css.rowView}>
        <Button title={settingsCtx.language === languages.eng ? "Clear all data" : "Очистить данные"} onPress={onClearDataBtnPress} />
      </SafeAreaView>


    </SafeAreaView>
  )
}

export default SettingsPage