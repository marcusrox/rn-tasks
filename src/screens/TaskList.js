import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";
import "moment/locale/pt-br";

import commonStyles from "../commonStyles";
import todayImage from "../../assets/imgs/today.jpg";
import Task from "../components/Task";

import { CheckBox } from "react-native-elements";
import AddTask from "./AddTask";
import { Ionicons } from "@expo/vector-icons";
import { createIconSetFromFontello } from "react-native-vector-icons";

const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  visibleTasks: [],
  tasks: [
    
  ],
};

export default class TaskList extends Component {
  state = {
    ...initialState,
  };

  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem("tasksState");
    const state = JSON.parse(stateString) || initialState;
    this.setState(state, this.filterTasks);
  };

  toggleFilter = () => {
    this.setState(
      { showDoneTasks: !this.state.showDoneTasks },
      this.filterTasks
    );
  };

  filterTasks = () => {
    let visibleTasks = null;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pending = (task) => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pending);
    }

    this.setState({ visibleTasks });
    AsyncStorage.setItem("tasksState", JSON.stringify(this.state));
  };

  toggleTask = (taskId) => {
    const tasks = [...this.state.tasks];
    tasks.forEach((task) => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });

    this.setState({ tasks }, this.filterTasks);
  };

  deleteTask = (id) => {
    const tasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({ tasks }, this.filterTasks);
  };

  addTask = newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
        Alert.alert('Dados inválidos', 'Descrição não informada')
        return
    }
    const tasks = [...this.state.tasks]
    tasks.push({id: Math.random(), desc: newTask.desc, date: newTask.date, doneAt: null})
    this.setState({ tasks, showAddTask: false }, this.filterTasks);
  }

  render() {
    const today = moment().locale("pt-br").format("ddd, D [de] MMMM");
    return (
      <View style={styles.container}>
        <AddTask
          isVisible={this.state.showAddTask}
          onCancel={() => this.setState({ showAddTask: false })}
          onSave={this.addTask}
        />
        <ImageBackground style={styles.titleContainer} source={todayImage}>
          <CheckBox
            containerStyle={{
              alignItems: "flex-end",
              backgroundColor: "transparent",
              borderWidth: 0,
            }}
            checked={this.state.showDoneTasks}
            // title="Mostrar concluídas"
            checkedColor="#fff"
            uncheckedColor="#ccc"
            onPress={() => {
              this.toggleFilter();
            }}
          ></CheckBox>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Task
                {...item}
                onToggleTask={this.toggleTask}
                onDelete={this.deleteTask}
              />
            )}
          ></FlatList>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => this.setState({ showAddTask: true })}
        >
          <Ionicons
            name="add-circle"
            size={70}
            color={commonStyles.colors.today}
          />
        </TouchableOpacity>
      </View>
    );
  }
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
    backgroundColor: commonStyles.colors.ouro,
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 48,
    color: commonStyles.colors.secondary,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    color: commonStyles.colors.secondary,
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    width: 70,
    height: 70,
    //borderRadius: 25,
    //backgroundColor: commonStyles.colors.today,
    justifyContent: "center",
    alignItems: "center",
  },
});
