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
  Alert,
  ActivityIndicator,
} from "react-native";

//Providers
import { useAuth } from "../providers/AuthProvider.js";

//Styles
import universalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import buttonStyles from "../styles/ButtonStyles";

const initialStates = {
  addr: "",
  pass: "",
  confirmPass: "",

  addrError: false,
  passError: false,
  confirmPassError: false,

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
    case "CONF_PASSWORD":
      return { ...state, confirmPass: action.payload, errorMessage: "" };
    case "CONF_PASSWORD_ERROR":
      return { ...state, confirmPassError: action.payload };
    case "ERROR_MSG":
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};

export default function Signup({ navigation }) {
  const { signUp } = useAuth();

  const [state, dispatch] = useReducer(reducer, initialStates);

  const [signingUp, setSigningUp] = useState(false);

  const onPressSignUp = async () => {
    if (
      state.addr.length === 0 ||
      state.pass.length === 0 ||
      state.confirmPass.length === 0 ||
      state.pass !== state.confirmPass ||
      !(state.addr.includes("@") || state.addr.includes(".com"))
    ) {
      if (state.addr.length === 0) {
        dispatch({ type: "ADDRESS_ERROR", payload: true });
      }
      if (state.pass.length === 0) {
        dispatch({ type: "PASSWORD_ERROR", payload: true });
      }
      if (state.confirmPass.length === 0) {
        dispatch({ type: "CONF_PASSWORD_ERROR", payload: true });
      }
      if (state.pass !== state.confirmPass) {
        dispatch({ type: "ERROR_MSG", payload: "Passwords do not match" });
      }
      if (!(state.addr.includes("@") || state.addr.includes(".com"))) {
        dispatch({
          type: "ERROR_MSG",
          payload: "Invalid email address entered",
        });
      }
    } else {
      try {
        setSigningUp(true);

        await signUp(state.addr, state.pass);

        setSigningUp(false);

        Alert.alert("Success", state.addr + " has been added successfully.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      } catch (error) {
        dispatch({
          type: "ERROR_MSG",
          payload: error.message,
        });
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
          <Text style={styles.error_message}>{state.errorMessage}</Text>
        </View>

        <View style={universalStyles.input_fields_container_1}>
          {state.addr === "" ? null : (
            <Text style={{ marginBottom: 5 }}>Email Address</Text>
          )}
          <TextInput
            placeholder="Email Address"
            autoCapitalize="none"
            onChangeText={(text) =>
              dispatch({ type: "ADDRESS", payload: text })
            }
            onFocus={() => dispatch({ type: "ADDRESS_ERROR", payload: false })}
            style={[
              inputStyles.signup_input,
              { borderColor: state.addrError ? "red" : "transparent" },
            ]}
          />

          {state.pass === "" ? null : (
            <Text style={{ marginBottom: 5 }}>Password</Text>
          )}
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) =>
              dispatch({ type: "PASSWORD", payload: text })
            }
            onFocus={() => dispatch({ type: "PASSWORD_ERROR", payload: false })}
            style={[
              inputStyles.signup_input,
              { borderColor: state.passError ? "red" : "transparent" },
            ]}
          />

          {state.confirmPass === "" ? null : (
            <Text style={{ marginBottom: 5 }}>Confirm Password</Text>
          )}
          <TextInput
            placeholder="Confirm Password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) =>
              dispatch({ type: "CONF_PASSWORD", payload: text })
            }
            onFocus={() =>
              dispatch({ type: "CONF_PASSWORD_ERROR", payload: false })
            }
            style={[
              inputStyles.signup_input,
              { borderColor: state.confirmPassError ? "red" : "transparent" },
            ]}
          />

          <Pressable
            style={buttonStyles.p_button_login}
            onPress={onPressSignUp}
          >
            {loggingIn ? (
              <ActivityIndicator color="#ffffff" size={24} />
            ) : (
              <Text style={buttonStyles.p_button_text}>Sign Up</Text>
            )}
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
