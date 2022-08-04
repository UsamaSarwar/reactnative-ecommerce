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
  Alert,
} from "react-native";

//Providers
import { useAuth } from "../providers/AuthProvider.js";

//Styles
import universalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import buttonStyles from "../styles/ButtonStyles";

export default function Signup({ navigation }) {
  const { signUp } = useAuth();

  const [addr, setAddr] = useState("");
  const [pass, setPass] = useState("");
  const [confirmpass, setConfirmPass] = useState("");

  const [addrError, setAddrError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [confirmPassError, setConfirmPassError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const onPressSignUp = async () => {
    if (
      addr.length === 0 ||
      pass.length === 0 ||
      confirmpass.length === 0 ||
      pass !== confirmpass ||
      !(addr.includes("@") || addr.includes(".com"))
    ) {
      if (addr.length === 0) {
        setAddrError(true);
      }
      if (pass.length === 0) {
        setPassError(true);
      }
      if (confirmpass.length === 0) {
        setConfirmPassError(true);
      }
      if (pass !== confirmpass) {
        setErrorMessage("Passwords do not match");
      }
      if (!(addr.includes("@") || addr.includes(".com"))) {
        setErrorMessage("Invalid email address entered");
      }
    } else {
      try {
        await signUp(addr, pass);
        Alert.alert("Success", addr + " has been added successfully.", [
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
          <Text style={styles.error_message}>{errorMessage}</Text>
        </View>

        <View style={universalStyles.input_fields_container_1}>
          {addr === "" ? null : (
            <Text style={{ marginBottom: 5 }}>Email Address</Text>
          )}
          <TextInput
            placeholder="Email Address"
            autoCapitalize="none"
            onChangeText={(text) => {
              setErrorMessage("");
              setAddr(text);
            }}
            style={[
              inputStyles.signup_input,
              { borderColor: addrError ? "red" : "transparent" },
            ]}
          />

          {pass === "" ? null : (
            <Text style={{ marginBottom: 5 }}>Password</Text>
          )}
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => setPass(text)}
            style={[
              inputStyles.signup_input,
              { borderColor: passError ? "red" : "transparent" },
            ]}
          />

          {confirmpass === "" ? null : (
            <Text style={{ marginBottom: 5 }}>Confirm Password</Text>
          )}
          <TextInput
            placeholder="Confirm Password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPass(text)}
            style={[
              inputStyles.signup_input,
              { borderColor: confirmPassError ? "red" : "transparent" },
            ]}
          />

          <Pressable
            style={buttonStyles.p_button_login}
            onPress={onPressSignUp}
          >
            <Text style={buttonStyles.p_button_text}>Sign Up</Text>
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
