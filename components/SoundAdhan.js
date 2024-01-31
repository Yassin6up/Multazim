// SoundPlayer.js

import { Audio } from 'expo-av';
import { triggerNotification } from './Notification';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
let sound;

export const playSound = async () => {
  console.log('Loading Sound');

  // Unload previous sound if it exists
  if (sound) {
    await sound.stopAsync();
    await sound.unloadAsync();
  }

  // Load the new sound
  sound = new Audio.Sound();
  await sound.loadAsync(require('../assets/adhansSounds/adhan1.mp3'));

  // Set the options for playing in the background
  await Audio.setAudioModeAsync({
    staysActiveInBackground: true,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
  });

  // Play the sound in a loop
  await sound.setIsLoopingAsync(false);
  await sound.playAsync();
  sound.setOnPlaybackStatusUpdate(async (status) => {

    if(status.isPlaying){
      AsyncStorage.getItem('vibration').then((data) => {
        if(data === "true"){
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      });
      console.log(status.volume)
    }
  })

  triggerNotification();
};

export const stopSound = async () => {
  if (sound) {
    await sound.stopAsync();
    await sound.unloadAsync();
    sound = null;
  }
};

export default playSound;
