import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { PrayerTimes, Coordinates, CalculationMethod } from 'adhan';
import { LinearGradient } from 'expo-linear-gradient';
import backgroundImg from "../../assets/background.jpg";
import Main from './Main';
import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { triggerNotification } from './../Notification';
import playSound, { stopSound } from '../SoundAdhan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { useSelector, useDispatch } from 'react-redux';
import { setAdhan  , setPrayerData } from '../../store/states/dataSlice';
import HijriConverter from 'hijri-converter';
import moment from 'moment/moment';
import SystemSetting from 'react-native-system-setting'
import checkPrayerTimes from '../PrayerTimesUtils';
import { setStoredData , getStoredData } from '../DataStorage';

const TASK_NAME = 'checkPrayerTimesTask';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    
  }),
});










const Home = (props) => {
  const [today, setToday] = useState({});
  
  const [hijri, setHijri] = useState();
  const [nextPrayer, setNextPrayer] = useState({});

  let prayerSettings = {
    fajr: true,
    duhr: true,
    asr: true,
    maghrib: true,
    isha: true,
  };


  (async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
  })();

  const toggelSettings = useSelector((state)=>state.adhan.chnageSetting)

  const dispatch = useDispatch()




  const PrayerNames = ["fajr", "duhr", "asr", "maghrib", "isha"];


  useEffect(() => {
    const updateSettings = async () => {
      try {
        const newPrayerSettings = {};
        for (const name of PrayerNames) {
          const data = await AsyncStorage.getItem(name);
          newPrayerSettings[name] = data === 'true';
        }
        prayerSettings = { ...prayerSettings, ...newPrayerSettings };
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    updateSettings();
  }, [toggelSettings]);
  

  

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual location coordinates
        const latitude = props.adhanData.latitude;
        const longitude = props.adhanData.longitude;
        const params = CalculationMethod.UmmAlQura();
        const coordinates = new Coordinates(latitude, longitude);
        const date = new Date();
        const prayerTimesObj = new PrayerTimes(coordinates, date, params);
        const next = prayerTimesObj.nextPrayer()
        setNextPrayer({ nextName: next, nextTime: moment(prayerTimesObj.timeForPrayer(next)).format('HH:mm') })
        setToday({
          timings: {
            Fajr: moment(prayerTimesObj.fajr).format('HH:mm'),
            Dhuhr: moment(prayerTimesObj.dhuhr).format('HH:mm'),
            Asr: moment(prayerTimesObj.asr).format('HH:mm'),
            Maghrib: moment(prayerTimesObj.maghrib).format('HH:mm'),
            Isha: moment(prayerTimesObj.isha).format('HH:mm'),
          },
        })
        





      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    };

    // Fetch data initially
    fetchData();

    // Set up an interval to fetch data every 5 seconds if data is null
    const fetchDataInterval = setInterval(() => {
      if (today === null) {
        fetchData();
      }
    }, 5000);
    // Cleanup the interval on component unmount
    return () => clearInterval(fetchDataInterval);
  }, [props ]);

 






  useEffect(() => {
    // Check prayer times every minute (adjust the interval as needed)
    setStoredData({ today :today, prayerSettings: prayerSettings });

    const interval = setInterval(() => {
      checkPrayerTimes(today, prayerSettings);
    }, 60000);
    return async () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array to run the effect only once during component mount



  useEffect(() => {
    // Subscribe to receive notifications when the app is running
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      stopSound()
    });
    // Cleanup the subscription when the component unmounts
    return () => subscription.remove();
  }, []);

  if (!today) return null

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
        <Main todayAdhan={today} nextSalat={nextPrayer} latitude={props.adhanData.latitude}  longitude={props.adhanData.longitude} />
      </ImageBackground>
    </SafeAreaView>
  )
}








const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D3B40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: -1,

  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});


export default Home