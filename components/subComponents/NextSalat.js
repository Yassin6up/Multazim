import { View, Text , StyleSheet , Image } from 'react-native'
import { useState , useEffect } from 'react';
import React from 'react'
import { img1 , img2 , img3 , img4 , img5 , img6 } from '../images';

const NextSalat = ({nextPrayer}) => {

    const [salatName , setSalatName] = useState("")
    const [salatTime , setSalatTime] = useState("")
    const [img , setImg] = useState("");

    useEffect(()=>{

    console.log(nextPrayer.nextName)
    switch (nextPrayer.nextName) {
        case "fajr":
            setSalatName('الفجر')
            setSalatTime(nextPrayer.nextTime)
            setImg(img1)
            break;
        case "duher":
            setSalatName('الظهر')
            setSalatTime(nextPrayer.nextTime)
            setImg(img2)
            break;
        case "asr":
            setSalatName('العصر')
            setSalatTime(nextPrayer.nextTime)
            setImg(img3)
            break;
        case "maghrib":
            setSalatName('المغرب')
            setSalatTime(nextPrayer.nextTime)
            setImg(img4)
            break;
        case "isha":
                setSalatName('العشاء')
                setSalatTime(nextPrayer.nextTime)
                setImg(img5)
            break;
        default:
                setSalatName("أتممت الصلوات")
                setSalatTime("إلى النوم ")
                setImg(img6)
            break;
    }


} , [nextPrayer])

    return (
    <View style={styles.container}>
        <Text style={styles.nextText}>الصلاة التالية : </Text>
        <View style={styles.nextContent}>
            <Image source={img? img : img6} style={{width: 100 , height : 100}} />
            <View style={styles.nextDetails} >
                <Text style={styles.nextName}>{salatName}</Text>
                <Text style={styles.nextTime}>{ salatTime }</Text>
            </View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        width : "100%",
        height : 200,
        display : "flex",
        padding : 20
    },
    nextText:{
        color: "white" , 
        fontSize : 20 ,
        fontFamily: "InterSemiBold" ,
        fontWeight : '600'
    },
    nextContent : {
        width : "100%",
        height : 100,
        display : 'flex' ,
        flexDirection :"row"  , 
        gap : 50 ,
    },
    nextDetails :{
        display : "flex" , 
        flexDirection : "column" ,
        justifyContent : "space-between" , 
        padding : 10 , 
        width : "50%" , 
        alignItems : "flex-end" , 
    },
    nextName : {
        color: "white" , 
        fontSize : 20 ,
        fontFamily: "InterSemiBold" ,
        fontWeight : '600',

    },
    nextTime : {
        color: "white" , 
        fontSize : 30 ,
        fontFamily: "InterSemiBold" ,
        fontWeight : '600',
    }
})




export default NextSalat