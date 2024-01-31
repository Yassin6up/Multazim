import { StyleSheet, View, Text , Image } from 'react-native';
import React from 'react'
import { img1 , img2 , img3 , img4 , img5 } from '../images';

function Card({ data , i }) {
  const timingImages = [img1 , img2 , img3 , img4 , img5]

  const time = Object.values(data)
  const salatName = Object.keys(data)


  return (
    <View style={styles.cardContainer}>
     <View style={styles.viewContainer2}>
      <Image  source={timingImages[i]} style={styles.imag}/>
    </View>
       <View style={styles.viewContainer}>
         <Text style={styles.text}>{salatName}  </Text>
         <Text style={styles.text}>{time}  </Text>
       </View>
    </View>
  )

}


const styles = StyleSheet.create({
  cardContainer: {
    width: "auto",
    height: "80%",
    backgroundColor: "#332941",
    borderRadius: 20,
    margin: '10px',
    marginLeft: 5 , 
    marginTop: 20,
    flexDirection: 'row', // Set the direction to 'row'
    alignContent : "center" , 
    justifyContent: 'center', 
    
  },
  text: {
    color: "white",
    fontSize: 30,
    fontFamily: "InterMedium" ,
    textAlign : "right"

  },
  imag: {
    width: 100,
    height: 100

  } ,
  viewContainer : {
    // width : "60%" , 
    alignContent: 'center' , 
    justifyContent : "center",
    padding : 10 , 

  } , 
  viewContainer2 : {
    padding : 10 , 
    // width : "40%" , 
    alignContent: 'center' , 
    justifyContent : "center"
  }
})
export default Card