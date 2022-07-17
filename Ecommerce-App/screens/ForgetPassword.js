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

function Forgotpass({ navigation, route }) {
  const [addr, setAddr] = React.useState("");
  const [accounts, setAcc] = React.useState(route.params.paramKey);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Image
          source={require("../assets/hu_logo.png")}
          style={styles.logo}
        ></Image>
        <TextInput
          style={styles.inputbox}
          placeholder="Recovery User Name"
          onChangeText={(text) => setAddr(text)}
        />

        <Pressable
          style={styles.p_button}
          onPress={() => {
            if (Object.keys(accounts).includes(addr)) {
              Alert.alert("Recover email have been sent.");
            } else {
              Alert.alert("Error: User does not exist");
            }
          }}
        >
          <Text style={styles.s_button_text}>Send Reset Link</Text>
        </Pressable>

        <Pressable
          style={styles.s_button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.s_button_text}>Go Back</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    padding: 50,
  },
  logo: {
    width: "40%",
    height: "20%",
    top: "10%",
    left: "50%",
    position: "absolute",
  },
  inputbox: {
    height: 45,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowRadius: 100,
    marginBottom: 24,
    paddingLeft: 10,
  },
  p_button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#40e1d1",
    marginBottom: 24,
  },
  p_button_text: {
    fontSize: 21,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  s_button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginBottom: 24,
  },
  s_button_text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textShadowColor: "grey",
    textShadowRadius: 10,
  },
});

export default Forgotpass;
