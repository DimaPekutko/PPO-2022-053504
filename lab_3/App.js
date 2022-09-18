import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, Dimensions } from 'react-native';
import Config from 'react-native-config';
import { BUILD_FLAVORS } from './buildConfig';

import Button from './src/components/Button';
import { calculate } from "./src/core/calc"

const App = () => {

  const [curExpr, setCurExpr] = useState("")
  const [curResult, setCurResult] = useState("")
  const [isScienceMode, setScienceMode] = useState(false)
  const [prevIsPortrait, setPrevIsPortrait] = useState(true)

  useEffect(() => {
    let dimensionsHandler = Dimensions.addEventListener("change", onScreenOrientationChange)
    onScreenOrientationChange()

    return () => {
      dimensionsHandler.remove()
    }
  })

  const isFullAppFlavor = () => {
    return Config.FLAVOR === BUILD_FLAVORS.full
  }

  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    let isPortrait = dim.height >= dim.width
    return isPortrait
  }

  const onScreenOrientationChange = () => {
    let newStatus = isPortrait()

    if (newStatus !== prevIsPortrait) {
      setScienceMode(!newStatus && isFullAppFlavor()) // allow science mode in landscape by default
    }
    setPrevIsPortrait(newStatus)
  }

  const onBtnClick = (btnTitle) => {
    setCurResult("")
    setCurExpr(curExpr + btnTitle)
  }

  const onClearBtnClick = (btnTitle) => {
    setCurExpr("")
  }

  const onDeleteCharBtnClick = (btnTitle) => {
    let newExpr = curExpr.slice(0, -1)
    setCurExpr(newExpr)
  }

  const onScienceModeBtnClick = (btnTitle) => {
    if (isFullAppFlavor()) {
      setScienceMode(!isScienceMode)
    }
    else {
      ToastAndroid.showWithGravity(
        "You cannot use science functions in demo version!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      )
    }
  }

  const onCalcResultBtnClick = (btnTitle) => {
    console.log(curResult)
    if (curExpr.length > 0) {
      let result = calculate(curExpr, isScienceMode)
      setCurResult(String(result))
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView >
        <Text style={styles.textLogo}>
          Calculator {
            isFullAppFlavor() ?
              "" :
              "(demo)"
          }
        </Text>
      </SafeAreaView>
      <SafeAreaView style={
        [styles.container,
        {
          flexDirection: isPortrait() ? "column" : "row"
        }]
      }>
        <ScrollView style={[styles.container, { flexGrow: 1, height: "100%" }]}>
          <SafeAreaView style={styles.input}>
            <Text style={styles.inputText}>
              $: {curExpr.length > 0 ? curExpr : "0"}
            </Text>
            <Text style={styles.inputText}>
              {curResult.length > 0 ? `= ${curResult}` : ""}
            </Text>
          </SafeAreaView>
        </ScrollView>
        <SafeAreaView style={
          [styles.container,
          {
            maxHeight: isPortrait() ? "50%" : "100%"
          }]
        }>
          {
            isScienceMode &&
            <>
              <SafeAreaView style={styles.row}>
                <Button accent={true} title={"sin"} onPress={onBtnClick} />
                <Button accent={true} title={"cos"} onPress={onBtnClick} />
                <Button accent={true} title={"tan"} onPress={onBtnClick} />
                <Button accent={true} title={"ctg"} onPress={onBtnClick} />
                <Button accent={true} title={"log"} onPress={onBtnClick} />
              </SafeAreaView>
            </>
          }
          <SafeAreaView style={styles.row}>
            {
              isScienceMode && (
                <>
                  <Button accent={true} title={"sqrt"} onPress={onBtnClick} />
                  <Button accent={true} title={"pi"} onPress={onBtnClick} />
                  <Button accent={true} title={"e"} onPress={onBtnClick} />
                </>
              )
            }
            <Button title={"."} onPress={onBtnClick} />
            <Button title={"^"} onPress={onBtnClick} />
          </SafeAreaView>
          <SafeAreaView style={styles.row}>
            <Button title={"1"} onPress={onBtnClick} />
            <Button title={"2"} onPress={onBtnClick} />
            <Button title={"3"} onPress={onBtnClick} />
            <Button title={"+"} onPress={onBtnClick} />
            <Button title={"*"} onPress={onBtnClick} />
          </SafeAreaView>
          <SafeAreaView style={styles.row}>
            <Button title={"4"} onPress={onBtnClick} />
            <Button title={"5"} onPress={onBtnClick} />
            <Button title={"6"} onPress={onBtnClick} />
            <Button title={"-"} onPress={onBtnClick} />
            <Button title={"/"} onPress={onBtnClick} />
          </SafeAreaView>
          <SafeAreaView style={styles.row}>
            <Button title={"7"} onPress={onBtnClick} />
            <Button title={"8"} onPress={onBtnClick} />
            <Button title={"9"} onPress={onBtnClick} />
            <Button title={"("} onPress={onBtnClick} />
            <Button title={")"} onPress={onBtnClick} />
          </SafeAreaView>
          <SafeAreaView style={styles.row}>
            <Button title={"0"} onPress={onBtnClick} />
            <Button title={"C"} onPress={onClearBtnClick} />
            <Button title={"DEL"} onPress={onDeleteCharBtnClick} />
            <Button title={"SC"} onPress={onScienceModeBtnClick} />
            <Button title={"="} onPress={onCalcResultBtnClick} />
          </SafeAreaView>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "brown",
  },
  text: {
    fontSize: 23,
    padding: 5,
    color: "yellow",
    fontWeight: "bold"
  },
  textLogo: {
    fontSize: 40,
    padding: 5,
    color: "yellow",
    fontWeight: "bold",
    paddingLeft: 15
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: "black",
    flex: 1,
    borderRadius: 15,
    margin: 10
  },
  inputText: {
    fontSize: 30,
    padding: 5,
    color: "yellow",
    fontWeight: "bold",
    // textAlign: "right",
    paddingHorizontal: 30,
    // paddingTop: 30,
  }
})

export default App
