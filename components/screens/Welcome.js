import { View, TouchableOpacity, Text, StyleSheet, Image, Button , ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import ImageIcon from '../../assets/mosque.png';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSkipWelcome } from '../../store/states/dataSlice';
import { useDispatch } from 'react-redux';


const Welcome = () => {
  const [lati, setLatitude] = useState(null);
  const [long, setLongitude] = useState(null);
  const [started, setStart] = useState(false);
  const [loader , setLoader]= useState(false)
  const dispatch = useDispatch()
  const [permission, setPermission] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const requestLocationPermission = async () => {

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        getCurrentLocation();
        setPermission(true);
      } else {
        setPermission(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      console.log(latitude, longitude);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestLocationPermission();
    return () => {
      // Component will unmount, set isMounted to false
      setIsMounted(false);
    };
  }, []);

  const onPressStart = () => {
    if (!permission) {
      requestLocationPermission();
    } else {
      if (!lati || !long) {
        getCurrentLocation();
      } else {
        setLoader(true)
        setStart((pre) => !pre);
      }
    }
  };
  async function insertData(name, value) {
    try {
      console.log("start inserting")
      

      await AsyncStorage.setItem(name, JSON.stringify(value))
      console.log("end of enserting")
    } catch (e) {
      setLoader(false)
      console.log(e)
    }
  }


  useEffect(() => {

    insertData("longitude", long)
    insertData("latitude", lati)

  }, [started]);



  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={ImageIcon} style={styles.imageIcon} />
      </View>
      <Text style={styles.welcomeMsg}>مرحبا بك مع ملتزم </Text>
      <Text style={styles.descMessage}>إن الصلاة كانت على المؤمنين كتابا موقوتا</Text>
      <TouchableOpacity onPress={onPressStart} title="Leeeea" style={styles.StartButton} accessibilityLabel="Start" >
        { loader ? <ActivityIndicator size="large" color="white" /> :<Text style={styles.buttonText}>فلنبدأ</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#3D3B40',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  imageIcon: {
    width: 200,
    height: 200,
  },
  input: {
    width: 200,
    padding: 5,
    borderBottomWidth: 3,
    borderColor: '#332941',
    borderRadius: 10,
  },
  welcomeMsg: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: "InterExtraBold"

  },
  imgContainer: {
    padding: 40,
    backgroundColor: "#525CEB",
    borderRadius: 10,
    marginBottom: 20,
    borderColor: "#BFCFE7",
    borderWidth: 3,
  },
  descMessage: {
    color: 'gray', // Set the color to gray for the subtitle
    fontFamily: "InterMedium"

  },
  StartButton: {
    padding: 20,
    width: "60%",
    backgroundColor: "#525CEB",
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "InterBold",
  }
});
// #525CEB

export default Welcome;
