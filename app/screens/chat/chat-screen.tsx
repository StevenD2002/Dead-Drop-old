import React, { useEffect, useReducer, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Button,
  Pressable,
  TextInput,
  View,
  ViewStyle,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native"
import { Screen, Text } from "../../components"
import Gun from "gun"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import uuid from "react-native-uuid"
import { useTheme } from "@react-navigation/native"
import { ScrollView } from "react-native-gesture-handler"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: "#404040",
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
  bottom: {
    backgroundColor: color.palette.blue,
    padding: 15,
  },
  button: {
    alignItems: "center",
    margin: "auto",
    backgroundColor: color.palette.blue,
    maxHeight: 50,
    padding: 10,
    width: 100,
  },
  buttonText: {
    alignSelf: "center",
    color: color.palette.white,
    margin: "auto",
  },
  inputRow: {
    height: 50,
    bottom: 15,
    flexDirection: "row",
    borderColor: color.palette.blue,
    borderWidth: 4,
    zIndex: 1,
  },
  messageField: {
    backgroundColor: color.palette.white,
    height: 40,
    width: width - 100,
  },
  text: {
    color: color.palette.white,
  },
})
export const ChatScreen = observer(function ChatScreen() {
  // Pull in one of our MST stores
  const { user } = useStores()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { theme } = useTheme()
  const name = useRef("")

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
      name: user.username,
      message: formState.message,
      createdAt: timeStamp,
      key: uuid.v4(),
    })
    setFormState({
      name: "",
      message: "",
    })
  }
  const scrollViewRef = useRef()
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <>
        <ScrollView
          keyboardDismissMode="on-drag"
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          <View>
            {state?.messages
              .filter((m) => {
                if (m.message && m.name) {
                  return m
                }
              })
              .map((message) => (
                <Text key={message.key} style={styles.text}>
                  {message.name} : {message.message}
                </Text>
              ))}
          </View>
        </ScrollView>
      </>
      <KeyboardAvoidingView>
        <View style={styles.bottom}>
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
        </View>
      </KeyboardAvoidingView>
    </Screen>
  )
})
