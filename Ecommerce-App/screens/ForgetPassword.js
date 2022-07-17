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
import styles from "../styles/Styles";

function Forgotpass({ navigation, route }) {
  const [addr, setAddr] = React.useState("");
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
          placeholder="Recovery User Name"
          onChangeText={(text) => setAddr(text)}
        />

        <Pressable
          style={styles.p_button}
          onPress={() => {
            if (Object.keys(accounts).includes(addr)) {
              Alert.alert("Recover email have been sent.");
            } else {
              Alert.alert("Error: User does not exist");
            }
          }}
        >
          <Text style={styles.s_button_text}>Send Reset Link</Text>
        </Pressable>

        <Pressable
          style={styles.s_button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.s_button_text}>Go Back</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

export default Forgotpass;
