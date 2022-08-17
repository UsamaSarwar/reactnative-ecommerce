import React, { useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  SafeAreaView,
} from "react-native";

import { useOrder } from "../providers/OrderProvider.js";

import OrderItemUser from "../components/Items/OrderItemUser.js";

import UniversalStyles from "../styles/UniversalStyles.js";
import IonIcon from "react-native-vector-icons/Ionicons";

export default function MyOrders({ navigation }) {
  const { orders } = useOrder();

  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={UniversalStyles.background_image}
        >
          <View style={[UniversalStyles.header]}>
            <Pressable onPress={() => navigation.goBack()}>
              <IonIcon name="arrow-back" size={30} color="grey" />
            </Pressable>
            <Text style={{ fontSize: 23 }}>My Orders ({orders.length})</Text>
          </View>

          <OrderItemUser />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
