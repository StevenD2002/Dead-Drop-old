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
import { navigate } from "../../navigators"
import { ScrollView } from "react-native-gesture-handler"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.grey,
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
    margin: "auto",
    borderRadius: 10,
    maxHeight: 40,
    padding: 10,
    width: 100,
  },
  buttonText: {
    alignSelf: "center",
    color: color.palette.white,
    margin: "auto",
  },
  message: {},
  screen: {},
  inputRow: {
    flexDirection: "row",
    height: 40,
  },
  messageField: {
    padding: 10,
    width: width - 100,
  },
})
export const ChatScreen = observer(function ChatScreen() {
  // Pull in one of our MST stores
  const { user } = useStores()
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
      message: "",
    })
  }
  const scrollViewRef = useRef()
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={styles.screen}>
        <>
          <ScrollView
            keyboardDismissMode="on-drag"
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          >
            {state.messages.map((message) => (
              <Text key={message.key} style={styles.message}>
                {message.name}: {message.message}
              </Text>
            ))}
          </ScrollView>
        </>

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
    </Screen>
  )
})
