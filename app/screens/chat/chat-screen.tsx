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
import { formatDate } from "../../utils/formatting"
import uuid from "react-native-uuid"
import { useTheme } from "@react-navigation/native"
import { ScrollView } from "react-native-gesture-handler"
import { navigate } from "../../navigators"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { SafeAreaView } from "react-native-safe-area-context"
const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: "#404040",
}

const MESSAGE_THROTTLE_MS = 250

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
  messageGroup: {
    marginBottom: 10,
    padding: 10,
  },
  settingsButton: {
    backgroundColor: color.palette.blue,
    alignItems: "center",
    borderRadius: 100,
    right: 10,
    padding: 10,
    position: "absolute",
    zIndex: 3,
  },
  textDate: {
    color: color.palette.white,
    opacity: 0.8,
  },
  textHeader: {
    display: "flex",
    flexDirection: "row"
  },
  textMessage: {
    color: color.palette.white,
  },
  textName: {
    fontWeight: "bold",
    color: color.palette.white,
  },
})
export const ChatScreen = observer(function ChatScreen() {
  // Pull in one of our MST stores
  const { user } = useStores()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { theme } = useTheme()
  const name = useRef("")

  let last_message_timestamp: number = 0
  let render_message_timeout: NodeJS.Timeout | null = null
  let message_queue = []

  useEffect(() => {
    const messages = gun.get("messages")
    messages.map().once((m) => receiveMessage(m))
  }, [])

  function receiveMessage(message) {
    if (!message?.message || !message?.name) {
      return
    }
    message_queue.push(message)
    if (render_message_timeout !== null) {
      return
    }

    // throttle render
    const ms = Date.now()

    let delay = Math.max(0, MESSAGE_THROTTLE_MS - (ms - last_message_timestamp))
    last_message_timestamp = ms

    render_message_timeout = setTimeout(() => {
      dispatch(message_queue)
      render_message_timeout = null
    }, delay)
  }

  const [formState, setFormState] = useState({
    name: "",
    message: "",
  })

  const [shouldScrollDown, setShouldScrollDown] = useState(true)

  function onChangeMessage(e) {
    setFormState({
      ...formState,
      message: e,
    })
  }

  const onPressHandler = () => {
    navigate("settings")
  }

  const timeStamp = new Date().toISOString()
  function saveMessage() {
    let message = formState.message.trim()
    if (message.length == 0) {
      return
    }
    const messages = gun.get("messages")
    console.log(formState.message)
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
    setShouldScrollDown(true)
  }
  const scrollViewRef = useRef()

  function scrollToEnd(ref: React.MutableRefObject<ScrollView>) {
    if (shouldScrollDown == true) {
      ref.current.scrollToEnd({ animated: true })
    }
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <>
      <Screen style={ROOT} preset="scroll">
        <Pressable onPress={onPressHandler} style={styles.settingsButton}>
          <FontAwesomeIcon icon={faCog} size={20} color={color.palette.white} />
        </Pressable>
        <>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() => scrollToEnd(scrollViewRef)}
            onScroll={() => setShouldScrollDown(false)}
            scrollEventThrottle={100}
          >
            <View>
              {state?.messages.map((message) => (
                <View key={message.key} style={styles.messageGroup}>
                  <View style={styles.textHeader}>
                    <Text style={styles.textName}>{message.name}: </Text>
                    <Text style={styles.textDate}>{formatDate(message.createdAt)}</Text>
                  </View>
                  <Text style={styles.textMessage}>{message.message}</Text>
                </View>
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
    </>
  )
})
