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
  Alert,
} from "react-native";

export default function Homescreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text>This is Home Screen</Text>
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
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textShadowColor: "grey",
    textShadowRadius: 10,
  },
});
