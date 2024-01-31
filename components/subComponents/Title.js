import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Title = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position  : "absolute",
    top: 0

  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'snow',
    padding: 15,
    paddingHorizontal: 30,
    fontFamily: "InterSemiBold" ,
    borderBottomColor: 'snow',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
});

export default Title;
