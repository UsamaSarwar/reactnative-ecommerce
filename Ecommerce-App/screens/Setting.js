import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
// import app from "../realmApp";
import { useAuth } from "../providers/AuthProvider.js";
import { Text, View, ImageBackground, Pressable, Alert } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import styles from "../styles/Styles.js";
import Updatepassword from "./UpdatePassword.js";
import Deleteaccount from "./DeleteAccount.js";
import Footer from "../components/Footer.js";

export default function Setting({ navigation, route }) {
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
            <IonIcon name="person-outline" size={32} color="white" />
            <Text style={styles.p_button_text}>Update Personal Detail</Text>
          </Pressable>

          <Pressable
            style={styles.p_button}
            onPress={() => navigation.navigate(Updatepassword)}
          >
            <IonIcon name="key-outline" size={32} color="white" />
            <Text style={styles.p_button_text}>Update Password</Text>
          </Pressable>

          <Pressable
            style={styles.p_button}
            onPress={() => navigation.navigate(Deleteaccount)}
          >
            <IonIcon name="trash-outline" size={32} color="white" />
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
            <IonIcon name="log-out-outline" size={25} color="#AAAAAA" />
            <Text style={styles.s_button_text}>Log Out</Text>
          </Pressable>
        </View>
        <Footer
          navigation={navigation}
          childToParent={route.params.childToParent}
          childToParent_edit={route.params.childToParent_edit}
          elementRef={route.params.elementRef}
        />
      </ImageBackground>
    </View>
  );
}
