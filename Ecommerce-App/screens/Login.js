//React
import React, { useEffect, useState } from "react";
import { Text, View, ImageBackground, Pressable, Image } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-paper";
//Providers
import { useAuth } from "../providers/AuthProvider.js";

//Styles
import universalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import buttonStyles from "../styles/ButtonStyles";

export default function Login({ navigation }) {
  const { user, signIn } = useAuth();

  const [addr, setAddr] = useState("");
  const [pass, setPass] = useState("");
  const [secure, setSecure] = useState(false);

  const [addrError, setAddrError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      navigation.navigate("Homescreen");
    }
  }, [user]);

  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressLogIn = async () => {
    console.log("Pressed LogIn");

    if (pass.length === 0 || addr.length === 0) {
      if (pass.length === 0) {
        setPassError(true);
        console.log("password length zero");
      }
      if (addr.length === 0) {
        setAddrError(true);
        console.log("email address length zero");
      }
    } else {
      try {
        await signIn(addr, pass);
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
          {addr === "" ? null : (
            <Text style={{ marginBottom: 5 }}>Email Address</Text>
          )}
          <TextInput
            value={addr}
            placeholder="Email Address"
            theme={{ roundness: 15 }}
            autoCapitalize="none"
            underlineColor="transparent"
            activeUnderlineColor="#77ded1"
            right={<TextInput.Icon color="#77ded1" name="account" />}
            onChangeText={(text) => {
              setErrorMessage("");
              setAddr(text);
            }}
            style={[
              inputStyles.textInput,
              {
                borderColor: addrError ? "red" : "transparent",
                underlineColor: "transparent",
                activeUnderlineColor: "transparent",
              },
            ]}
          />

          {pass === "" ? null : (
            <Text style={{ marginBottom: 5 }}>Password</Text>
          )}
          <TextInput
            value={pass}
            placeholder="Password"
            autoCapitalize="none"
            underlineColor="transparent"
            activeUnderlineColor="#77ded1"
            secureTextEntry={!secure}
            theme={{ roundness: 15 }}
            right={
              <TextInput.Icon
                color="#77ded1"
                name={secure ? "eye-off" : "eye"}
                onPress={() => {
                  setSecure(!secure);
                }}
              />
            }
            onChangeText={(text) => {
              setErrorMessage("");
              setPass(text);
            }}
            style={[
              inputStyles.textInput,
              { borderColor: passError ? "red" : "transparent" },
            ]}
          />
          <Pressable
            style={buttonStyles.p_button}
            onPress={() => onPressLogIn()}
          >
            <Text style={buttonStyles.p_button_text}>Log In</Text>
          </Pressable>
          <Pressable
            style={buttonStyles.s_button}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={buttonStyles.s_button_text}>Sign Up</Text>
          </Pressable>
          <Pressable
            style={buttonStyles.s_button}
            onPress={() => navigation.navigate("Forgotpass")}
          >
            <Text style={buttonStyles.s_button_text}>Forgot Password?</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
