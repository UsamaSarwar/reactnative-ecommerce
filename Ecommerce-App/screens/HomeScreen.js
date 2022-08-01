//React
import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Alert,
  BackHandler,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import SlidingUpPanel from "rn-sliding-up-panel";

//Providers
import { useAuth } from "../providers/AuthProvider.js";

//Styles
import universalStyles from "../styles/UniversalStyles.js";

//Components
import ProductItem from "../components/ProductItem.js";
import Footer from "../components/Footer.js";
import UserSlideUpCard from "../components/UserSlideUpCard.js";
import AdminSlideUpCard from "../components/AdminUserSlideUpCard.js";
import { trusted } from "mongoose";

export default function Homescreen({ navigation }) {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  const admin = user.customData["userType"] === "admin" ? true : false;

  const elementRef = useRef();

  const [data, setData] = useState("");
  const [edit, setEdit] = useState(true);
  const [isClosed, setIsClosed] = useState(false);
  const onPanelClose = () => {
    setData({ name: "", category: "", price: "", description: "" });
    setIsClosed(true);
  };

  const childToParent = (childData) => {
    setData(childData);
    setIsClosed(false);
  };

  const childToParent_edit = (childData) => {
    setEdit(childData);
  };

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <SafeAreaView style={universalStyles.flex1}>
      <View style={universalStyles.main}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={universalStyles.image}
        >
          <View style={universalStyles.header}>
            <Text style={{ fontSize: 23 }}>
              Welcome, {user.customData.email}
            </Text>
            <IonIcon name="search" size={32} />
          </View>

          <ProductItem
            navigation={navigation}
            user={user}
            elementRef={elementRef}
            childToParent={childToParent}
            childToParent_edit={childToParent_edit}
            setData={setData}
          />
          <Footer
            navigation={navigation}
            childToParent={childToParent}
            childToParent_edit={childToParent_edit}
            elementRef={elementRef}
          />
          <SlidingUpPanel
            allowDragging={true}
            allowMomentum={true}
            ref={(c) => (elementRef.current = c)}
            onBottomReached={() => onPanelClose()}
          >
            {admin ? (
              <AdminSlideUpCard
                data={data}
                toEdit={edit}
                isClosed={isClosed}
                elementRef={elementRef}
              />
            ) : (
              <UserSlideUpCard data={data} isClosed={isClosed} />
            )}
          </SlidingUpPanel>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
