import * as React from "react"
import { Button, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { themeDark as color, typography } from "../../theme"
import { flatten } from "ramda"
import { IGunChainReference } from "gun/types/chain"
import uuid from "react-native-uuid"
require('gun/lib/unset.js')
import { useEffect } from "react"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface ClearAllMsgsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  gun: IGunChainReference<any, any, "pre_root">
}

/**
 * Describe your component here
 */
export const ClearAllMsgs = observer(function ClearAllMsgs(props: ClearAllMsgsProps) {
  const { style, gun } = props
  const styles = flatten([CONTAINER, style])

  const [del, setDel] = React.useState("clear all messages")
  
  const clearAll = () => {
    setDel("deleting")
    let allmsg = gun.get("messages").map().on(data =>{
      console.log(data)
      let d = gun.get("messages").get(data).put({
        name: "deleted",
        message: "deleted",
        createdAt: "deleted",
        key: uuid.v4(),
      });
      console.log(d)
      setDel("clear all messages")
    })
  }

  return (
    <View style={styles}>
      <Button onPress={clearAll} title={del}></Button>
    </View>
  )
})
