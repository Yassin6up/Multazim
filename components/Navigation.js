import { View, Text , StyleSheet , Pressable } from 'react-native'

import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { setNavigate } from '../store/states/dataSlice'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';




const Navigation = () => {
    const dispatch = useDispatch()
    const navigate = useSelector((state)=> state.adhan.navigation)

  return (
    <View style={styles.container}>
        <View style={ navigate === "home" ?  styles.tabActive :  styles.tab }>
            <Pressable onPress={()=> dispatch(setNavigate("home"))}>
                <AntDesign name="home" size={30} color={ navigate === "home" ?  "#332941" : "white"  } />
            </Pressable>
        </View>
        <View style={ navigate === "qibla" ?  styles.tabActive :  styles.tab }>
            <Pressable onPress={()=> dispatch(setNavigate("qibla"))}>
            <FontAwesome name="arrows" size={30} color={ navigate === "qibla" ?  "#332941" : "white"  } />
            </Pressable>
        </View>
        <View style={ navigate === "settings" ?  styles.tabActive :  styles.tab }>
            <Pressable onPress={()=> dispatch(setNavigate("settings"))}>
                <Ionicons name="settings-outline" size={30} color={ navigate === "settings" ?  "#332941" : "white"  } />
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        position : "absolute" , 
        bottom : 0 ,
        left : 0 , 
        width : "100%" , 
        height : 50 , 
        display : 'flex' , 
        flexDirection : "row" , 
        justifyContent : 'space-between'
    }, 
    tab : {
        width : "33%" , 
        height : "100%", 
        display : 'flex' , 
        justifyContent : "center", 
        alignItems : "center"
    } ,
    text : {
        color : "white" , 
        fontSize : 20  , 
    } , 
    tabActive:{
        width : "33%" , 
        height : "100%", 
        display : 'flex' , 
        justifyContent : "center", 
        alignItems : "center" , 
        backgroundColor : "#BFCFE7",
        borderRadius : 10
    }

})

export default Navigation