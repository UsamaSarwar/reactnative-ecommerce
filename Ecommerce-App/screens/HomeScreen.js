import React from "react";
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

import styles from "../styles/Styles.js";
import Updatepassword from "./UpdatePassword.js";
import Deleteaccount from "./DeleteAccount.js";

export default function Homescreen({ navigation }) {
  // console.log(app.currentUser.identities);
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.logoView}>
          <Image
            source={require("../assets/hu_logo.png")}
            style={styles.logo}
          ></Image>
        </View>

        <Pressable
          style={styles.p_button}
          onPress={() => navigation.navigate(Updatepassword)}
        >
          <Text style={styles.p_button_text}>Update Password</Text>
        </Pressable>

        <Pressable
          style={styles.p_button}
          onPress={() => navigation.navigate(Deleteaccount)}
        >
          <Text style={styles.p_button_text}>Delete Account</Text>
        </Pressable>

        <Pressable
          style={styles.p_button}
          onPress={() =>
            Alert.alert("Are you sure?", null, [
              {
                text: "Yes, Log Out",
                style: "destructive",
                onPress: () => {
                  console.log("signing out");
                  signOut();
                  navigation.popToTop();
                },
              },
              { text: "Cancel", style: "cancel" },
            ])
          }
        >
          <Text style={styles.p_button_text}>Sign Out</Text>
        </Pressable>
        <Text style={styles.random_text}>
          This is Home Screen for {user ? user.customData["name"] : ""}
        </Text>
      </ImageBackground>
    </View>
  );
}
