//React
import React, { useRef, useEffect } from "react";

//React Components
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Alert,
  BackHandler,
  FlatList,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";

//Providers
import { useAuth } from "../providers/AuthProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";

//Components
import HomeHeader from "../components/Headers/HomeHeader.js";
import Category from "../components/Category.js";
import Stats from "../components/Stats_Homescreen.js";
import ProductItem from "../components/Items/ProductItem.js";
import AdminSlideUpCard from "../components/SlideUpCards/AdminUserSlideUpCard.js";
import UserSlideUpCard from "../components/SlideUpCards/UserSlideUpCard.js";
import Footer from "../components/Footer.js";

//Styles
import universalStyles from "../styles/UniversalStyles.js";

export default function Homescreen({ navigation }) {
  const { user } = useAuth();

  const admin = user.customData["userType"] === "admin" ? true : false;

  const elementRef = useRef();

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    }
  };

  return (
    <SafeAreaView style={universalStyles.page_container}>
      <View style={universalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={universalStyles.background_image}
        >
          <HomeHeader navigation={navigation} />

          <Category />

          {admin ? <Stats /> : null}

          <ProductItem navigation={navigation} elementRef={elementRef} />

          <Footer navigation={navigation} elementRef={elementRef} />

          <SlidingUpPanel
            allowDragging={true}
            allowMomentum={true}
            ref={(c) => (elementRef.current = c)}
          >
            {admin ? (
              <AdminSlideUpCard elementRef={elementRef} />
            ) : (
              <UserSlideUpCard elementRef={elementRef} />
            )}
          </SlidingUpPanel>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
