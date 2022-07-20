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

export default function Updatepassword({ navigation }) {
  // console.log(app.currentUser.identities);
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const { user, resetPass, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.logoView}>
          <Image
            source={require("../assets/hu_logo.png")}
            style={styles.logo}
          ></Image>
        </View>
        <View style={styles.fields}>
          <TextInput
            style={styles.inputbox}
            placeholder="New Password"
            secureTextEntry={true}
            onChangeText={(text) => setNewPass(text)}
          />
          <TextInput
            style={styles.inputbox}
            placeholder="Confirm New Password"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmNewPass(text)}
          />
          <Pressable
            style={styles.p_button}
            onPress={() =>
              Alert.alert("Your password will be changed", null, [
                {
                  text: "Confirm",
                  style: "destructive",
                  onPress: () => {
                    console.log("Updating Password");
                    if (confirmNewPass !== newPass) {
                      Alert.alert("New passwords does not match.");
                    } else if (newPass.length < 6 || newPass.length > 128) {
                      Alert.alert(
                        "password must be between 6 and 128 characters"
                      );
                    } else {
                      resetPass(user.customData["name"], newPass);
                      signOut();
                      navigation.navigate("Login");
                      Alert.alert(
                        "Password changed successfully. Please login to your account again.",
                        null,
                        [{ text: "Ok, great!" }]
                      );
                    }
                  },
                },
                { text: "Cancel", style: "cancel" },
              ])
            }
          >
            <Text style={styles.p_button_text}>Update Password</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
