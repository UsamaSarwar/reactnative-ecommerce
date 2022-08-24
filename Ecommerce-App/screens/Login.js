//React
import React, { useEffect, useState, useReducer } from "react";

//React Components
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";

//Providers
import { useAuth } from "../providers/AuthProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";

//Styles
import universalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import buttonStyles from "../styles/ButtonStyles";
import TextStyles from "../styles/TextStyles.js";

const initialStates = {
  addr: "",
  pass: "",

  addrError: false,
  passError: false,

  errorMessage: "",

  showPass: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADDRESS":
      return { ...state, addr: action.payload, errorMessage: "" };
    case "ADDRESS_ERROR":
      return { ...state, addrError: action.payload };
    case "PASSWORD":
      return { ...state, pass: action.payload, errorMessage: "" };
    case "PASSWORD_ERROR":
      return { ...state, passError: action.payload };
    case "ERROR_MSG":
      return { ...state, errorMessage: action.payload };
    case "SHOW_PASSWORD":
      return { ...state, showPass: action.payload };
    default:
      return state;
  }
};

export default function Login({ navigation }) {
  const { user, signIn } = useAuth();

  const [loggingIn, setLoggingIn] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialStates);

  const { isKeyboardVisible } = useGlobal();

  useEffect(() => {
    if (user) {
      navigation.navigate("Homescreen");
    }
  }, [user]);

  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressLogIn = async () => {
    console.log("Pressed LogIn");

    if (state.pass.length === 0) {
      dispatch({ type: "PASSWORD_ERROR", payload: true });
    }
    if (state.addr.length === 0) {
      dispatch({ type: "ADDRESS_ERROR", payload: true });
    }

    if (!state.passError && !state.addrError) {
      setLoggingIn(true);
      try {
        await signIn(state.addr, state.pass);
      } catch (error) {
        setLoggingIn(false);
        dispatch({ type: "ERROR_MSG", payload: error.message });
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
            style={
              isKeyboardVisible
                ? universalStyles.logoKeyboardVisible
                : universalStyles.logo
            }
          ></Image>
        </View>
        <View style={universalStyles.errorInputContainer}>
          <View style={universalStyles.centered_container}>
            <Text style={TextStyles.error_message}>{state.errorMessage}</Text>
          </View>

          <View style={universalStyles.input_fields_container_1}>
            {state.addr === "" ? null : (
              <Text style={{ marginBottom: 5 }}>Email Address</Text>
            )}
            <TextInput
              value={state.addr}
              placeholder="Email Address"
              autoCapitalize="none"
              onChangeText={(text) =>
                dispatch({ type: "ADDRESS", payload: text })
              }
              onFocus={() =>
                dispatch({ type: "ADDRESS_ERROR", payload: false })
              }
              // right={
              //   <TextInput.Icon disabled="true" color="#42C88F" name="account" />
              // }
              theme={{ roundness: 15 }}
              underlineColor="transparent"
              activeUnderlineColor="#42C88F"
              style={[
                inputStyles.login_input,
                {
                  borderColor: state.addrError ? "red" : "transparent",
                  underlineColor: "transparent",
                  activeUnderlineColor: "transparent",
                },
              ]}
            />

            {state.pass === "" ? null : (
              <Text style={{ marginBottom: 5 }}>Password</Text>
            )}
            <TextInput
              value={state.pass}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={!state.showPass}
              onChangeText={(text) =>
                dispatch({ type: "PASSWORD", payload: text })
              }
              onFocus={() =>
                dispatch({ type: "PASSWORD_ERROR", payload: false })
              }
              right={
                <TextInput.Icon
                  color="#42C88F"
                  name={state.showPass ? "eye-off" : "eye"}
                  onPress={() =>
                    dispatch({
                      type: "SHOW_PASSWORD",
                      payload: !state.showPass,
                    })
                  }
                />
              }
              activeUnderlineColor="#42C88F"
              underlineColor="transparent"
              theme={{ roundness: 15 }}
              style={[
                inputStyles.login_input,
                {
                  borderColor: state.passError ? "red" : "transparent",
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
              {loggingIn ? (
                <ActivityIndicator color="#ffffff" size={24} />
              ) : (
                <Text style={buttonStyles.p_button_text}>Log In</Text>
              )}
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
        </View>
      </ImageBackground>
    </View>
  );
}
