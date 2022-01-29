import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, TouchableOpacity, View } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { TextInput } from "react-native-gesture-handler"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.blue,
  flex: 1,
}

const styles= StyleSheet.create({
  header: {
    color: "#e6e6e6",
    fontSize: 35,
    fontFamily: "Futura",
    alignSelf: "center",
    marginTop: 40,
  },

  title: {
    color: "#e6e6e6",
    fontSize: 20,
    fontFamily: "Futura",
    marginTop: 70,
    marginBottom: 10,
    alignSelf: "center"
  },
  
  inputField: {
    backgroundColor: "#e6e6e6",
    height: 40,
    width: 350,
    alignSelf: "center",
  },

//  button: {
//    backgroundColor: "#000000",
//    marginTop: 40,
//    height: 50,
//    width: 300,
//    alignSelf: "center"
//  },

  TouchableOpacity:{
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:5,
    marginTop: 60,
    height: 50,
    width: 200,
    alignSelf: "center",
    borderColor:'white',
    backgroundColor: color.palette.offWhite
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
          <Text style={{fontSize:25, color: color.palette.blue, alignSelf: "center", marginTop:5, fontStyle: "italic"}}>Done!</Text>
        </View>
      </TouchableOpacity>

    </Screen>
  )
})

//      <Button title="Done" onPress={()=>{}} style={styles.button}/>
