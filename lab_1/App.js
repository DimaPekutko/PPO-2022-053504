import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";

import { useWindowDimensions } from "react-native";

import Keyboard from "./src/Keyboard";
import ExchangesBar from "./src/ExchangesBar";

export default function App() {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [firstNum, setFirstNum] = React.useState(0);

  const [clr, setClr] = React.useState("red");

  function getHex() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }

  // setTimeout(() => {
  //   let clr = "#" + String(getHex());
  //   setClr(clr);
  // }, 2000);
  return (
    <SafeAreaView
      style={styles.container}
      backgroundColor={clr}
      flexDirection={windowWidth > windowHeight ? "row" : "column"}
    >
      <Text style={styles.logo}>Exchanges</Text>
      <ExchangesBar firstNum={firstNum} setFirstNum={setFirstNum} />
      <Keyboard num={firstNum} setNum={setFirstNum} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "red",
    // backgroundColor: "blue",
    height: "100%",
    flex: 1,
  },
  logo: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
    paddingVertical: 20,
  },
});
