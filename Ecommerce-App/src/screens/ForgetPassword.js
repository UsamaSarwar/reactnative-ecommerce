//React
import React, { useReducer } from "react";

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
import { useGlobal } from "../providers/GlobalProvider.js";

//Styles
import universalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import buttonStyles from "../styles/ButtonStyles";
import TextStyles from "../styles/TextStyles.js";
import UniversalStyles from "../styles/UniversalStyles";

const initialStates = {
  addr: "",

  addrError: false,

  errorMessage: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADDRESS":
      return { ...state, addr: action.payload, errorMessage: "" };

    case "ADDRESS_ERROR":
      return { ...state, addrError: action.payload };

    case "ERROR_MSG":
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};

export default function Forgotpass({ navigation }) {
  const { passResetEmail } = useAuth();

  const [state, dispatch] = useReducer(reducer, initialStates);

  const { isKeyboardVisible } = useGlobal();

  const onPressReset = async () => {
    if (state.addr.length === 0) {
      dispatch({ type: "ADDRESS_ERROR", payload: true });
    } else {
      try {
        await passResetEmail(state.addr);
        Alert.alert("Success reset email has been sent to " + state.addr, [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      } catch (error) {
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

        <View style={universalStyles.centered_container}>
          <Text style={TextStyles.error_message}>{state.errorMessage}</Text>
        </View>

        <View style={universalStyles.input_fields_container_1}>
          {state.addr === "" ? null : (
            <Text style={UniversalStyles.marginBottom5}>
              Recovery Email Address
            </Text>
          )}
          <TextInput
            style={[
              inputStyles.signup_input,
              { borderColor: state.addrError ? "red" : "transparent" },
            ]}
            placeholder="Recovery Email Address"
            onChangeText={(text) =>
              dispatch({ type: "ADDRESS", payload: text })
            }
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
