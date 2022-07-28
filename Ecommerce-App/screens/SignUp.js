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
  const [name, setName] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [addr, setAddr] = useState("");
  const { user, signUp, setUsername } = useAuth();
  let [nameError, setNameError] = useState(false);
  let [addrError, setAddrError] = useState(false);
  let [passError, setPassError] = useState(false);
  let [confirmPassError, setConfirmPassError] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  // let [error, setError] = useState(false);
  let error = false;

  const onPressSignUp = async () => {
    if (pass !== confirmpass) {
      // return Alert.alert("Password not matching.");
      error = true;
      setErrorMessage("Passwords do not match");
    }
    if (!(addr.includes("@") || addr.includes(".com"))) {
      // return Alert.alert("Invalid email address entered.");
      error = true;
      setErrorMessage("Invalid email address entered");
    }
    if (!error) {
      try {
        await signUp(addr, pass);
        console.log("setting name");
        await setUsername(name);
        Alert.alert("Success", addr + " has been added successfully.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      } catch (error) {
        // Alert.alert(`Failed to sign up: ${error.message}`);
        // console.log(error.message);
        setErrorMessage(error.message);
      }
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
        <Text style={styles.error_message}>{errorMessage}</Text>
        <View style={universalStyles.fields}>
          <TextInput
            placeholder="Full Name"
            onChangeText={(text) => {
              setErrorMessage("");
              setName(text);
            }}
            style={[
              inputStyles.textInput,
              { borderColor: nameError ? "red" : "transparent" },
            ]}
          />
          <TextInput
            placeholder="Email Address"
            onChangeText={(text) => {
              setErrorMessage("");
              setAddr(text);
            }}
            style={[
              inputStyles.textInput,
              { borderColor: addrError ? "red" : "transparent" },
            ]}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPass(text)}
            style={[
              inputStyles.textInput,
              { borderColor: passError ? "red" : "transparent" },
            ]}
          />

          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPass(text)}
            style={[
              inputStyles.textInput,
              { borderColor: confirmPassError ? "red" : "transparent" },
            ]}
          />

          <Pressable
            style={buttonStyles.p_button}
            onPress={() => {
              if (
                name.length === 0 ||
                addr.length === 0 ||
                pass.length === 0 ||
                confirmpass.length === 0
              ) {
                if (name.length === 0) {
                  setNameError(true);
                } else {
                  setNameError(false);
                }
                if (addr.length === 0) {
                  setAddrError(true);
                } else {
                  setAddrError(false);
                }
                if (pass.length === 0) {
                  setPassError(true);
                } else {
                  setPassError(false);
                }
                if (confirmpass.length === 0) {
                  setConfirmPassError(true);
                } else {
                  setConfirmPassError(false);
                }
              } else {
                setNameError(false);
                setAddrError(false);
                setPassError(false);
                setConfirmPassError(false);
                onPressSignUp();
              }
            }}
          >
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
