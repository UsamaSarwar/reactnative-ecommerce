import React, { useContext, useState, useEffect, useRef } from "react";
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

export default function Updatedetails({ navigation }) {
  // console.log(app.currentUser.identities);

  const [userName, setUserName] = useState("");
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.logoView}></View>
        <View style={styles.fields}>
          <TextInput
            style={styles.inputbox}
            placeholder="New User Name"
            accessibilityValue={user.customData.email}
            secureTextEntry={true}
            onChangeText={(text) => setNewPass(text)}
          />

          <Pressable
            style={styles.p_button}
            onPress={() =>
              Alert.alert("Your password will be changed", null, [
                {
                  text: "Confirm",
                  style: "destructive",
                },
                { text: "Cancel", style: "cancel" },
              ])
            }
          >
            <Text style={styles.p_button_text}>Update Details</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
