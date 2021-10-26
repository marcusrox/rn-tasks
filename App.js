// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from "react-native";
import AppLoading from "expo-app-loading"
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import TaskList from './src/screens/TaskList';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
        <SafeAreaView style={styles.container}>
        <TaskList></TaskList>
        <StatusBar />
        </SafeAreaView>
    )
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
