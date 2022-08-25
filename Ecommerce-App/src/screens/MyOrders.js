//React Components
import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";

//Provider
import { useOrder } from "../providers/OrderProvider.js";

//Components
import OrderItemUser from "../components/Items/OrderItemUser.js";

//Styles
import UniversalStyles from "../styles/UniversalStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";
import Styles from "../styles/Styles.js";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function MyOrders({ navigation }) {
  const { orders } = useOrder();

  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={[
            UniversalStyles.background_image,
            {
              justifyContent:
                orders.length === 0 ? "flex-start" : "space-between",
            },
          ]}
        >
          <View style={[UniversalStyles.header]}>
            <Pressable onPress={() => navigation.goBack()}>
              <IonIcon name="arrow-back" size={30} color="grey" />
            </Pressable>
            <Text style={Styles.text_order}>My Orders ({orders.length})</Text>
          </View>
          {orders.length === 0 ? (
            <View style={[UniversalStyles.center, UniversalStyles.marginTop50]}>
              <Image
                source={require("../assets/emptyOrders.png")}
                style={UniversalStyles.cart_empty_img}
              />
              <View style={UniversalStyles.row_center_container}>
                <Text style={Styles.text_empty_order}>
                  There are no orders yet
                </Text>
                <MatIcon
                  style={UniversalStyles.marginLeft3}
                  name="emoticon-sad-outline"
                  size={30}
                  color="black"
                />
              </View>
              <Pressable
                style={[ButtonStyles.p_button, UniversalStyles.marginTop5]}
                onPress={() => navigation.navigate("Homescreen")}
              >
                <IonIcon
                  name="cart-outline"
                  size={25}
                  color="white"
                  style={UniversalStyles.marginRight10}
                />
                <Text style={ButtonStyles.p_button_text}>Shop Now</Text>
              </Pressable>
            </View>
          ) : (
            <OrderItemUser />
          )}
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
