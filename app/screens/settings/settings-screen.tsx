import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, TouchableOpacity, View, Image } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { TextInput } from "react-native-gesture-handler"
import { navigate } from "../../navigators"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.darkGrey,
  flex: 1,
}

const handleNavigate =()=> {
  navigate("chat")
}

const styles= StyleSheet.create({
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

  TouchableOpacity:{
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:5,
    marginTop: 80,
    height: 50,
    width: 200,
    alignSelf: "center",
    borderWidth: 2,
    borderColor:'white',
    backgroundColor: "#0167b1",
  },

  TouchableOpacityBackButton:{
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:5,
    marginTop: 70,
    height: 50,
    width: 200,
    alignSelf: "center",
    borderWidth: 2,
    borderColor:'white',
    backgroundColor: "#0167b1",
  }
})

const onPressHandler=()=>{
  console.log('Button Pressed!')
}

export const SettingsScreen = observer(function SettingsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
const onChangeName = () => {
  console.log("hello")
}

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Settings" style={styles.header} />

      <Text text="Change Username" style={styles.title} />
      <TextInput onChangeText={onChangeName} style={styles.inputField} />
     
      <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacity} onPress={onPressHandler}>
        <View>
          <Text style={{fontSize:25, color: color.palette.offWhite, alignSelf: "center", marginTop:5, fontWeight: "500", fontStyle: "normal"}}>Done!</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityBackButton} onPress={handleNavigate}>
        <View>
          <Text style={{fontSize:25, color: color.palette.offWhite, alignSelf: "center", marginTop:5, fontWeight: "500", fontStyle: "normal"}}>Back</Text>
        </View>
      </TouchableOpacity>

      <Image source={require("../../../assets/images/DeadDropTransparent2.png")} />

    </Screen>
  )
})

//    shadowOpacity: .5,
//textShadowColor: "#0167b1",
//textShadowRadius: 5

//    shadowOpacity: 1,
//textShadowColor: "#0167b1",
//textShadowRadius: 5,