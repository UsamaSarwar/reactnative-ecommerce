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

export default function Homescreen({ navigation, route }) {
  const { user, signOut, projectData } = useAuth();
  const { admin } = route.params;
  console.log(projectData[0].partition);
  // console.log(admin);
  const AdminPanel = () => {
    return (
      <Icon
        style={styles.userIcon}
        name="user"
        size={30}
        color="#900"
        onPress={() => {}}
      />
    );
  };
  // const { admin } = route.params;
  // const { navigation, route } = props;
  // console.log(admin);
  console.log(route.params);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <TasksProvider user={user} projectPartition={projectData[0].partition}>
          <ProductItem />
        </TasksProvider>
        <View style={styles.footer}>
          <Icon
            style={styles.userIcon}
            name="user"
            size={30}
            color="#900"
            onPress={() => {
              navigation.navigate("Setting");
            }}
          />
          <Icon style={styles.logOutIcon} name="logout" />
          {admin ? AdminPanel() : void 0}
        </View>
      </ImageBackground>
    </View>
  );
}
