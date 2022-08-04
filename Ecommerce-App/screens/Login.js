//React
import React, { useEffect, useState } from "react";

//React Components
import { Text, View, ImageBackground, Pressable, Image } from "react-native";
import { TextInput } from "react-native-paper";

//Providers
import { useAuth } from "../providers/AuthProvider.js";

//Icons
import Icon from "react-native-vector-icons/AntDesign";

//Styles
import universalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import buttonStyles from "../styles/ButtonStyles";
import TextStyles from "../styles/TextStyles.js";

export default function Login({ navigation }) {
  const { user, signIn } = useAuth();

  const [addr, setAddr] = useState("");
  const [pass, setPass] = useState("");

  const [showPass, setShowPass] = useState(false);

  const [addrError, setAddrError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigation.navigate("Homescreen");
    }
  }, [user]);

  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressLogIn = async () => {
    console.log("Pressed LogIn");

    if (pass.length === 0) {
      setPassError(true);
      console.log("password length zero");
    }
    if (addr.length === 0) {
      setAddrError(true);
      console.log("email address length zero");
    }

    console.log(passError, addrError);

    if (!passError && !addrError) {
      setLoading(true);
      try {
        await signIn(addr, pass);
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
          {/* {loading ? (
            <Icon name="loadingoutline" size={50} color="#42C88F" />
          ) : null} */}
        </View>

        <View style={universalStyles.input_fields_container_1}>
          {addr === "" ? null : (
            <Text style={{ marginBottom: 5 }}>Email Address</Text>
          )}
          <TextInput
            value={addr}
            placeholder="Email Address"
            autoCapitalize="none"
            onChangeText={(text) => {
              setErrorMessage("");
              setAddr(text);
            }}
            onFocus={() => setAddrError(false)}
            right={<TextInput.Icon color="#42C88F" name="account" />}
            theme={{ roundness: 15 }}
            underlineColor="transparent"
            activeUnderlineColor="#42C88F"
            style={[
              inputStyles.login_input,
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
            secureTextEntry={!showPass}
            onChangeText={(text) => {
              setErrorMessage("");
              setPass(text);
            }}
            onFocus={() => setPassError(false)}
            right={
              <TextInput.Icon
                color="#42C88F"
                name={showPass ? "eye-off" : "eye"}
                onPress={() => setShowPass(!showPass)}
              />
            }
            activeUnderlineColor="#42C88F"
            underlineColor="transparent"
            theme={{ roundness: 15 }}
            style={[
              inputStyles.login_input,
              {
                borderColor: passError ? "red" : "transparent",
                underlineColor: "transparent",
                activeUnderlineColor: "transparent",
                marginBottom: 5,
              },
            ]}
          />
          <Pressable style={buttonStyles.s_button_fp}>
            <Text
              style={buttonStyles.s_button_text}
              onPress={() => navigation.navigate("Forgotpass")}
            >
              Forgot Password?
            </Text>
          </Pressable>

          <Pressable
            style={buttonStyles.p_button_login}
            onPress={() => onPressLogIn()}
          >
            <Text style={buttonStyles.p_button_text}>Log In</Text>
          </Pressable>

          <Pressable style={buttonStyles.s_button}>
            <Text
              style={buttonStyles.s_button_text}
              onPress={() => navigation.navigate("Signup")}
            >
              Sign Up
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
