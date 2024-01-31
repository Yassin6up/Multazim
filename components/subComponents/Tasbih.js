import { View, Text , StyleSheet , Pressable } from 'react-native'

import { useState , useEffect } from 'react'

const Tasbih = () => {
  const [ tasbih , setTasbih ] = useState(0)
  const [tasbihWoords , setTasbihWoords] = useState([
    "سبحان الله",
    "الحمد لله",
    "لا اله الا الله",
    "الله اكبر",
    "لا حول ولا قوة الا بالله",
  ])
  const [index , setIndex] = useState(2)
  // Add a new word to the list when pressing the button

const handelClick = ()=>{
  
  if(index === tasbihWoords.length - 1){
    setIndex(0)
  }else{
    setIndex(index + 1)
  }
  setTasbih(pre=> pre+1)
}

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{tasbihWoords[index]}</Text>
      <Pressable style={styles.btn} onPress={handelClick}>
        <Text style={styles.btnText}>{tasbih}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    marginTop: 40 ,
    height:300,
    width : "100%",
    alignItems: "center",
    gap:30 , 
  },
  text:{
    color:"white",
    fontSize: 30,
    fontWeight: "bold",
    padding : 10,
    fontFamily : "InterExtraBold"

  },
  btn:{
    borderWidth: 3,
    borderColor : "white" ,
    width: 80,
    height: 80 ,
    padding : 10,
    borderRadius :50,
    display : 'flex',
    justifyContent :"center",
    alignItems: "center"
  },
  btnText : {
    fontSize : 28 ,
    color: "white",
    fontFamily : "InterExtraBold"
  }

})

export default Tasbih