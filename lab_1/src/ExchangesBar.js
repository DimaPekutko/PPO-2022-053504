/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { Clipboard } from "react-native";

import { useWindowDimensions } from "react-native";

import Button from "./Button";

const UNIT_CATEGORIES = [
  {
    name: "currency",
    units: [
      { name: "USD", factor: 1, um_ext: "$" },
      { name: "Euro", factor: 1.2, um_ext: "€" },
      { name: "BY", factor: 0.4, um_ext: "BY" },
    ],
  },
  {
    name: "longitude",
    units: [
      { name: "meter", factor: 1, um_ext: "m" },
      { name: "feet", factor: 0.3048, um_ext: "ft" },
      { name: "yard", factor: 0.9144, um_ext: "yd" },
    ],
  },
  {
    name: "weight",
    units: [
      { name: "gram", factor: 1, um_ext: "g" },
      { name: "pound", factor: 453.5923, um_ext: "lb" },
      { name: "ounce", factor: 28.3495, um_ext: "oz" },
    ],
  },
];

export default function ExchangesBar({ firstNum, setFirstNum }) {
  const [secondNum, setSecondNum] = React.useState(0);
  const [currentCatIdx, setCurrentCatIdx] = React.useState(0);
  const [fromUnitIdx, setFromUnitIdx] = React.useState(0);
  const [toUnitIdx, setToUnitIdx] = React.useState(1);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  function onClickUnitCat(e, btnValue) {
    for (let i = 0; i < UNIT_CATEGORIES.length; i++) {
      if (UNIT_CATEGORIES[i].name === btnValue) {
        setCurrentCatIdx(i);
        return;
      }
    }
  }

  function onClickFromUnitBtn(e, btnValue) {
    const units = UNIT_CATEGORIES[currentCatIdx].units;
    for (let i = 0; i < units.length; i++) {
      if (units[i].name === btnValue) {
        setFromUnitIdx(i);
        return;
      }
    }
  }

  function onClickToUnitBtn(e, btnValue) {
    const units = UNIT_CATEGORIES[currentCatIdx].units;
    for (let i = 0; i < units.length; i++) {
      if (units[i].name === btnValue) {
        setToUnitIdx(i);
        return;
      }
    }
  }

  function getCurrentCatUnits(is_first = true) {
    let units = [];
    UNIT_CATEGORIES[currentCatIdx].units.forEach((unit, i) => {
      units.push(
        // eslint-disable-next-line react/jsx-no-undef
        <Button
          key={i}
          text={unit.name}
          onClick={is_first ? onClickFromUnitBtn : onClickToUnitBtn}
        />
      );
    });
    return units;
  }

  function getCurrentUnitExt(is_first = true) {
    let category = null;
    let ext =
      UNIT_CATEGORIES[currentCatIdx].units[is_first ? fromUnitIdx : toUnitIdx]
        .um_ext;
    return ext;
  }

  function onConvertBtnClick(e) {
    let fromUnit = UNIT_CATEGORIES[currentCatIdx].units[fromUnitIdx];
    let toUnit = UNIT_CATEGORIES[currentCatIdx].units[toUnitIdx];
    // eslint-disable-next-line no-undef
    let newSecondNum = ((firstNum * fromUnit.factor) / toUnit.factor).toFixed(
      1
    );
    setSecondNum(newSecondNum);
  }

  function onReverseBtnClick(e) {
    // eslint-disable-next-line no-undef
    let tmp = firstNum;
    // eslint-disable-next-line no-undef
    setFirstNum(secondNum);
    setSecondNum(tmp);
    tmp = fromUnitIdx;
    setFromUnitIdx(toUnitIdx);
    setToUnitIdx(tmp);
  }

  function onCopyBtnClick(e) {
    // eslint-disable-next-line no-undef
    Clipboard.setString(firstNum);
  }

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.subcontainer}>
        <Text style={styles.text}>Choose unit category:</Text>
        <SafeAreaView style={styles.row}>
          {UNIT_CATEGORIES.map((unitCat, i) => (
            <Button key={i} text={unitCat.name} onClick={onClickUnitCat} />
          ))}
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.subcontainer}>
        <Text style={styles.text}>
          From:
          {UNIT_CATEGORIES[currentCatIdx].units[fromUnitIdx].name}
        </Text>
        <SafeAreaView style={styles.row}>{getCurrentCatUnits()}</SafeAreaView>
        <Text style={styles.input}>
          {firstNum} {getCurrentUnitExt()}
        </Text>
      </SafeAreaView>
      <SafeAreaView style={styles.subcontainer}>
        <Text style={styles.text}>
          To:
          {UNIT_CATEGORIES[currentCatIdx].units[toUnitIdx].name}
        </Text>
        <SafeAreaView style={styles.row}>
          {getCurrentCatUnits(false)}
        </SafeAreaView>
        <Text style={styles.input}>
          {secondNum} {getCurrentUnitExt(false)}
        </Text>
      </SafeAreaView>
      <SafeAreaView style={styles.row}>
        <Button text="Convert" onClick={onConvertBtnClick} />
        <Button text="Reverse" onClick={onReverseBtnClick} />
        <Button text="Copy" onClick={onCopyBtnClick} />
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  active_text: {
    color: "blue",
    fontStyle: "italic",
  },
  subcontainer: {
    width: "90%",
    // borderWidth: 4,
    // borderColor: "red",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "black",
    color: "yellow",
    borderRadius: 15,
    padding: 10,
    fontSize: 20,
    marginVertical: 10,
  },
});
