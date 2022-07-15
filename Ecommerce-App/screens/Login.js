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
// let accounts = {};
export default function Login({ navigation, route }) {
  //   const [accounts, setAccounts] = React.useState({})
  const [addr, setAddr] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [accounts, setAcc] = React.useState(route.params.paramKey);

  //   if (typeof route.params) {
  //     accounts = route.params.paramKey;
  //   }
  //   console.log(typeof route.param.paramKey);
  //   const [accounts, setAcc] = React.useState(
  //     typeof route.params.paramKey === "undefined" ? {} : route.param.paramKey
  //   );

  //   console.log(accounts.admin);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
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
        <Pressable
          style={styles.p_button}
          onPress={() => {
            userExists(addr, pass, accounts, navigation);
          }}
        >
          <Text style={styles.p_button_text}>Log In</Text>
        </Pressable>
        <Pressable
          style={styles.s_button}
          onPress={() => navigation.navigate("Signup", { paramKey: accounts })}
        >
          <Text style={styles.s_button_text}>Sign Up</Text>
        </Pressable>
        <Pressable
          style={styles.s_button}
          onPress={() => navigation.navigate("Forgotpass")}
        >
          <Text style={styles.s_button_text}>Forgot Password?</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const userExists = (userName, password, accounts, navigation) => {
  let isUsername = Object.keys(accounts).includes(userName);

  if (isUsername === true && accounts[userName] === password) {
    console.log("User logged in");
    navigation.navigate("Homescreen");
  } else {
    console.log("Incorrect Credentials");
    Alert.alert("Incorrect Credentials");
  }
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
