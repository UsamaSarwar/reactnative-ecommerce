import React, { useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";

import { useOrder } from "../providers/OrderProvider.js";

import OrderItemUser from "../components/Items/OrderItemUser.js";

import UniversalStyles from "../styles/UniversalStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";

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
            <Text style={{ fontSize: 23 }}>My Orders ({orders.length})</Text>
          </View>
          {orders.length === 0 ? (
            <View style={[UniversalStyles.center, { marginTop: 50 }]}>
              <Image
                source={require("../assets/emptyOrders.png")}
                style={{
                  height: 400,
                  width: 400,
                }}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 20 }}>There are no orders yet</Text>
                <MatIcon
                  style={{ marginLeft: 3 }}
                  name="emoticon-sad-outline"
                  size={30}
                  color="black"
                />
              </View>
              <Pressable
                style={[ButtonStyles.p_button, { marginTop: 5 }]}
                onPress={() => navigation.navigate("Homescreen")}
              >
                <IonIcon
                  name="cart-outline"
                  size={25}
                  color="white"
                  style={{ marginRight: 10 }}
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
