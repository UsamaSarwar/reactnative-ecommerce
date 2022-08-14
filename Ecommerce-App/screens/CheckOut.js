import React, { useState, useRef } from "react";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";

import { useAuth } from "../providers/AuthProvider.js";

import CheckoutHeader from "../components/Headers/CheckoutHeader.js";
import CheckoutItem from "../components/Items/CheckoutItem.js";
import CheckoutFooter from "../components/Footers/CheckoutFooter.js";

import UniversalStyles from "../styles/UniversalStyles.js";
import IconStyles from "../styles/IconStyles.js";

export default function Checkout({ navigation }) {
  const { personalDetails } = useAuth();

  const [payMethod, setPayMethod] = useState(false);

  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={UniversalStyles.background_image}
        >
          <CheckoutHeader navigation={navigation} />

          <View
            style={[
              UniversalStyles.input_fields_container_1,
              { paddingBottom: 0 },
            ]}
          >
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Shipping Details
              </Text>
              <Pressable
                style={[IconStyles.background3, { marginLeft: 5 }]}
                onPress={() => navigation.navigate("Personaldetails")}
              >
                <Icon name="edit" size={18} color={"white"} />
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <IonIcon name="home-outline" color={"#42C88F"} size={27} />
              <Text style={{ marginLeft: 7 }}>
                {personalDetails.address} ({personalDetails.postalCode})
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <IonIcon name="location-outline" color={"#42C88F"} size={27} />
              <Text style={{ marginLeft: 7 }}>
                {personalDetails.city}, {personalDetails.province},
                {personalDetails.country}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IonIcon name="call-outline" color={"#42C88F"} size={27} />
              <Text style={{ marginLeft: 7 }}>
                {personalDetails.phoneNumber}, {personalDetails.altPhoneNumber}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", marginBottom: 10, marginTop: 20 }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Payment Method
              </Text>

              <Text
                style={{
                  fontWeight: "100",
                  fontStyle: "italic",
                  fontSize: 20,
                  marginLeft: 5,
                }}
              >
                {payMethod ? "Card" : "COD"}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Pressable
                style={{
                  backgroundColor: payMethod ? "white" : null,
                  padding: 30,
                  borderRadius: 100,
                }}
                onPress={() => setPayMethod(!payMethod)}
              >
                <Image
                  source={require("../assets/credit-card.png")}
                  style={{ height: 50, width: 50 }}
                />
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: payMethod ? null : "white",
                  padding: 30,
                  borderRadius: 100,
                }}
                onPress={() => setPayMethod(!payMethod)}
              >
                <Image
                  source={require("../assets/cash-on-delivery.png")}
                  style={{ height: 50, width: 50 }}
                />
              </Pressable>
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}>
              Order Summary
            </Text>
          </View>
          <CheckoutItem />

          <CheckoutFooter navigation={navigation} />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
