import React from "react";
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

export default function Button({ text, onClick }) {
  function onPress(e) {
    onClick(e, text);
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    width: "30%",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "lime",
    textAlign: "center",
    fontSize: 20,
  },
});
