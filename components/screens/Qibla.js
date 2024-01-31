import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { Qibla } from 'adhan'; // Import Qibla from adhan
import Title from '../subComponents/Title';
import { qibla } from '../images';

const QiblaPage = ({ latitude, longitude }) => {
  const [magnetometerData, setMagnetometerData] = useState({});
  const [qiblaDirection, setQiblaDir] = useState(0);

  useEffect(() => {
    const subscription = Magnetometer.addListener((result) => {
      setMagnetometerData(result);
    });

    Magnetometer.setUpdateInterval(100);

    return () => {
      subscription.remove();
    };
  }, []);

  // Calculate the Qibla direction based on the device's magnetometer data
  const calculateQiblaDirection = () => {
    if (latitude && longitude && magnetometerData) {
      const userHeading = Math.atan2(magnetometerData.y, magnetometerData.x) * (180 / Math.PI);
      const qiblaDirection = Qibla({
        latitude: latitude,
        longitude: longitude,
      });
      const adjustedQiblaDirection = qiblaDirection - userHeading;
      setQiblaDir(`${Math.round(adjustedQiblaDirection)}`);
    }
  };
  useEffect(() => {
    calculateQiblaDirection();
  }, [latitude, longitude, magnetometerData]);



  return (
    <View style={styles.container}>
      <Title text="القبلة" />

      <Animated.Image
        source={qibla}
        style={[
          styles.arrow,
          {
            transform: [
              {
                rotate: `${qiblaDirection}deg`,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    width: 280,
    height: 250,
  },
});

export default QiblaPage;
