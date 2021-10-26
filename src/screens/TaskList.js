import React from 'react'
import {View, Text, ImageBackground, StyleSheet } from 'react-native'
import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment'
import "moment/locale/pt-br"
import commomStyles from '../commomStyles'

export default props => {
    const today = moment().locale('pt-br').format('dddd, D [de] MMMM')
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.titleContainer} source={todayImage}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <Text>Tarefa 01</Text>
          <Text>Tarefa 02</Text>
          <Text>Tarefa 03</Text>
          <Text>Tarefa 04</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5733",
  },
  titleContainer: {
    flex: 2,
    backgroundColor: "#aa1",
  },
  titleBar: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 8,
  },
  taskList: {
    flex: 8,
    backgroundColor: "#ba6",
  },
  title: {
      fontFamily: commomStyles.fontFamily,
      fontSize: 48,
      color: commomStyles.colors.secondary,

  },
  subtitle: {
      fontFamily: commomStyles.fontFamily,
      fontSize: 20,
      color: commomStyles.colors.secondary,

  }  
});