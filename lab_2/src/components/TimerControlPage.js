import React, { useContext, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Text, ScrollView, SafeAreaView } from "react-native";
import BackgroundTimer from 'react-native-background-timer';
import Sound from 'react-native-sound';

import Button from "./Button";
import { SettingsContext, languages } from "../context/SettingsProvider";
import { DatabaseContext } from "../context/DatabaseProvider";
import styles from "../styles/styles";

Sound.setCategory("Playback")
const phaseSound = new Sound("phase_sound.mp3", Sound.MAIN_BUNDLE, err => {
  if (err) {
    console.log("Error while loading phase sound:", err)
  }
})

const TimerControlPage = ({ route, navigation }) => {
  const settingsCtx = useContext(SettingsContext)
  const databaseCtx = useContext(DatabaseContext)
  const isDarkTheme = settingsCtx.isDarkTheme
  const css = styles(isDarkTheme, settingsCtx.fontSize)
  const isScreenFocused = useIsFocused()

  const [seq, setSeq] = useState({
    id: null,
    name: "",
    color: "",
    duration: 0,
  })
  const [phases, setPhases] = useState([])
  const [curPhaseIdx, setCurPhaseIdx] = useState(0)
  const [timePassed, setTimePassed] = useState(0)
  const [isTimerStopped, setTimerStopped] = useState(false)

  let phaseIdx = 0


  useEffect(() => {
    async function setSeqAndPhases(seqId) {
      let data = await databaseCtx.getSeqAndPhases(seqId)
      setSeq(data.seq)
      setPhases(data.phases)
    }

    if (route.params?.seqId) {
      setSeqAndPhases(route.params.seqId)
    }
  }, [isScreenFocused])

  const timerCallback = () => {
    if (phaseIdx >= phases.length) {
      setTimePassed(seq.duration * 1000)
      BackgroundTimer.clearInterval()
      return
    }
    setTimePassed(passed => {
      let newSecondsPassed = passed / 1000

      let sumPhasesPassed = 0
      for (let i = 0; i <= phaseIdx; i++) {
        sumPhasesPassed += phases[i].duration
      }

      if (newSecondsPassed >= sumPhasesPassed) {
        phaseIdx++
        setCurPhaseIdx(idx => idx + 1)
        phaseSound.play()
      }

      return passed + 100
    })


  }

  const onStartBtnPress = (e) => {
    setCurPhaseIdx(0)
    setTimePassed(0)
    setTimerStopped(false)
    BackgroundTimer.stopBackgroundTimer()
    BackgroundTimer.runBackgroundTimer(timerCallback, 80)
    phaseSound.play()
  }

  const onStopBtnPress = (e) => {
    if (timePassed == 0) return
    if (isTimerStopped) {
      BackgroundTimer.runBackgroundTimer(timerCallback, 80)
      phaseSound.play()
    }
    else {
      BackgroundTimer.stopBackgroundTimer()
    }
    setTimerStopped(status => !status)
  }

  const onResetBtnPress = (e) => {
    setCurPhaseIdx(0)
    setTimePassed(0)
    BackgroundTimer.stopBackgroundTimer()
  }


  return (
    <ScrollView>
      <SafeAreaView style={{ backgroundColor: seq.color.toLowerCase() }}>
        <Text style={css.textLogo}>
          {seq.name}, {settingsCtx.language === languages.eng ? "Duration" : "Длина"} ({seq.duration} secs.)
        </Text>
      </SafeAreaView>
      <SafeAreaView>
        <Text style={[css.text, { fontSize: settingsCtx.fontSize * 1.2 }]}>
          {settingsCtx.language === languages.eng ? "Time" : "Время:"}
        </Text>
        <Text style={css.text}>
          {parseFloat(timePassed / 1000)} secs / {seq.duration} secs
        </Text>
      </SafeAreaView>
      {
        phases.map((phase, i) => {
          return (
            <SafeAreaView key={i} style={css.rowView}>
              {
                curPhaseIdx == i &&
                <Text style={css.text}>
                  +
                </Text>
              }
              <Text style={css.text}>
                {phase.name}: {phase.duration} secs
              </Text>
            </SafeAreaView>
          )
        })
      }
      <SafeAreaView style={css.rowView}>
        <Button title={settingsCtx.language === languages.eng ? "START" : "СТАРТ"} onPress={onStartBtnPress} />
        <Button title={settingsCtx.language === languages.eng ? "STOP" : "СТОП"} onPress={onStopBtnPress} />
        <Button title={settingsCtx.language === languages.eng ? "RESET" : "СБРОС"} onPress={onResetBtnPress} />
      </SafeAreaView>
    </ScrollView>
  )
}

export default TimerControlPage