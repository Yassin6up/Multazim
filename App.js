import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store/store.js'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSkipWelcome } from './store/states/dataSlice';
import Home from './components/screens/Home';
import Welcome from './components/screens/Welcome';
import checkPrayerTimes from './components/PrayerTimesUtils.js';
import { setStoredData, getStoredData } from './components/DataStorage.js';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

const TASK_NAME = 'checkPrayerTimesTask';

// Define the background task
TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(`Background task "${TASK_NAME}" failed:`, error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }

  const { today, prayerSettings } = getStoredData()
  try {
    
    checkPrayerTimes(today, prayerSettings);
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error(`Background task "${TASK_NAME}" failed:`, error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});




export default function App() {
  const [latitude, setLati] = useState(null);
  const [longitude, setLong] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latitudeString = await AsyncStorage.getItem('latitude');
        const longitudeString = await AsyncStorage.getItem('longitude');

        // Parse latitude and set state
        const latitude = latitudeString !== null ? JSON.parse(latitudeString) : null;
        setLati(latitude);

        // Parse longitude and set state
        const longitude = longitudeString !== null ? JSON.parse(longitudeString) : null;
        setLong(longitude);
      } catch (e) {
        console.log(e);
      }
    };

    // Fetch data initially
    fetchData();

    // Set up an interval to fetch data every 5 seconds if data is null
    const fetchDataInterval = setInterval(() => {
      if (latitude === null && longitude === null) {
        fetchData();
      }
    }, 5000);

    return () => clearInterval(fetchDataInterval);
  }, [latitude, longitude]);

  console.log("From app:", longitude, latitude);

  // Register the background task
  useEffect(() => {
    BackgroundFetch.registerTaskAsync(TASK_NAME, {
      minimumInterval: 1,
      stopOnTerminate: false,
      startOnBoot: true,
    });

    return async () => {
      // Unregister the background task on component unmount
      await BackgroundFetch.unregisterTaskAsync(TASK_NAME);
    };
  }, []);

console.log("form app : " , longitude , latitude)

  const [fontsLoaded] = useFonts({
    InterRegular: require('./assets/fonts/Cairo-Regular.ttf'),
    InterBold: require('./assets/fonts/Cairo-Bold.ttf'),
    InterBlack: require('./assets/fonts/Cairo-Black.ttf'),
    InterLight: require('./assets/fonts/Cairo-Light.ttf'),
    InterSemiBold: require('./assets/fonts/Cairo-SemiBold.ttf'),
    InterMedium: require('./assets/fonts/Cairo-Medium.ttf'),
    InterExtraBold: require('./assets/fonts/Cairo-ExtraBold.ttf'),
  });
  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
          <StatusBar style="light" animated={true}/>
          {longitude && latitude ? <Home adhanData={{ longitude : longitude, latitude : latitude }} /> : <Welcome /> }
        
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D3B40',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
