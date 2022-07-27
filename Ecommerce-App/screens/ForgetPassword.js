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

import universalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import buttonStyles from "../styles/ButtonStyles";

function Forgotpass({ navigation, route }) {
  const [addr, setAddr] = React.useState("");
  const { passResetEmail } = useAuth();
  // console.log(addr);
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
          <TextInput
            style={inputStyles.textInput}
            placeholder="Recovery Email Address"
            onChangeText={(text) => setAddr(text)}
          />

          <Pressable
            style={buttonStyles.p_button}
            onPress={() => {
              // console.log("inside func" + addr);
              passResetEmail(addr);
            }}
          >
            <Text style={buttonStyles.p_button_text}>Send Reset Link</Text>
          </Pressable>

          <Pressable
            style={buttonStyles.s_button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={buttonStyles.s_button_text}>Go Back</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Forgotpass;
