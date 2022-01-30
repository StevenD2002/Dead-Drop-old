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

  const [shouldScrollDown, setShouldScrollDown] = useState(true)

  function onChangeMessage(e) {
    setFormState({
      ...formState,
      message: e,
    })
  }
  const timeStamp = new Date().toISOString()
  function saveMessage() {
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
    <Screen style={ROOT} preset="scroll">
      <>
        <ScrollView
          keyboardDismissMode="interactive"
          ref={scrollViewRef}
          onContentSizeChange={() => scrollToEnd(scrollViewRef)}
          onScroll={() => setShouldScrollDown(false)}
          scrollEventThrottle={100}
        >
          <View>
            {state?.messages
              ?.filter((f) => {
                if (f.message && f.name && f.key) {
                  return f
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
