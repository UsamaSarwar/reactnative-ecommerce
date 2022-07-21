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
import { useAuth } from "../providers/AuthProvider.js";
import styles from "../styles/Styles";

function Forgotpass({ navigation, route }) {
  const [addr, setAddr] = React.useState("");
  const { passResetEmail } = useAuth();
  // console.log(addr);
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
            placeholder="Recovery Email Address"
            onChangeText={(text) => setAddr(text)}
          />

          <Pressable
            style={styles.p_button}
            onPress={() => {
              // console.log("inside func" + addr);
              passResetEmail(addr);
            }}
          >
            <Text style={styles.p_button_text}>Send Reset Link</Text>
          </Pressable>

          <Pressable
            style={styles.s_button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.s_button_text}>Go Back</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Forgotpass;
