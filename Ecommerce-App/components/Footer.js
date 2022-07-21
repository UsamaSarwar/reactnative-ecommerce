import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
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
  FlatList,
} from "react-native";
import styles from "../styles/Styles.js";

export default function Footer({ navigation, route }) {
  const { user, signOut } = useAuth();
  const admin = user.customData["userType"] === "admin" ? true : false;
  const AdminPanel = () => {
    return (
      <Icon
        style={styles.plusIcon}
        name="plus"
        size={30}
        color="#900"
        onPress={() => {
          navigation.navigate("Addproduct");
        }}
      />
    );
  };
  return (
    <View>
      <View style={styles.footer}>
        <Icon
          style={styles.icon}
          name="logout"
          onPress={() =>
            Alert.alert("Are you sure you want to Log Out?", null, [
              {
                text: "Yes, Log Out",
                style: "destructive",
                onPress: () => {
                  console.log("signing out");
                  signOut();
                  navigation.navigate("Login");
                },
              },
              { text: "Cancel", style: "cancel" },
            ])
          }
        />
        <Icon
          style={styles.icon}
          name="user"
          size={30}
          color="#900"
          onPress={() => {
            navigation.navigate("Setting");
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          top: 0,
          left: 0,
          right: 0,
          bottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {admin ? AdminPanel() : void 0}
      </View>
    </View>
  );
}
