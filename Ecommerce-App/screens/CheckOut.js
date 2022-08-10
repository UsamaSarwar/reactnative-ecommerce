import React, { useState, useRef } from "react";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

import UniversalStyles from "../styles/UniversalStyles.js";

import { useTasks } from "../providers/TasksProvider.js";

import NumberFormat from "react-number-format";

import Footer from "../components/Footer.js";

export default function Setting({ navigation }) {
  const { shoppingCart, cartTotal } = useTasks();
  const [payMethod, setPayMethod] = useState(true);
  const elementRef = useRef();

  return (
    <View style={UniversalStyles.page_container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={UniversalStyles.background_image}
      >
        <View style={UniversalStyles.header}>
          <Text style={{ fontSize: 23 }}>Checkout</Text>
        </View>
        <ScrollView>
          <View style={UniversalStyles.input_fields_container_1}>
            <Text style={{ fontSize: 20, marginTop: 10 }}>Payment Method</Text>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  marginTop: 10,
                  width: 120,
                  height: 120,
                  borderWidth: !payMethod ? 1 : 0,
                  borderColor: "grey",
                  borderRadius: 60,

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pressable
                  onPress={() => {
                    setPayMethod(false);
                  }}
                >
                  <Image
                    source={require("../assets/credit-card.png")}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 10,
                    }}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  marginTop: 10,
                  width: 120,
                  height: 120,
                  borderWidth: payMethod ? 1 : 0,
                  borderColor: "grey",
                  borderRadius: 60,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pressable
                  onPress={() => {
                    setPayMethod(true);
                  }}
                >
                  <Image
                    source={require("../assets/cash-on-delivery.png")}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 10,
                    }}
                  />
                </Pressable>
              </View>
            </View>
            <Text style={{ fontSize: 20, marginTop: 10 }}>Order Summary</Text>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            {shoppingCart.map((item) => {
              return (
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
                      width: 25,
                      height: 25,
                      borderWidth: 1,
                      borderRadius: 12.5,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <Text>{String(item[1])}</Text>
                  </View>
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
                        height: 40,
                        width: 40,
                        borderRadius: 10,
                      }}
                    />
                  </View>

                  <View style={{ flex: 1, marginLeft: 10, marginRight: 5 }}>
                    <Text style={{ fontSize: 13 }}>{item[0].name}</Text>
                  </View>

                  <NumberFormat
                    value={parseInt(item[0].price * item[1])}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"PKR "}
                    renderText={(value) => (
                      <Text
                        style={{
                          fontSize: 15,
                          color: "green",
                        }}
                      >
                        {value}
                      </Text>
                    )}
                  />
                </View>
              );
            })}
            {/*AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
            <Text style={{ fontSize: 20, marginTop: 10 }}>Total</Text>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <NumberFormat
                value={String(cartTotal)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"PKR "}
                renderText={(value) => (
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 25,
                    }}
                  >
                    {value}
                  </Text>
                )}
              />
            </View>
          </View>
        </ScrollView>
        <Footer navigation={navigation} elementRef={elementRef} />
      </ImageBackground>
    </View>
    // </LinearGradient>
  );
}
