import React, { useContext, useState, useEffect, useRef } from "react";
// import app from "../realmApp";
import { useAuth } from "../providers/AuthProvider.js";
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";

import styles from "../styles/Styles.js";
import UniversalStyles from "../styles/UniversalStyles.js";
import InputStyles from "../styles/InputStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";

export default function Updatepassword({ navigation }) {
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const { user, resetPass, signOut } = useAuth();

  const [confPassError, setConfPassError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const onPressUpdatePass = async () => {
    console.log("Pressed Update Password");
    if (confirmNewPass === "") {
      setErrorMessage("New password is empty");
    } else if (confirmNewPass !== newPass) {
      console.log("here");
      setErrorMessage("New passwords does not match.");
    } else if (newPass.length < 6 || newPass.length > 128) {
      setErrorMessage("Password must be between 6 and 128 characters");
    } else {
      Alert.alert("Your password will be changed", null, [
        {
          text: "Confirm",
          style: "destructive",
          onPress: () => {
            console.log("Updating Password");
            resetPass(user.customData["name"], newPass);
          },
        },
        { text: "Cancel", style: "cancel" },
      ]);

      Alert.alert(
        "Password changed successfully. Please login to your account again.",
        null,
        [
          {
            text: "Ok, great!",
            onPress: () => {
              signOut();
              navigation.navigate("Login");
            },
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={UniversalStyles.main}>
      <View style={UniversalStyles.main}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={UniversalStyles.image}
        >
          {/* <View style={UniversalStyles.logoView}>
          <Image
            source={require("../assets/logo.png")}
            style={UniversalStyles.logo}
          ></Image>
        </View> */}

          <View style={UniversalStyles.center}>
            <Text style={styles.error_message}>{errorMessage}</Text>
          </View>

          <View style={UniversalStyles.fields}>
            <TextInput
              style={[
                InputStyles.textInput,
                { borderColor: passError ? "red" : "transparent" },
              ]}
              placeholder="New Password"
              secureTextEntry={true}
              onChangeText={(text) => setNewPass(text)}
            />
            <TextInput
              style={[
                InputStyles.textInput,
                { borderColor: confPassError ? "red" : "transparent" },
              ]}
              placeholder="Confirm New Password"
              secureTextEntry={true}
              onChangeText={(text) => setConfirmNewPass(text)}
            />
            <Pressable
              style={ButtonStyles.p_button}
              onPress={() => onPressUpdatePass()}
            >
              <Text style={ButtonStyles.p_button_text}>Update Password</Text>
            </Pressable>

            <Pressable
              style={ButtonStyles.s_button}
              onPress={() => navigation.navigate("Homescreen")}
            >
              <Text style={ButtonStyles.s_button_text}>Go Back</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
