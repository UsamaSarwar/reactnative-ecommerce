import React, { useEffect, useState } from "react";
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

function Signup({ navigation, route }) {
  const [pass, setPass] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [addr, setAddr] = useState("");
  const [userName, setUserName] = useState("");
  const { user, signUp } = useAuth();
  // The onPressSignUp method calls AuthProvider.signUp with the
  // email/password in state and then signs in.
  // useEffect(() => {
  //   if (user) {
  //     navigation.navigate("Homescreen");
  //   }
  // }, [user]);

  const onPressSignUp = async () => {
    if (pass !== confirmpass) {
      return Alert.alert("Password not matching.");
    }
    if (!(addr.includes("@") || addr.includes(".com"))) {
      return Alert.alert("Invalid email address entered.");
    }

    try {
      await signUp(addr, pass);
      await Alert.alert("Success", userName + " has been added successfully.", [
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

        <TextInput style={styles.inputbox} placeholder="Full Name" />
        <TextInput
          style={styles.inputbox}
          placeholder="Email Address"
          onChangeText={(text) => setAddr(text)}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Username"
          onChangeText={(text) => setUserName(text)}
        />

        <TextInput
          style={styles.inputbox}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPass(text)}
        />

        <TextInput
          style={styles.inputbox}
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPass(text)}
        />

        <Pressable style={styles.p_button} onPress={onPressSignUp}>
          <Text style={styles.p_button_text}>Sign Up</Text>
        </Pressable>
        <Pressable
          style={styles.s_button}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.s_button_text}>Go Back</Text>
        </Pressable>
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
