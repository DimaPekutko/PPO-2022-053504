import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { DatabaseContext } from "../context/DatabaseProvider";
import { SettingsContext, languages } from "../context/SettingsProvider";

import Button from "./Button";

import styles from "../styles/styles";

const SeqPage = ({ route, navigation }) => {
  const databaseCtx = React.useContext(DatabaseContext)
  const settingsCtx = React.useContext(SettingsContext)
  const css = styles(settingsCtx.isDarkTheme, settingsCtx.fontSize)

  // if we are using this screen for editing already existing sequence
  // then setup state below as true.
  const [isEditingMode, setEditingMode] = useState(false)
  const [seq, setSeq] = useState({
    id: null,
    name: "timer",
    color: "hotpink",
    duration: 0
  })
  const [phases, setPhases] = useState([])
  const [errMsg, setErrorMsg] = useState("")


  useEffect(() => {
    async function setSeqAndPhases(seqId) {
      let data = await databaseCtx.getSeqAndPhases(seqId)  
      if (data !== null) {
        setSeq(data.seq)
        setPhases(data.phases)
      }
    }
    if (route.params?.seqId) {
      setEditingMode(true)
      setSeqAndPhases(route.params.seqId)
    }
  }, [])

  const onNewPhaseBtnPress = (e) => {
    let newPhase = {
      name: "New phase",
      duration: 15,
    }
    phases.push(newPhase)
    setPhases([...phases])
  }

  const onDeletePhaseBtnPress = (phasesIdx) => {
    phases.splice(phasesIdx, 1)
    setPhases([...phases])
  }

  const onNameInputChange = (name) => {
    let newSeq = { ...seq }
    newSeq.name = name
    setSeq(newSeq)
  }

  const onColorInputChange = (color) => {
    let newSeq = { ...seq }
    newSeq.color = color
    setSeq(newSeq)
  }

  const onPhaseNameInputChange = (phasesIdx, name) => {
    phases[phasesIdx].name = name.trim()
    setPhases([...phases])
  }

  const onPhaseDurationInputChange = (phasesIdx, duration) => {
    phases[phasesIdx].duration = duration
    setPhases([...phases])
  }

  const onSaveBtnPress = async (e) => {
    if (seq.name.length === 0 || seq.color.length === 0) {
      return setErrorMsg(
        settingsCtx.language === languages.eng ? 
        "Invalid timer name or color!" :
        "Неверное имя или цвет таймера!"
      )
    }
    if (phases.length === 0) {
      return setErrorMsg(
        settingsCtx.language === languages.eng ? 
        "You should have at least one phase!" :
        "Вы должны указать хотя бы одну фазу!"
      )
    }

    let seqDuration = 0
    for (let i = 0; i < phases.length; i++) {
      if (phases[i].name.length === 0 || parseInt(phases[i].duration) === 0) {
        setErrorMsg(`Invalid data in "${i+1}" phase.`)
      }
      seqDuration += parseInt(phases[i].duration)
    }

    if (isEditingMode) {
      await databaseCtx.deleteSeq(seq.id)
    }
    await databaseCtx.createNewSeq(seq.name, seq.color, seqDuration, phases)
    navigation.navigate("Home")
  }

  return (
    <ScrollView>

      <Text style={css.textLogo}>
      {settingsCtx.language === languages.eng ? "Timer:" : "Таймер:"}
      </Text>

      <SafeAreaView style={css.rowView}>
        <Text style={css.text}>
        {settingsCtx.language === languages.eng ? "Name:" : "Назв:"}
        </Text>
        <TextInput
          style={css.textInput}
          value={seq.name}
          placeholder="name"
          placeholderTextColor={css.textInput.placeholderColor}
          onChangeText={onNameInputChange}
        />
      </SafeAreaView>

      <SafeAreaView style={css.rowView}>
        <Text style={css.text}>
        {settingsCtx.language === languages.eng ? "Color:" : "Цвет:"}
        </Text>
        <TextInput
          style={[css.textInput, { backgroundColor: seq.color.toLowerCase() }]}
          value={seq.color}
          placeholder="color"
          placeholderTextColor={css.textInput.placeholderColor}
          onChangeText={onColorInputChange}
        />
      </SafeAreaView>

      <Text style={css.textLogo}>
      {settingsCtx.language === languages.eng ? "Phases:" : "Фазы:"}
      </Text>

      {
        phases.map((phase, i) => {
          return (
            <SafeAreaView key={i}>
              <SafeAreaView style={css.rowView}>
                <Text style={css.text}>
                {settingsCtx.language === languages.eng ? "Name" : "Назв"} ({i + 1}):
                </Text>
                <TextInput
                  style={css.textInput}
                  value={phase.name}
                  placeholder="name"
                  placeholderTextColor={css.textInput.placeholderColor}
                  onChangeText={name => onPhaseNameInputChange(i, name)}
                />
              </SafeAreaView>
              <SafeAreaView style={css.rowView}>
                <Text style={css.text}>
                {settingsCtx.language === languages.eng ? "Duration:" : "Длительность:"}
                </Text>
                <TextInput
                  style={css.textInput}
                  value={String(phase.duration)}
                  keyboardType="number-pad"
                  placeholder="duration"
                  placeholderTextColor={css.textInput.placeholderColor}
                  onChangeText={duration => onPhaseDurationInputChange(i, duration)}
                />
              </SafeAreaView>
              <Button title={settingsCtx.language === languages.eng ? "Delete" : "Удалить"} onPress={e => onDeletePhaseBtnPress(i)} />
            </SafeAreaView>
          )
        })
      }

      <SafeAreaView style={css.rowView}>
        <Text style={css.text}>
          {errMsg}
        </Text>
      </SafeAreaView>
      <SafeAreaView style={css.rowView}>
        <Button title={settingsCtx.language === languages.eng ? "New phase" : "Новая фаза"} onPress={onNewPhaseBtnPress} />
        <Button title={settingsCtx.language === languages.eng ? "Save" : "Сохранить"} onPress={onSaveBtnPress} />
      </SafeAreaView>

    </ScrollView>
  )
}


export default SeqPage