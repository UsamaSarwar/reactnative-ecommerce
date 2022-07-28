import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider.js";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  Alert,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";

import styles from "../styles/Styles.js";
import NumberFormat from "react-number-format";

import Footer from "../components/Footer.js";

export default function Setting({ navigation, route }) {
  const { user } = useAuth();
  const { cart, total } = route.params;
  console.log(total);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            justifyContent: "space-between",
            opacity: 0.9,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 23 }}>Checkout</Text>
        </View>
        <View style={styles.fields}>
          <Text style={{ fontSize: 20, marginTop: 10 }}>Order Summary</Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <FlatList
            extraData={cart}
            data={cart}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "white",
                  opacity: 0.9,
                  padding: 10,
                  margin: 10,
                  borderRadius: 10,
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#f3f3f3",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: `data:${item[0].imageForm};base64,${item[0].image}`,
                    }}
                    style={{
                      height: 45,
                      width: 45,
                      borderRadius: 10,
                    }}
                  />
                </View>

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {item[0].name}
                  </Text>
                </View>

                <NumberFormat
                  value={parseInt(item[0].price)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"PKR "}
                  renderText={(value) => (
                    <Text
                      style={{
                        fontSize: 16,
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      {value}
                    </Text>
                  )}
                />
              </View>

              // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            )}
          />
        </View>

        <Footer navigation={navigation} />
      </ImageBackground>
    </View>
  );
}
