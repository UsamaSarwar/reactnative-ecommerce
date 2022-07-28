import React, { useEffect, useState } from "react";
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

import app from "../realmApp";

import { useAuth } from "../providers/AuthProvider.js";

import universalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import buttonStyles from "../styles/ButtonStyles";

export default function Login({ navigation, route }) {
  const [addr, setAddr] = useState("");
  const [pass, setPass] = useState("");
  const { user, signIn } = useAuth();

  useEffect(() => {
    if (user) {
      // console.log(user.customData.memberOf);
      navigation.navigate("Homescreen");
    }
  }, [user]);

  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressLogIn = async () => {
    console.log("Pressed sign in");
    try {
      await signIn(addr, pass);
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  return (
    <View style={universalStyles.container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={universalStyles.image}
      >
        <View style={universalStyles.logoView}>
          <Image
            source={require("../assets/logo.png")}
            style={universalStyles.logo}
          ></Image>
        </View>

        <View style={universalStyles.fields}>
          <TextInput
            style={inputStyles.textInput}
            placeholder="Email Address"
            onChangeText={(text) => setAddr(text)}
          />
          <TextInput
            style={inputStyles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPass(text)}
          />
          <Pressable style={buttonStyles.p_button} onPress={onPressLogIn}>
            <Text style={buttonStyles.p_button_text}>Log In</Text>
          </Pressable>
          <Pressable
            style={buttonStyles.s_button}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={buttonStyles.s_button_text}>Sign Up</Text>
          </Pressable>
          <Pressable
            style={buttonStyles.s_button}
            onPress={() => navigation.navigate("Forgotpass")}
          >
            <Text style={buttonStyles.s_button_text}>Forgot Password?</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
