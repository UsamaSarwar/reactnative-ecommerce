import React from "react";
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
  //   const [addr, setAddr] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [confirmpass, setConfirmPass] = React.useState("");
  const [emailAddr, setEmailAddr] = React.useState("");
  const [accounts, setAcc] = React.useState(route.params.paramKey);
  const [userName, setUserName] = React.useState("");
  //   console.log("Hello", accounts.admin);
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
          onChangeText={(text) => setEmailAddr(text)}
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

        <Pressable
          style={styles.p_button}
          onPress={() => {
            addUserAccount(
              userName,
              pass,
              confirmpass,
              accounts,
              emailAddr,
              navigation
            );
          }}
        >
          <Text style={styles.p_button_text}>Sign Up</Text>
        </Pressable>
        <Pressable
          style={styles.s_button}
          onPress={() => {
            navigation.navigate("Login", { paramKey: accounts });
          }}
        >
          <Text style={styles.s_button_text}>Log In</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const addUserAccount = (
  userName,
  password,
  confirmpass,
  accounts,
  emailAddr,
  navigation
) => {
  if (password !== confirmpass) {
    return Alert.alert("Password not matching.");
  }
  if (!(emailAddr.includes("@") || emailAddr.includes(".com"))) {
    return Alert.alert("Invalid email address entered.");
  }
  if (Object.keys(accounts).includes(userName)) {
    return Alert.alert("User already exists.");
  }
  accounts[userName] = password;

  Alert.alert("Success", userName + " has been added successfully.", [
    {
      text: "OK",
      onPress: () => navigation.navigate("Login", { paramKey: accounts }),
    },
  ]);
  return;
};

export default Signup;
