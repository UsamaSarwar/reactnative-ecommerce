import React, { useEffect, useRef } from "react";
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
import SlidingUpPanel from "rn-sliding-up-panel";
export default function Cart({ navigation }) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);
  const elementRef = useRef();
  return (
    <View style={styles.main}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Button title="Show panel" onPress={() => elementRef.current.show()} />
        <SlidingUpPanel ref={(c) => (elementRef.current = c)}>
          {/* {console.log(elementRef)} */}
          <View style={styles.container}>
            <Text>Here is the content inside panel</Text>
            <Button title="Hide" onPress={() => elementRef.current.hide()} />
          </View>
        </SlidingUpPanel>
        {/* <ProductItem navigation={navigation} user={user} /> */}
        <Footer navigation={navigation} />
      </ImageBackground>
    </View>
  );
}
