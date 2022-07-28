import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
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

import Footer from "../components/Footer.js";

export default function Setting({ navigation }) {
  // console.log(app.currentUser.identities);
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.logoView}></View>
        <View style={styles.fields}>
          <Pressable
            style={styles.p_button}
            // onPress={() => navigation.navigate("Updatedetails")}
          >
            <Text style={styles.p_button_text}>Update Personal Detail</Text>
          </Pressable>

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
            style={styles.s_button}
            onPress={() =>
              Alert.alert("Are you sure you want to Log Out?", null, [
                {
                  text: "Yes, Log Out",
                  style: "destructive",
                  onPress: () => {
                    console.log("signing out");
                    signOut();
                  },
                },
                { text: "Cancel", style: "cancel" },
              ])
            }
          >
            <Text style={styles.s_button_text}>Log Out</Text>
          </Pressable>
        </View>
        <Footer navigation={navigation} />
      </ImageBackground>
    </View>
  );
}
