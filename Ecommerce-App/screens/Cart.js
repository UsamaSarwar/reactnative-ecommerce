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
import { useOrder } from "../providers/OrderProvider.js";

//Components
import Footer from "../components/Footer.js";
import CarItem from "../components/CartItem.js";
import CartSlideUpCard from "../components/CartSlideUpCard.js";

//Styles
import UniversalStyles from "../styles/UniversalStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";
import { useAuth } from "../providers/AuthProvider.js";

export default function Cart({ navigation }) {
  const { shoppingCart, cartDetails, cartTotal } = useTasks();
  const { cartUpdate } = useGlobal();
  const { orders, createOrder } = useOrder();
  const { userCart } = useAuth();

  const elementRef = useRef();

  useEffect(() => {
    cartDetails();
  }, [cartUpdate]);

  console.log(orders);

  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={UniversalStyles.background_image}
        >
          <View style={UniversalStyles.header}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 23, fontWeight: "bold" }}>Total</Text>

              <NumberFormat
                value={cartTotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"PKR "}
                renderText={(value) => (
                  <Text style={{ fontSize: 23 }}>{value}</Text>
                )}
              />
            </View>
            <Pressable
              style={ButtonStyles.checkout_button}
              onPress={() => {
                navigation.navigate("Checkout");
              }}
            >
              <Text
                style={[ButtonStyles.checkout_button_text, { marginRight: 15 }]}
              >
                Checkout
              </Text>
              <IonIcon name="arrow-forward" size={24} color="white" />
            </Pressable>
          </View>

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

          <Pressable
            style={ButtonStyles.checkout_button}
            onPress={() => createOrder("A", 222, "33", userCart)}
          >
            <Text
              style={[ButtonStyles.checkout_button_text, { marginRight: 15 }]}
            >
              Order
            </Text>
          </Pressable>

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
