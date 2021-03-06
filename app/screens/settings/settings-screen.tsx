import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, TouchableOpacity, View, Image } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { TextInput } from "react-native-gesture-handler"
import { navigate } from "../../navigators"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.darkGrey,
  flex: 1,
}

const handleNavigate = () => {
  navigate("chat")
}

const styles = StyleSheet.create({
  header: {
    color: "#e6e6e6",
    fontSize: 40,
    fontFamily: "Futura",
    alignSelf: "center",
    marginTop: 40,
  },

  title: {
    color: "#e6e6e6",
    fontSize: 25,
    fontFamily: "Futura",
    marginTop: 70,
    marginBottom: 15,
    alignSelf: "center",
  },

  inputField: {
    backgroundColor: "#e6e6e6",
    height: 40,
    width: 350,
    alignSelf: "center",
  },

  TouchableOpacity: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 80,
    height: 50,
    width: 200,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#0167b1",
  },

  TouchableOpacityBackButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 70,
    height: 50,
    width: 200,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#0167b1",
  },
  logo: {
    height: 250,
    width: 300,
    margin: "auto",
    resizeMode: "stretch",
    alignSelf: "center",
  },
})

export const SettingsScreen = observer(function SettingsScreen() {
  // Pull in one of our MST stores
  const { user } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [formState, setformState] = useState({
    name: "",
  })
  const onChangeName = (e) => {
    setformState({
      ...formState,
      name: e,
    })
  }
  const handleChangeName = () => {
    if (user.setUsername(formState.name)) {
      navigate("chat")
    }
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Settings" style={styles.header} />

      <Text text="Change Username" style={styles.title} />
      <TextInput onChangeText={onChangeName} style={styles.inputField} />

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.TouchableOpacity}
        onPress={handleChangeName}
      >
        <View>
          <Text
            style={{
              fontSize: 25,
              color: color.palette.offWhite,
              alignSelf: "center",
              marginTop: 5,
              fontWeight: "500",
              fontStyle: "normal",
            }}
          >
            Done!
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.TouchableOpacityBackButton}
        onPress={handleNavigate}
      >
        <View>
          <Text
            style={{
              fontSize: 25,
              color: color.palette.offWhite,
              alignSelf: "center",
              marginTop: 5,
              fontWeight: "500",
              fontStyle: "normal",
            }}
          >
            Back
          </Text>
        </View>
      </TouchableOpacity>

      <Image
        source={require("../../../assets/images/DeadDropTransparent.png")}
        style={styles.logo}
      />
    </Screen>
  )
})

//    shadowOpacity: .5,
//textShadowColor: "#0167b1",
//textShadowRadius: 5

//    shadowOpacity: 1,
//textShadowColor: "#0167b1",
//textShadowRadius: 5,
