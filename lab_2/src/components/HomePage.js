import { Link, useIsFocused } from "@react-navigation/native";
import React, { useEffect, useContext, useState } from "react";
import SplashScreen from 'react-native-splash-screen'
import { ScrollView, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { DatabaseContext } from "../context/DatabaseProvider";
import { SettingsContext, languages } from "../context/SettingsProvider";


import Button from "./Button"
import styles from "../styles/styles";

const HomePage = ({ navigation }) => {
  const databaseCtx = useContext(DatabaseContext)
  const settingsCtx = useContext(SettingsContext)
  const css = styles(settingsCtx.isDarkTheme, settingsCtx.fontSize)

  const [seqs, setSeqs] = useState([])
  const isScreenFocused = useIsFocused()

  useEffect(() => {
    async function recieveSeqs() {
      SplashScreen.hide()
      const data = await databaseCtx.getAllSeqs()
      setSeqs(data)
    }
    recieveSeqs()
  }, [isScreenFocused, databaseCtx.isConnected])



  const onSeqItemPress = (event, seq) => {
    navigation.navigate("Timer", {
      seqId: seq.id
    })
  }

  const onChangeBtnPress = async (seqId) => {
    navigation.navigate("Sequence", {
      seqId: seqId
    })
  }

  const onDeleteBtnPress = async (seqId) => {
    await databaseCtx.deleteSeq(seqId)
    let i = 0;
    for (i; i < seqs.length; i++) {
      if (seqs[i].id == seqId) {
        break;
      }
    }
    seqs.splice(i, 1)
    setSeqs([...seqs])
  }

  return (
    <ScrollView>
      {
        seqs.length != 0 ? seqs.map((seq, i) => {
          return (
            <TouchableOpacity key={i} onPress={e => onSeqItemPress(e, seq)}>
              <SafeAreaView style={[css.rowView]}>
                <Text style={[css.text, { backgroundColor: seq.color.toLowerCase() }]}>
                  {seq.name}
                </Text>
                <Text style={css.text}>
                  {seq.duration} sec
                </Text>
                <Button title={settingsCtx.language === languages.eng ? "Chgnge" : "Изм."} onPress={e => onChangeBtnPress(seq.id)} />
                <Button title={settingsCtx.language === languages.eng ? "del." : "Удалить"} onPress={e => onDeleteBtnPress(seq.id)} />
              </SafeAreaView>
            </TouchableOpacity>
          )
        }) :
          <SafeAreaView style={css.rowView}>
            <Text style={css.text}>
              {
                settingsCtx.language === languages.eng ?
                  "There are no timers yet!" :
                  "Пока нет таймеров!"
              }
            </Text>
          </SafeAreaView>
      }
    </ScrollView>
  )
}


export default HomePage