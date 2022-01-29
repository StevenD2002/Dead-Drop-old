import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { navigate } from "../../navigators";
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const { user } = useStores();

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [formState, setFormState] = useState({
    username: "",
  })

  function login(event) {
    let username = formState.username;
    user.login(username);

    navigate("chat");

    event.preventDefault();
    return false;
  }

  function changeUsername(value) {
    setFormState({
      ...formState,
      username: value
    })
  }


  return (
    <Screen style={ROOT} preset="scroll">
      <form onSubmit={login}>
        <TextField placeholder="Display Name" value={formState.username} onChangeText={changeUsername}/>
        <Button text="Login" onPress={login}/>
      </form>
    </Screen>
  )
})
