import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, {useState} from "react";
import Header from "./components/header";
import TodoItem from "./components/todoItem";
import AddTodo from "./components/addTodo";

export default function App() {
  const [todos, setTodos] = useState([
    {text: 'buy a laptop', id: '1'},
    {text: 'learn to code', id: '2'},
    {text: 'build an app', id: '3'},
  ]);

  const pressHandler = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.id !== id)
    })
  };

  const submitHandler = (text) => {
    if (text.length > 3){
      setTodos((prevTodos) => {
        return [
          {text: text, id: Math.random().toString()},
          ...prevTodos
        ];
      });
    }
    else {
      Alert.alert('Oops!', 'Must be over three (3) characters long', [
        {text: 'Got it', onPress: () => console.log('alert closed')}
      ])
    }
  }

  return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss()
        console.log('Pressed')
      }}>
        <View style={styles.container}>
          <Header/>
          <View style={styles.content}>
            <AddTodo submitHandler={submitHandler}/>
            <View style={styles.list}>
              <FlatList
                  keyExtractor={(item) => item.id}
                  data={todos}
                  renderItem={({item}) => (
                      <TodoItem item={item} pressHandler={pressHandler}/>
                  )}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});
