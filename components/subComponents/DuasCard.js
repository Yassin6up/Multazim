import { View, Text, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';



const DuasCard = () => {
  const [currentDuas, setCurrentDuas] = useState();
  const [progressWidth] = useState(new Animated.Value(0));
  const [change, setChange] = useState(false);
  const duas = useSelector((state) => state.adhan.duas);



  useEffect(() => {
    let index = Math.round(Math.random() * duas.length);
    setCurrentDuas(duas[index]?.duas);
  }, [duas, change]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChange((prev) => !prev);
    },10000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let startTime = new Date().getTime();
    let endTime = startTime + 10000; // 30s interval

    const updateProgress = () => {
      let currentTime = new Date().getTime();
      let elapsedTime = currentTime - startTime;
      let progress = (elapsedTime / 10000) * 100; // Calculate progress percentage

      // Use modulo operator to reset progress after reaching 100%
      progress = progress % 100;

      Animated.timing(progressWidth, {
        toValue: progress,
        duration: 1000, // 1000 milliseconds for smooth animation
        useNativeDriver: false, // Set to true if using the native driver is supported
      }).start();
    };

    const progressInterval = setInterval(updateProgress, 1000); // Update every second

    // Clear the interval when the component is unmounted or when the 30s interval is complete
    return () => {
      clearInterval(progressInterval);
      progressWidth.setValue(0); // Reset progress width when the interval is complete
    };
  }, [progressWidth]);

  return (
    <View style={styles.parent}>
    <View style={styles.container}>
      <Text style={styles.text}>{currentDuas}</Text>
      <Animated.View
        style={[
          styles.progress,
          {
            width: progressWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      >
        <LinearGradient
        colors={['#F8EDFF', '#BFCFE7', '#525CEB']} // Blue to green to yellow gradient colors
        start={{ x: 0, y: 0 }} // Starting point of the gradient
        end={{ x: 1, y: 0 }} // Ending point of the gradient
        style={{width: "100%" , height:"100%" , borderRadius : 10 }}
      />
      </Animated.View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    alignItems: 'center',
  },
  container: {
    width: '90%',
    height: 200,
    borderWidth: 2,
    position: 'relative',
    borderColor: '#F8EDFF',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding : 10
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'InterMedium',
  },
  progress: {
    height: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderRadius : 10
  },
});

export default DuasCard;
