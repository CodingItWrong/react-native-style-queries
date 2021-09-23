import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const useStyleQueries = require('./useStyleQueries');
const screenWidthMin = require('./queries/screenWidthMin');

export default function App() {
  const styles = useStyleQueries(styleConfig);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Red on small phones, blue on big phones.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styleConfig = {
  container: [
    {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  ],
  text: [
    {
      fontSize: 12,
      color: 'red',
    },
    screenWidthMin(375, {
      fontSize: 18,
      color: 'blue',
    }),
  ],
};
