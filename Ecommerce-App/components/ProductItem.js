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

import { useTasks } from "../providers/TasksProvider";

import { Task } from "../schemas";

import styles from "../styles/Styles";

export default function ProductItem() {
  return (
    <FlatList
      data={[
        { key: "Devin" },
        { key: "Dan" },
        { key: "Dominic" },
        { key: "Jackson" },
        { key: "James" },
        { key: "Joel" },
        { key: "John" },
        { key: "Jillian" },
        { key: "Jimmy" },
        { key: "Julie" },
      ]}
      renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
    />
  );
}
