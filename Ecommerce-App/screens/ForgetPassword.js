//React
import React, { useState } from "react";

//React Components
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
import TextStyles from "../styles/TextStyles.js";

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
        Alert.alert("Success reset email has been sent to " + addr, [
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
    <View style={universalStyles.page_container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={universalStyles.background_image}
      >
        <View style={universalStyles.logo_container}>
          <Image
            source={require("../assets/logo.png")}
            style={universalStyles.logo}
          ></Image>
        </View>

        <View style={universalStyles.centered_container}>
          <Text style={TextStyles.error_message}>{errorMessage}</Text>
        </View>

        <View style={universalStyles.input_fields_container_1}>
          <TextInput
            style={[
              inputStyles.signup_input,
              { borderColor: addrError ? "red" : "transparent" },
            ]}
            placeholder="Recovery Email Address"
            onChangeText={(text) => setAddr(text)}
          />

          <Pressable
            style={buttonStyles.p_button_login}
            onPress={() => onPressReset()}
          >
            <Text style={buttonStyles.p_button_text}>Send Reset Link</Text>
          </Pressable>

          <Pressable style={buttonStyles.s_button}>
            <Text
              style={buttonStyles.s_button_text}
              onPress={() => navigation.navigate("Login")}
            >
              Go Back
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
