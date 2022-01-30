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
}

const MESSAGE_THROTTLE_MS = 250;

const gun = Gun({ peers: ["http://drop.amii.moe:8765/gun"] })
const initialState = {
  messages: [],
}

function reducer(state, messages) {
  return {
    messages: [...messages],
  }
}
const width = Dimensions.get("window").width
const styles = StyleSheet.create({
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
    height: 70,
    width: width - 100,
  },
})
export const ChatScreen = observer(function ChatScreen() {
  // Pull in one of our MST stores
  const { user } = useStores()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { theme } = useTheme()
  const name = useRef("")

  let last_message_timestamp: number = 0
  let render_message_timeout: NodeJS.Timeout|null = null
  let message_queue = [];

  useEffect(() => {
    const messages = gun.get("messages");
    messages.map().once(m => receiveMessage(m))
  }, [])

  function receiveMessage(message) {
    if (message === null) {
      return
    }
    message_queue.push(message);
    if (render_message_timeout !== null) {
      return
    }

    // throttle render
    const ms = Date.now();

    let delay = Math.max(0, MESSAGE_THROTTLE_MS - (ms - last_message_timestamp));
    last_message_timestamp = ms;

    render_message_timeout = setTimeout(() => {
      dispatch(message_queue);
      render_message_timeout = null;
    }, delay);
  }

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
                <Text key={message.key}>
                  {message.name} : {message.message}
                </Text>
              ))}
          </View>
        </ScrollView>
      </>
      <KeyboardAvoidingView>
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
      </KeyboardAvoidingView>
      <View></View>
    </Screen>
  )
})
