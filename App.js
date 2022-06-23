import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
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
    setTodos((prevTodos) => {
      return [
        {text: text, id: Math.random().toString()},
          ...prevTodos
      ];
    })
  }

  return (
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
