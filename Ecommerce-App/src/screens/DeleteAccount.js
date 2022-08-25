//React Component
import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";

//Providers
import { useAuth } from "../providers/AuthProvider.js";

//Icon Component
import IonIcon from "react-native-vector-icons/Ionicons";

//Styles
import UniversalStyles from "../styles/UniversalStyles.js";
import InputStyles from "../styles/InputStyles.js";
import TextStyles from "../styles/TextStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";

export default function Deleteaccount({ navigation }) {
  const { signOut, user, deleteUser } = useAuth();
  const [text, setText] = useState("");
  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={UniversalStyles.background_image}
        >
          <View style={[UniversalStyles.header]}>
            <Pressable onPress={() => navigation.goBack()}>
              <IonIcon name="arrow-back" size={30} color="grey" />
            </Pressable>
            <Text style={TextStyles.large_font}>Delete Account</Text>
          </View>
          <View style={UniversalStyles.input_fields_container_1}>
            <Text style={TextStyles.error_message}>
              Please write "DELETE ACCOUNT" below:
            </Text>
            <TextInput
              style={[
                InputStyles.textInput,
                {
                  borderColor: "transparent",
                },
              ]}
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
    </SafeAreaView>
  );
}
