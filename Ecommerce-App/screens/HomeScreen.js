//React
import React, { useRef, useEffect, useState } from "react";

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
import Footer from "../components/Footers/Footer.js";
import OrderItemAdmin from "../components/Items/OrderItemAdmin.js";

//Styles
import universalStyles from "../styles/UniversalStyles.js";

export default function Homescreen({ navigation, route }) {
  const { user } = useAuth();
  const { searchText } = useGlobal();

  const [listType, setListType] = useState("Inventory");

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

          {admin ? (
            <Stats listType={listType} setListType={setListType} />
          ) : null}

          {listType === "Inventory" ? (
            searchText === "" ? (
              <Category />
            ) : null
          ) : null}
          {listType === "Orders" ? (
            <OrderItemAdmin navigation={navigation} elementRef={elementRef} />
          ) : (
            <ProductItem navigation={navigation} elementRef={elementRef} />
          )}

          <Footer
            navigation={navigation}
            route={route}
            elementRef={elementRef}
          />

          <SlidingUpPanel
            allowDragging={true}
            allowMomentum={true}
            ref={(c) => (elementRef.current = c)}
          >
            {(dragHandler) => (
              <View style={[universalStyles.col_f_e, { paddingTop: 10 }]}>
                <View style={[universalStyles.col_wbg_p20, { paddingTop: 5 }]}>
                  <View
                    style={universalStyles.card_drag_container}
                    {...dragHandler}
                  >
                    <View style={universalStyles.card_dragger} />
                  </View>
                  {admin ? (
                    <AdminSlideUpCard elementRef={elementRef} />
                  ) : (
                    <UserSlideUpCard elementRef={elementRef} />
                  )}
                </View>
              </View>
            )}
          </SlidingUpPanel>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
