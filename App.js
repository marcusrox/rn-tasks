// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";

import TaskList from './src/screens/TaskList';

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <TaskList></TaskList>

        <StatusBar />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
