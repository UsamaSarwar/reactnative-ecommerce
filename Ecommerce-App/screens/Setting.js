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
import ImagePicker from "react-native-image-crop-picker";
import SlidingUpPanel from "rn-sliding-up-panel";

import styles from "../styles/Styles.js";
import Updatepassword from "./UpdatePassword.js";
import Deleteaccount from "./DeleteAccount.js";
import Footer from "../components/Footer.js";
import AdminSlideUpCard from "../components/SlideUpCards/AdminUserSlideUpCard.js";

import UniversalStyles from "../styles/UniversalStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";
import IconStyles from "../styles/IconStyles.js";

export default function Setting({ navigation }) {
  const { user, signOut, updateAvatar, image, imageForm } = useAuth();

  const elementRef = useRef();
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  const openImagePicker = () =>
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      updateAvatar(image.data, image.mime);
    });

  return (
    <View style={UniversalStyles.page_container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={UniversalStyles.image}
      >
        {/* <View style={styles.logoView}></View> */}
        <View style={universalStyles.avatar_container}>
          <Image
            // source={require("../assets/image.jpg")}
            source={{
              uri: `data:${imageForm};base64,${image}`,
            }}
            style={productCardStyles.avatarImage}
          />
          <View
            style={[
              IconStyles.background3,
              {
                top: "90%",
                right: "10%",
                position: "absolute",
                alignSelf: "flex-end",
              },
            ]}
          >
            <Icon
              name="edit"
              color={"#ffffff"}
              size={24}
              onPress={() => openImagePicker()}
            />
          </View>
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
        <Footer navigation={navigation} elementRef={elementRef} />

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
