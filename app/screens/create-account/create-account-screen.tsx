import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, Pressable, Image } from "react-native"
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
    color: color.palette.lightGrey,
    margin: 20,
    fontSize: 50,
    width: "100%",
  },
  font: {
    fontSize: 25,
    color: color.palette.white,
  },
  button: {
    alignItems: "center",
    margin: "auto",
    backgroundColor: color.palette.blue,
    maxHeight: 50,
    padding: 10,
    paddingLeft: 10,
    width: 100,
    borderRadius: 10,
  },
  center: {
    alignItems: "center",
    backgroundColor: color.palette.grey,
    height: "100%",
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: "stretch",
  },
})

export const CreateAccountScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const { user } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  })

  function login(event) {
    let username = formState.username
    let password = formState.password

    navigate("chat")
  }

  function changeUsername(value) {
    setFormState({
      ...formState,
      username: value,
    })
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <SafeAreaView style={styles.center}>
        <TextInput
          onChangeText={changeUsername}
          value={formState.username}
          style={styles.loginForm}
          placeholder="Username..."
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
        />
        <TextInput
          onChangeText={changePassword}
          value={formState.password}
          style={styles.loginForm}
          placeholder="Password..."
          placeholderTextColor="rgba(255, 255, 255, 0.8)"
        />
        <Pressable onPress={createAccount} style={styles.button}>
          <Text style={styles.font}>create account</Text>
        </Pressable>
        <Image
          source={require("../../../assets/images/DeadDropTransparent.png")}
          style={styles.image}
        />
      </SafeAreaView>
    </Screen>
  )
})
