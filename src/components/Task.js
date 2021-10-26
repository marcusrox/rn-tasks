import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import commonStyles from '../commonStyles';
import { Ionicons } from "@expo/vector-icons";
import moment from 'moment'
import 'moment/locale/pt-br'


export default props => {

    const doneOrNot = props.doneAt ? { textDecorationLine: 'line-through' } : {}
    const formatedDate = moment(props.doneAt ? props.doneAt : props.estimateAt)
      .locale("pt-br")
      .format("dddd, D [de] MMMM");
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
          <View style={styles.checkContainer}>
            {getCheckView(props.doneAt)}
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.desc, doneOrNot]}>{props.desc}</Text>
          <Text style={styles.date}>{formatedDate}</Text>
          {/* <Text>{props.doneAt + ""}</Text> */}
        </View>
      </View>
    );
}

function getCheckView(doneAt) {
    if (doneAt) 
        return (
          <View style={styles.done}>
            <Ionicons name="checkmark" size={20} color="#fff"></Ionicons>
          </View>
        );
    else
        return (
          <View style={styles.pending}>
            <Text></Text>
          </View>
        );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#667",
    borderBottomWidth: 1,
    alignItems: "center",
    padding: 10,
  },
  checkContainer: {
    width: "20%",
    alignItems: "center", // Alinhamento do main axis
    justifyContent: "center",
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#555",
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    //borderWidth: 1,
    backgroundColor: "#4d7031",
    alignItems: "center", // Alinhamento do main axis
    justifyContent: "center",
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
  },
});
