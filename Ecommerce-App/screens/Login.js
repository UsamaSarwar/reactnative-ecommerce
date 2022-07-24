import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider.js";
import app from "../realmApp";
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

export default function Login({ navigation, route }) {
  const [addr, setAddr] = useState("");
  const [pass, setPass] = useState("");
  const { user, signIn } = useAuth();
  useEffect(() => {
    if (user) {
      navigation.navigate("Homescreen");
    }
  }, [user]);

  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressLogIn = async () => {
    console.log("Pressed sign in");
    try {
      await signIn(addr, pass);
      navigation.navigate("Homescreen");
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };
  // console.log(user);
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
            placeholder="Email Address"
            onChangeText={(text) => setAddr(text)}
          />
          <TextInput
            style={styles.inputbox}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPass(text)}
          />
          <Pressable style={styles.p_button} onPress={onPressLogIn}>
            <Text style={styles.p_button_text}>Log In</Text>
          </Pressable>
          <Pressable
            style={styles.s_button}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.s_button_text}>Sign Up</Text>
          </Pressable>
          <Pressable
            style={styles.s_button}
            onPress={() => navigation.navigate("Forgotpass")}
          >
            <Text style={styles.s_button_text}>Forgot Password?</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
