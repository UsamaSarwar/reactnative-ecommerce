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

export default function ProductItem({ navigation, user }) {
  // const { tasks } = useTasks();
  // console.log(tasks);
  let admin = user.customData["userType"] === "admin" ? true : false;

  const { tasks } = useTasks();
  const makeEditButton = (item) => {
    return (
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 5,
          paddingHorizontal: 30,
          borderRadius: 15,
          elevation: 3,
          backgroundColor: "#40e1d1",
        }}
        onPress={() => {
          navigation.navigate("Editproduct", { currItem: item });
        }}
      >
        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            letterSpacing: 0.25,
            color: "white",
          }}
        >
          Edit
        </Text>
      </Pressable>
    );
  };
  // console.log(tasks);
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <View
          style={{
            backgroundColor: "white",
            opacity: 0.9,
            padding: 10,
            margin: 10,
            borderRadius: 10,
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "#f3f3f3",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: `data:${item.imageForm};base64,${item.image}` }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 10,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              marginLeft: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                marginBottom: 3,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                {item.name}
              </Text>
            </View>
            <View style={{ flex: 1, marginBottom: 5 }}>
              <Text
                style={{
                  fontSize: 11,
                  color: "grey",
                }}
              >
                {item.category}
              </Text>
            </View>

            <Text numberOfLines={3} style={{ marginBottom: 10, fontSize: 15 }}>
              {item.description}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text>PKR {item.price}</Text>
              {admin ? makeEditButton(item) : void 0}
            </View>
          </View>
        </View>
      )}
    />
  );
}
