import React from "react";
import Icon from "react-native-vector-icons/AntDesign";

import { useAuth } from "../providers/AuthProvider.js";
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

import styles from "../styles/Styles.js";
import ProductItem from "../components/ProductItem.js";
import { TasksProvider } from "../providers/TasksProvider.js";
import { ProductsProvider } from "../providers/ProductsProvider.js";
import Footer from "../components/Footer.js";
import TasksView from "../views/TasksView.js";

export default function Homescreen({ navigation, route }) {
  const { user, signOut, projectData } = useAuth();
  // const { admin } = route.params;
  const admin = user.customData["userType"] === "admin" ? true : false;
  console.log(projectData[0].partition);

  console.log(route.params);
  const AdminPanel = () => {
    return (
      <Icon
        style={styles.plusIcon}
        name="plus"
        size={30}
        color="#900"
        onPress={() => {
          navigation.navigate("Addproduct");
        }}
      />
    );
  };

  return (
    <View style={styles.main}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <TasksProvider user={user} projectPartition={projectData[0].partition}>
          {/* <TasksView
            navigation={navigation}
            route={route}
            name={projectData[0].name}
          /> */}
          <ProductItem />
        </TasksProvider>
        <Footer />
      </ImageBackground>
    </View>
  );
}
