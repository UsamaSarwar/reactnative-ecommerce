//React
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  Pressable,
  Image,
} from "react-native";

//Providers
import { useAuth } from "../providers/AuthProvider.js";

//Styles
import universalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import buttonStyles from "../styles/ButtonStyles";

export default function Forgotpass({ navigation }) {
  const { passResetEmail } = useAuth();

  const [addr, setAddr] = useState("");

  const [addrError, setAddrError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const onPressReset = async () => {
    if (addr.length === 0) {
      setAddrError(true);
    } else {
      try {
        await passResetEmail(addr);
        Alert.alert("Success reset email has been sent to " + add, [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <View style={universalStyles.main}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={universalStyles.image}
      >
        <View style={universalStyles.logoView}>
          <Image
            source={require("../assets/logo.png")}
            style={universalStyles.logo}
          ></Image>
        </View>

        <View style={universalStyles.center}>
          <Text style={styles.error_message}>{errorMessage}</Text>
        </View>

        <View style={universalStyles.fields}>
          <TextInput
            style={[
              inputStyles.textInput,
              { borderColor: addrError ? "red" : "transparent" },
            ]}
            placeholder="Recovery Email Address"
            onChangeText={(text) => setAddr(text)}
          />

          <Pressable
            style={buttonStyles.p_button}
            onPress={() => onPressReset()}
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
