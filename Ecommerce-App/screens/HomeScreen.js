import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

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
  const { user, signOut } = useAuth();
  console.log(route);
  // const { admin } = route.params;
  // const { navigation, route } = props;
  // console.log(admin);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        {/* <TasksProvider user={user} projectPartition={user ? user.id : user}>
          <ProductItem />
        </TasksProvider> */}
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
        </View>
      </ImageBackground>
    </View>
  );
}
