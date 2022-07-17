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
export default function Login({ navigation, route }) {
  const [addr, setAddr] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [accounts, setAcc] = React.useState(route.params.paramKey);

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

        <TextInput
          style={styles.inputbox}
          placeholder="Username"
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
          onPress={() =>
            navigation.navigate("Forgotpass", { paramKey: accounts })
          }
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
