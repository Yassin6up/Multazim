import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Title from '../subComponents/Title';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSetting } from '../../store/states/dataSlice';
import { useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Vibration } from 'react-native';



const Settings = () => {
  const [toggle, setToggle] = useState(false);
  const [fajer, setFajer] = useState(true);
  const [duhr, setDuhr] = useState(true);
  const [asr, setAsr] = useState(true);
  const [maghrib, setMaghrib] = useState(true);
  const [isha, setIsha] = useState(true);


  const [vibration , setVibration] = useState(true)

  const dispatch = useDispatch()
  useEffect(() => {
    AsyncStorage.getItem('fajr').then((data) => {
      setFajer(data === 'true');
    });

    AsyncStorage.getItem('duhr').then((data) => {
      setDuhr(data === 'true');
    });

    AsyncStorage.getItem('asr').then((data) => {
      setAsr(data === 'true');
    });

    AsyncStorage.getItem('maghrib').then((data) => {
      setMaghrib(data === 'true');
    });

    AsyncStorage.getItem('isha').then((data) => {
      setIsha(data === 'true');
    });
    AsyncStorage.getItem('vibration').then((data) => {
      setVibration(data === 'true');
    });

  }, [toggle]);

  const handleTurn = (id, value) => {
    AsyncStorage.setItem(id, value.toString()).then(() => {
      console.log(`Setting ${id} has been updated to ${value}`);
    });


    setToggle(!toggle);

    dispatch(setSetting())
  };



  const handelVibration = (value)=>{
    AsyncStorage.setItem("vibration", value.toString()).then(() => {
      console.log(`vibration is : ${value}`);
    });
    setToggle(!toggle);
  }

  return (
    <ScrollView style={styles.container}   showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false} >
      <Title text="الإعدادات" />

      <View style={styles.salawat}>
        <Text style={styles.Titles}>إعدادات الأذان</Text>

        <View style={styles.salawatContainer}>
          <View style={styles.oneSalat}>
            <Pressable onPress={() => handleTurn('fajr', !fajer)}>
              <Ionicons name={fajer ? 'notifications-sharp' : 'notifications-off-sharp'} size={24} color={ fajer ? "#FFD700" : "snow"} />
            </Pressable>
            <Text style={styles.salatText}>الفجر</Text>
          </View>
          <View style={styles.oneSalat}>
            <Pressable onPress={() => handleTurn('duhr', !duhr)}>
              <Ionicons name={duhr ?  'notifications-sharp' : 'notifications-off-sharp'} size={24} color={ duhr ? "#FFD700" : "snow"} />
            </Pressable>
            <Text style={styles.salatText}>الظهر</Text>
          </View>
          <View style={styles.oneSalat}>
            <Pressable onPress={() => handleTurn('asr', !asr)}>
              <Ionicons name={asr ? 'notifications-sharp' : 'notifications-off-sharp' } size={24} color={ asr ? "#FFD700" : "snow"} />
            </Pressable>
            <Text style={styles.salatText}>العصر</Text>
          </View>
          <View style={styles.oneSalat}>
            <Pressable onPress={() => handleTurn('maghrib', !maghrib)}>
              <Ionicons name={maghrib ? 'notifications-sharp' : 'notifications-off-sharp' } size={24} color={ maghrib ? "#FFD700" : "snow"} />
            </Pressable>
            <Text style={styles.salatText}>المغرب</Text>
          </View>
          <View style={styles.oneSalat}>
            <Pressable onPress={() => handleTurn('isha', !isha)}>
              <Ionicons name={isha ? 'notifications-sharp' : 'notifications-off-sharp'} size={24} color={ isha ? "#FFD700" : "snow"} />
            </Pressable>
            <Text style={styles.salatText}>العشاء</Text>
          </View>
        </View>

      </View>


      <View style={styles.otherSettings}>
      <Pressable onPress={() => handelVibration(!vibration)}>
          <MaterialCommunityIcons name= {vibration? "vibrate" :"vibrate-off"} size={40} color={vibration? "green" : "snow"} />
      </Pressable>
        <Text  style={styles.salatText} >الاهتزاز عند الأذان</Text>
      </View>
      

<View style={styles.credit}>
    <Text style={styles.version}> v1.0</Text>
    <Text style={styles.owner}> made with ❤ by Yassine</Text>
</View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  salawat: {
    width: '100%',
    display: 'flex',
    gap: 10,
    marginTop: 100,
    padding: 10,
  },
  Titles: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
    fontFamily: 'InterSemiBold',
  },
  oneSalat: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  salatText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'right',
    fontFamily: 'InterMedium',
  },
  salawatContainer: {
    marginTop: 5,
    padding: 10,
    gap: 5,
    display: 'flex',
  },
  otherSettings : {
    width :"100%" , 
    display : "flex" ,
    justifyContent : "center" ,
    alignItems : "center"  , 
  }, 

  credit: {
    width: '100%',
    height:130 ,
    display: 'flex',
    alignItems: 'center',
    marginTop: 50,
  },
  owner:{
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'InterSemiBold',
  },
  version: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'InterSemiBold',
  }


});

export default Settings;
