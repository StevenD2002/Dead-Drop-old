/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect, useReducer } from "react"
import { SafeAreaView, TextInput, Text, Button } from "react-native"

import Gun from "gun"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

const gun = Gun({ peers: ["http://localhost:3000/gun"] })
const initialState = {
  messages: [],
}

function reducer(state, message) {
  return {
    messages: [...state.messages, message],
  }
}

/**
 * This is the root component of our app.
 */
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const messages = gun.get("messages")
    messages.map().on((m) => {
      dispatch({
        name: m?.name,
        message: m?.message,
        createdAt: m?.createdAt,
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
    })
    setFormState({
      name: "",
      message: "",
    })
  }
  // otherwise, we're ready to render the app
  return (
    <>
      <SafeAreaView>
        <TextInput onChangeText={onChangeName} placeholder={`Name`} value={formState.name} />
        {console.log(formState.name)}
        <TextInput
          onChangeText={onChangeMessage}
          placeholder={`Message`}
          value={formState.message}
        />
        <Button onPress={saveMessage} title="send message"></Button>
        {console.log(state.messages)}
        <>
          {state.messages.map((message) => (
            <Text key={message.createdAt}>
              {message.name}: {message.message}
            </Text>
          ))}
        </>
      </SafeAreaView>
    </>
  )
}
