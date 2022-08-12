//React
import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import NumberFormat from "react-number-format";
import SlidingUpPanel from "rn-sliding-up-panel";
import Snackbar from "react-native-snackbar";

//Providers
import { useTasks } from "../providers/TasksProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";

//Components
import CartHeader from "../components/Headers/CartHeader.js";
import CarItem from "../components/Items/CartItem.js";
import Footer from "../components/Footer.js";
import CartSlideUpCard from "../components/SlideUpCards/CartSlideUpCard.js";

//Styles
import UniversalStyles from "../styles/UniversalStyles.js";

export default function Cart({ navigation }) {
  const { shoppingCart, cartDetails } = useTasks();
  const { cartUpdate } = useGlobal();

  const elementRef = useRef();

  useEffect(() => {
    cartDetails();
  }, [cartUpdate]);

  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={UniversalStyles.background_image}
        >
          <CartHeader />

          {shoppingCart.length ? (
            <CarItem elementRef={elementRef} />
          ) : (
            <View style={UniversalStyles.center}>
              <Image
                source={require("../assets/cartIsEmptyCrop.png")}
                style={{
                  height: 400,
                  width: 400,
                }}
              />
            </View>
          )}

          <Footer navigation={navigation} elementRef={elementRef} />

          <SlidingUpPanel
            allowDragging={true}
            allowMomentum={true}
            ref={(c) => (elementRef.current = c)}
          >
            <CartSlideUpCard elementRef={elementRef} />
          </SlidingUpPanel>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
