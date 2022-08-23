import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider.js";
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";

//Icon Component
import IonIcon from "react-native-vector-icons/Ionicons";

//Styles
import styles from "../styles/Styles.js";
import UniversalStyles from "../styles/UniversalStyles.js";
import InputStyles from "../styles/InputStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";

export default function Updatepassword({ navigation }) {
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const { user, resetPass, signOut } = useAuth();

  const [confPassError, setConfPassError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const onPressUpdatePass = async () => {
    if (confirmNewPass === "") {
      setErrorMessage("New password is empty");
    } else if (confirmNewPass !== newPass) {
      setErrorMessage("New passwords does not match.");
    } else if (newPass.length < 6 || newPass.length > 128) {
      setErrorMessage("Password must be between 6 and 128 characters");
    } else {
      Alert.alert("Your password will be changed", null, [
        {
          text: "Confirm",
          style: "destructive",
          onPress: () => {
            resetPass(user.customData["name"], newPass);
            signOut();
          },
        },
        { text: "Cancel", style: "cancel" },
      ]);
    }
  };

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
            <Text style={{ fontSize: 23 }}>Update password</Text>
          </View>
          <View style={UniversalStyles.center}>
            <Text style={styles.error_message}>{errorMessage}</Text>
          </View>

          <View style={UniversalStyles.input_fields_container_1}>
            <TextInput
              style={[
                InputStyles.textInput,
                { borderColor: passError ? "red" : "transparent" },
              ]}
              placeholder="New Password"
              secureTextEntry={true}
              onChangeText={(text) => setNewPass(text)}
            />
            <TextInput
              style={[
                InputStyles.textInput,
                { borderColor: confPassError ? "red" : "transparent" },
              ]}
              placeholder="Confirm New Password"
              secureTextEntry={true}
              onChangeText={(text) => setConfirmNewPass(text)}
            />
            <Pressable
              style={ButtonStyles.p_button_login}
              onPress={() => onPressUpdatePass()}
            >
              <Text style={ButtonStyles.p_button_text}>Update Password</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
