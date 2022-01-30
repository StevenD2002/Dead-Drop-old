import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { navigate } from "../../navigators"
import { useStores } from "../../models"
import { color } from "../../theme"
import { TextInput } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

const ROOT: ViewStyle = {
  flex: 1,
}

const styles = StyleSheet.create({
  loginForm: {
    backgroundColor: color.palette.black,
    margin: 20,
  },
})

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const { user } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [formState, setFormState] = useState({
    username: "",
  })

  function login(event) {
    let username = formState.username
    user.login(username)

    navigate("chat")

    event.preventDefault()
    return false
  }

  function changeUsername(value) {
    setFormState({
      ...formState,
      username: value,
    })
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <SafeAreaView>
        <TextInput
          onChangeText={changeUsername}
          value={formState.username}
          style={styles.loginForm}
        />
        <Button text="Login" onPress={login} />
      </SafeAreaView>
    </Screen>
  )
})
