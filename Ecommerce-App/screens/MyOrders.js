import React, { useEffect, useRef } from "react";
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
import Footer from "../components/Footers/Footer.js";
import AdminSlideUpCard from "../components/SlideUpCards/AdminUserSlideUpCard.js";

import UniversalStyles from "../styles/UniversalStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";
import TextStyles from "../styles/TextStyles.js";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyOrders({ navigation, route }) {
  const { user } = useAuth();
  const elementRef = useRef();
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={UniversalStyles.background_image}
        >
          <Footer
            navigation={navigation}
            route={route}
            elementRef={elementRef}
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
