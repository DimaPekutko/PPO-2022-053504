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
      borderTopWidth: 1,
      borderTopColor: theme.colors.text,
      marginVertical: 5,
      backgroundColor: theme.colors.item,
    },
    text: {
      fontSize: fontSize,
      padding: 10,
      paddingHorizontal: 20,
      color: theme.colors.text
    },
    textLogo: {
      fontSize: fontSize*1.2,
      padding: 10,
      paddingHorizontal: 10,
      color: theme.colors.primary
    },
    activeText: {
      fontSize: fontSize,
      padding: 10,
      paddingHorizontal: 20,
      color: theme.colors.background,
      backgroundColor: theme.colors.primary
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
      textAlign: "center",
      color: theme.colors.background
    },
    textInput: {
      fontSize: fontSize,
      color: theme.colors.text,
      placeholderColor: theme.colors.text,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.primary,
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