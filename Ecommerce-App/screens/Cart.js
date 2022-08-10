//React
import React, { useEffect } from "react";
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
import Snackbar from "react-native-snackbar";

//Providers
import { useAuth } from "../providers/AuthProvider.js";
import { useTasks } from "../providers/TasksProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";

//Components
import Footer from "../components/Footer.js";
import CarItem from "../components/CartItem.js";

//Styles
import UniversalStyles from "../styles/UniversalStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";

export default function Cart({ navigation }) {
  const { shoppingCart, cartDetails, cartTotal } = useTasks();
  const { cartUpdate } = useGlobal();

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
            <CarItem />
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

          <Footer navigation={navigation} />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
