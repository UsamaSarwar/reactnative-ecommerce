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
  Alert,
} from "react-native";

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
            addUserAccount(userName, pass, confirmpass, accounts, emailAddr);
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
  emailAddr
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
  return Alert.alert(userName + " has been added successfully.");
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    padding: 50,
  },
  inputbox: {
    height: 45,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowRadius: 100,
    marginBottom: 24,
    paddingLeft: 10,
  },
  p_button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#40e1d1",
    marginBottom: 24,
  },
  p_button_text: {
    fontSize: 21,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  s_button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginBottom: 24,
  },
  s_button_text: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textShadowColor: "grey",
    textShadowRadius: 10,
  },
});

export default Signup;
