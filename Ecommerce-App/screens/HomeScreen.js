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
import { ImagePicker } from "react-native-image-crop-picker";
import Footer from "../components/Footer.js";

export default function Homescreen({ navigation }) {
  const { user } = useAuth();

  if (user) {
    return (
      <View style={styles.main}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={styles.image}
        >
          <ProductItem navigation={navigation} user={user} />
          <Footer navigation={navigation} />
        </ImageBackground>
      </View>
    );
  } else {
    return null;
  }
}
