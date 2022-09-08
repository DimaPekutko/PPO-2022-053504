import { StyleSheet } from "react-native";

import { darkTheme, lightTheme } from "./colors"

export default GLOBAL_STYLES = (isDarkTheme, fontSize) => {

  const theme = isDarkTheme ? darkTheme : lightTheme

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    view: {
      flex: 1,
      backgroundColor: theme.colors.background,
      borderBottomWidth: 4,
      borderBottomColor: theme.colors.border
    },
    rowView: {
      flexDirection: "row",
      borderTopWidth: 2,
      borderTopColor: theme.colors.text,
    },
    text: {
      fontSize: fontSize,
      padding: 10,
      color: theme.colors.text
    },
    button: {
      margin: 10,
      backgroundColor: theme.colors.border,
      borderWidth: 3,
      borderColor: theme.colors.border,
      borderRadius: 15
    },
    buttonText: {
      fontSize: fontSize,
      padding: 5,
      color: theme.colors.background
    },
    textInput: {
      fontSize: fontSize,
      color: theme.colors.text
    },
    checkBox: {
      marginTop: fontSize / 2,
    },
    checkBoxColors: { 
      true: theme.colors.text, 
      false: theme.colors.text 
    },
    navigationBar: {
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: theme.colors.background,
      borderTopWidth: 2,
      borderTopColor: theme.colors.text
    }
  })
}