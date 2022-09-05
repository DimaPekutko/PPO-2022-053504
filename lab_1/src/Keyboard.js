import React from "react";
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { useWindowDimensions } from "react-native";

import Button from "./Button";

export default function Keyboard({ num, setNum }) {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  function onNumBtnClick(e, value) {
    let newNum = parseInt(String(num) + value);
    setNum(newNum);
  }

  function onResetCharBtnClick(e) {
    if (String(num).length > 1) {
      let newNum = parseInt(String(num).slice(0, -1));
      setNum(newNum);
    } else {
      setNum(0);
    }
  }

  function onDeleteNumBtnClick(e) {
    setNum(0);
  }

  return (
    <SafeAreaView width={windowWidth > windowHeight ? "50%" : "100%"}>
      <SafeAreaView style={styles.row}>
        <Button text="0" onClick={onNumBtnClick} />
        <Button text="1" onClick={onNumBtnClick} />
        <Button text="2" onClick={onNumBtnClick} />
      </SafeAreaView>
      <SafeAreaView style={styles.row}>
        <Button text="3" onClick={onNumBtnClick} />
        <Button text="4" onClick={onNumBtnClick} />
        <Button text="5" onClick={onNumBtnClick} />
      </SafeAreaView>
      <SafeAreaView style={styles.row}>
        <Button text="6" onClick={onNumBtnClick} />
        <Button text="7" onClick={onNumBtnClick} />
        <Button text="8" onClick={onNumBtnClick} />
      </SafeAreaView>
      <SafeAreaView style={styles.row}>
        <Button text="9" onClick={onNumBtnClick} />
        <Button text="C" onClick={onResetCharBtnClick} />
        <Button text="DEL" onClick={onDeleteNumBtnClick} />
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    // borderColor: "red",
    // borderWidth: 3,
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
});
