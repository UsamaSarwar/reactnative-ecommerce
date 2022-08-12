import React, { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
// import app from "../realmApp";
import { useAuth } from "../providers/AuthProvider.js";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  Alert,
  Image,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import SlidingUpPanel from "rn-sliding-up-panel";

import styles from "../styles/Styles.js";
import Updatepassword from "./UpdatePassword.js";
import Deleteaccount from "./DeleteAccount.js";
import Footer from "../components/Footer.js";
import AdminSlideUpCard from "../components/SlideUpCards/AdminUserSlideUpCard.js";

import UniversalStyles from "../styles/UniversalStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";
import TextStyles from "../styles/TextStyles.js";

export default function Setting({ navigation, route }) {
  const { user, signOut, personalDetails } = useAuth();

  const elementRef = useRef();
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  return (
    <View style={UniversalStyles.page_container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={UniversalStyles.image}
      >
        <View style={universalStyles.avatar_container}>
          <Image
            source={{
              uri: `data:${personalDetails.imageForm};base64,${personalDetails.image}`,
            }}
            style={productCardStyles.avatarImage}
          />
          <Text style={TextStyles.name_banner}>{personalDetails.name}</Text>
          <Text style={TextStyles.userName_banner}>
            {personalDetails.userName}
          </Text>
        </View>

        <View style={UniversalStyles.fields}>
          <Pressable
            style={ButtonStyles.p_button}
            onPress={() => {
              navigation.navigate("Personaldetails");
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <IonIcon
                name="person-outline"
                size={25}
                color="white"
                style={{ marginRight: 15 }}
              />
              <Text style={ButtonStyles.p_button_text}>
                Update Personal Detail
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={ButtonStyles.p_button}
            onPress={() => navigation.navigate(Updatepassword)}
          >
            <IonIcon
              name="key-outline"
              size={25}
              color="white"
              style={{ marginRight: 15 }}
            />
            <Text style={ButtonStyles.p_button_text}>Update Password</Text>
          </Pressable>

          <Pressable
            style={ButtonStyles.p_button}
            onPress={() => navigation.navigate(Deleteaccount)}
          >
            <IonIcon
              name="trash-outline"
              size={25}
              color="white"
              style={{ marginRight: 15 }}
            />
            <Text style={ButtonStyles.p_button_text}>Delete Account</Text>
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
            <IonIcon name="log-out-outline" size={21} color="#AAAAAA" />
            <Text style={styles.s_button_text}>Log Out</Text>
          </Pressable>
        </View>
        <Footer navigation={navigation} route={route} elementRef={elementRef} />

        <SlidingUpPanel
          allowDragging={true}
          allowMomentum={true}
          ref={(c) => (elementRef.current = c)}
        >
          <AdminSlideUpCard elementRef={elementRef} />
        </SlidingUpPanel>
      </ImageBackground>
    </View>
  );
}
