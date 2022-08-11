import React, { useState } from "react";
// import app from "../realmApp";
import { useAuth } from "../providers/AuthProvider.js";
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

import UniversalStyles from "../styles/UniversalStyles.js";
import InputStyles from "../styles/InputStyles.js";
import TextStyles from "../styles/TextStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";

export default function Deleteaccount({ navigation }) {
  const { signOut, user, deleteUser } = useAuth();
  const [text, setText] = useState("");
  return (
    <View style={UniversalStyles.page_container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={UniversalStyles.background_image}
      >
        <View style={UniversalStyles.fields}>
          <Text style={TextStyles.error_message}>
            Please write "DELETE ACCOUNT" below:
          </Text>
          <TextInput
            style={InputStyles.textInput}
            placeholder="Confirmation Text"
            onChangeText={(text) => setText(text)}
          />
          <Pressable
            style={ButtonStyles.p_button_login}
            onPress={() =>
              Alert.alert(
                "Are you sure you want to delete this account?",
                null,
                [
                  {
                    text: "Yes, Delete Account",
                    style: "destructive",
                    onPress: () => {
                      console.log("Deleting Account");
                      if (text === "DELETE ACCOUNT") {
                        deleteUser(user);
                        signOut(); //To locally signout the user
                        navigation.navigate("Login");
                        Alert.alert(
                          "Your account has been successfully deleted"
                        );
                      } else {
                        Alert.alert("Confirmation text not valid");
                      }
                    },
                  },
                  { text: "Cancel", style: "cancel" },
                ]
              )
            }
          >
            <Text style={ButtonStyles.p_button_text}>Delete Account</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
