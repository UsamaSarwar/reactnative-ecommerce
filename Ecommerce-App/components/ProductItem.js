import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
  Button,
  ImageBackground,
  Pressable,
  Image,
  Alert,
  FlatList,
} from "react-native";

import React, { useState } from "react";

import { useProducts } from "../providers/ProductsProvider";

import { useTasks } from "../providers/TasksProvider";

import { Task } from "../schemas";

import styles from "../styles/Styles";

export default function ProductItem() {
  // const { tasks } = useTasks();
  // console.log(tasks);

  const { tasks } = useTasks();

  console.log(tasks);
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
}
