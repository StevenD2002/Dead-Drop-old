import React, { useEffect, useReducer, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Pressable, TextInput, View, ViewStyle, StyleSheet, Dimensions } from "react-native"
import { Screen, Text } from "../../components"
import Gun from "gun"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import uuid from "react-native-uuid"
import { useTheme } from "@react-navigation/native"
import { ScrollView } from "react-native-gesture-handler"

const ROOT: ViewStyle = {
  flex: 1,
}
const gun = Gun({ peers: ["http://drop.amii.moe:8765/gun"] })
const initialState = {
  messages: [],
}

function reducer(state, message) {
  return {
    messages: [...state.messages, message],
  }
}
const width = Dimensions.get("window").width
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: color.palette.blue,
    borderRadius: 10,
    maxHeight: 40,
    padding: 10,
    width: 100,
  },
  buttonText: {
    color: color.palette.white,
  },
  inputRow: {
    flexDirection: "row",
  },
  messageField: {
    padding: 10,
    width: width - 100,
  },
})
export const ChatScreen = observer(function ChatScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { theme } = useTheme()
  useEffect(() => {
    const messages = gun.get("messages")
    messages.map().once((m) => {
      dispatch({
        name: m?.name,
        message: m?.message,
        createdAt: m?.createdAt,
        key: m?.key,
      })
    })
  }, [])

  const [formState, setFormState] = useState({
    name: "",
    message: "",
  })

  function onChangeName(e) {
    setFormState({
      ...formState,
      name: e,
    })
  }
  function onChangeMessage(e) {
    setFormState({
      ...formState,
      message: e,
    })
  }
  const timeStamp = new Date().toISOString()
  function saveMessage() {
    const messages = gun.get("messages")
    messages.set({
      name: formState.name,
      message: formState.message,
      createdAt: timeStamp,
      key: uuid.v4(),
    })
    setFormState({
      name: "",
      message: "",
    })
  }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <>
        <ScrollView>
          {state.messages.map((message) => (
            <Text key={message.key}>
              {message.name}: {message.message}
            </Text>
          ))}
        </ScrollView>
      </>
      <TextInput onChangeText={onChangeName} placeholder={`Name`} value={formState.name} />
      <View style={styles.inputRow}>
        <TextInput
          onChangeText={onChangeMessage}
          placeholder={`Message`}
          value={formState.message}
          style={styles.messageField}
          multiline={true}
        />
        <Pressable onPress={saveMessage} style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </Pressable>
      </View>
    </Screen>
  )
})
