import React from "react";
// import app from "../realmApp";
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
} from "react-native";

import styles from "../styles/Styles.js";

export default function Homescreen({ navigation }) {
  // console.log(app.currentUser.identities);
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 15 }}
        >
          <Image
            source={require("../assets/hu_logo.png")}
            style={styles.logo}
          ></Image>
        </View>
        <Pressable
          style={styles.p_button}
          onPress={() =>
            Alert.alert("Log Out", null, [
              {
                text: "Yes, Log Out",
                style: "destructive",
                onPress: () => {
                  console.log("signing out");
                  signOut();
                  navigation.popToTop();
                },
              },
              { text: "Cancel", style: "cancel" },
            ])
          }
        >
          <Text style={styles.p_button_text}>Sign Out</Text>
        </Pressable>
        <Text style={styles.random_text}>This is Home Screen</Text>
      </ImageBackground>
    </View>
  );
}
