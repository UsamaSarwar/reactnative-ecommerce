import React, { useEffect } from "react";
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
import Icon from "react-native-vector-icons/AntDesign";

import { useAuth } from "../providers/AuthProvider.js";

import styles from "../styles/Styles.js";

import Footer from "../components/Footer.js";

export default function Cart({ navigation }) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  return (
    <View style={styles.main}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        {/* <ProductItem navigation={navigation} user={user} /> */}
        <Footer navigation={navigation} />
      </ImageBackground>
    </View>
  );
}
