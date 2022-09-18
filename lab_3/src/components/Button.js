import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ title, onPress, accent }) => {
  
  return (
    <TouchableOpacity style={[styles.button, accent ? {
      backgroundColor: "orange",
    } : {}
  ]} onPress={ () => onPress(title) }>
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "yellow",
    width: "20%",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonText: {
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    fontSize: 25,
    paddingTop: "15%",
    fontWeight: "bold"
  }
})

export default Button