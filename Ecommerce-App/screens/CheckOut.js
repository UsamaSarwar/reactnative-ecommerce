import React, { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { useAuth } from "../providers/AuthProvider.js";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Alert,
  ScrollView,
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
  const [payMethod, setPayMethod] = useState(true);
  console.log(total);
  return (
    // <LinearGradient colors={["#ffffff", "#6bc594"]} style={styles.container}>
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
        {/* <ScrollView> */}
        <View style={styles.fields}>
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
            }}
          >
            <View
              style={{
                margin: 10,
                width: 120,
                height: 120,
                borderWidth: !payMethod ? 1 : 0,
                borderColor: "grey",
                borderRadius: 60,
                // backgroundColor: "seagreen",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Pressable style={styles.p_button} onPress={() => {}}>
                <Text style={styles.checkout_button}>Credit Card</Text>
              </Pressable> */}
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
                margin: 10,
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

                <View style={{ flex: 1, marginLeft: 10, marginRight: 5 }}>
                  <Text style={{ fontSize: 15 }}>{item[0].name}</Text>
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
            )}
          />
        </View>
        {/* <View style={styles.fields}>
          <Text style={{ fontSize: 20, marginTop: 10 }}>Payment Method</Text>
        </View> */}
        {/* </ScrollView> */}

        <Footer navigation={navigation} />
      </ImageBackground>
    </View>
    // </LinearGradient>
  );
}
