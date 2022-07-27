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

import { useAuth } from "../providers/AuthProvider.js";

import universalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import buttonStyles from "../styles/ButtonStyles";

function Signup({ navigation, route }) {
  const [pass, setPass] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [addr, setAddr] = useState("");
  const [userName, setUserName] = useState("");
  const { user, signUp } = useAuth();
  // The onPressSignUp method calls AuthProvider.signUp with the
  // email/password in state and then signs in.
  useEffect(() => {
    if (user) {
      navigation.navigate("Homescreen");
    }
  }, [user]);

  const onPressSignUp = async () => {
    if (pass !== confirmpass) {
      return Alert.alert("Password not matching.");
    }
    if (!(addr.includes("@") || addr.includes(".com"))) {
      return Alert.alert("Invalid email address entered.");
    }

    try {
      await signUp(addr, pass);
      await Alert.alert("Success", addr + " has been added successfully.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
      // navigation.navigate("Loginscreen");
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
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
            source={require("../assets/hu_logo.png")}
            style={universalStyles.logo}
          ></Image>
        </View>
        <View style={universalStyles.fields}>
          <TextInput style={inputStyles.textInput} placeholder="Full Name" />
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

          <TextInput
            style={inputStyles.textInput}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPass(text)}
          />

          <Pressable style={buttonStyles.p_button} onPress={onPressSignUp}>
            <Text style={buttonStyles.p_button_text}>Sign Up</Text>
          </Pressable>
          <Pressable
            style={buttonStyles.s_button}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={buttonStyles.s_button_text}>Go Back</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

// const addUserAccount = (
//   userName,
//   password,
//   confirmpass,
//   accounts,
//   emailAddr,
//   navigation
// ) => {
//   if (password !== confirmpass) {
//     return Alert.alert("Password not matching.");
//   }
//   if (!(emailAddr.includes("@") || emailAddr.includes(".com"))) {
//     return Alert.alert("Invalid email address entered.");
//   }
//   if (Object.keys(accounts).includes(userName)) {
//     return Alert.alert("User already exists.");
//   }

//   // accounts[userName] = password;
//   Alert.alert("Success", userName + " has been added successfully.", [
//     {
//       text: "OK",
//       onPress: () => navigation.navigate("Login", { paramKey: accounts }),
//     },
//   ]);
//   return;
// };

export default Signup;
