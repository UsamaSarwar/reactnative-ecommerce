import React, { useState, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/AntDesign";
// import app from "../realmApp";
import { useAuth } from "../providers/AuthProvider.js";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import NumberFormat from "react-number-format";

import UniversalStyles from "../styles/UniversalStyles.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOrder } from "../providers/OrderProvider.js";

//Animation-Component
import * as Animatable from "react-native-animatable";

export default function MyOrders({ navigation }) {
  const { user } = useAuth();
  const { orders, orderDetails } = useOrder();
  const [view, setView] = useState(
    orders.reduce((obj, v) => {
      obj[v.orderNumber] = true;
      return obj;
    }, {})
  );
  const animationTime = 800;
  const [refresh, setRefresh] = useState(false);
  const elementRef = useRef();
  // console.log(orders);
  const animateItems = (item) => {
    const allItems = orderDetails(item.orderItems);
    for (let x = 0; x < allItems.length; x++) {
      elementRef[String(item.orderNumber) + allItems[x][0]._id].lightSpeedIn(
        animationTime + animationTime * x * 0.3
      );
    }
  };
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

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
            <Text style={{ fontSize: 23 }}>My Orders</Text>
          </View>

          <FlatList
            data={orders}
            showsVerticalScrollIndicator={false}
            style={{ margin: 10, borderRadius: 15 }}
            renderItem={({ item }) => (
              <View>
                <View
                  style={[
                    productCardStyles.productCard,
                    {
                      justifyContent: "space-between",
                      flexDirection: "column",
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        Order #{item.orderNumber}
                      </Text>

                      <Text style={{ marginLeft: 12 }}>
                        {item.paymentMethod}
                      </Text>
                    </View>

                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor:
                          item.orderStatus === "Processing"
                            ? "silver"
                            : "green",
                        borderRadius: 10,
                        justifyContent: "center",
                        width: 80,
                      }}
                    >
                      <Text style={{ fontSize: 12 }}>{item.orderStatus}</Text>
                    </View>
                  </View>
                  <View>
                    <Text>Placed on: {item.orderTime}</Text>
                  </View>

                  <FlatList
                    data={orderDetails(item.orderItems)}
                    horizontal={view[item.orderNumber]}
                    showsHorizontalScrollIndicator={false}
                    style={{
                      marginBottom: 10,
                      borderBottomEndRadius: 15,
                      borderBottomStartRadius: 15,
                      backgroundColor: "#f6f8f9",
                      padding: 10,
                    }}
                    renderItem={({ item: orderItem }) => (
                      <Animatable.View
                        ref={(here) =>
                          (elementRef[
                            String(item.orderNumber) + orderItem[0]._id
                          ] = here)
                        }
                      >
                        <Pressable
                          onPress={() => {
                            let new_view = view;
                            new_view[item.orderNumber] =
                              !new_view[item.orderNumber];
                            setView(new_view);
                            setRefresh(!refresh);
                            setTimeout(
                              () =>
                                !new_view[item.orderNumber]
                                  ? animateItems(item)
                                  : void 0,
                              0.1
                            );
                          }}
                          style={[
                            universalStyles.row_f1_sb_c,
                            {
                              padding: 5,
                              backgroundColor: "white",
                              margin: 5,
                              borderRadius: 10,
                            },
                          ]}
                        >
                          <View
                            style={[
                              universalStyles.centered_container,
                              { flexDirection: "row" },
                            ]}
                          >
                            <Image
                              source={{
                                uri: `data:${orderItem[0].imageForm};base64,${orderItem[0].image}`,
                              }}
                              style={{ height: 40, width: 40, borderRadius: 5 }}
                            />
                            <View
                              style={[
                                universalStyles.centered_container,
                                {
                                  backgroundColor: "#f6f8f9",
                                  marginLeft: 7,
                                  borderRadius: 100,
                                  padding: 4,
                                },
                              ]}
                            >
                              <Text
                                style={{
                                  fontSize: 12,
                                }}
                              >
                                x{orderItem[1]}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={[
                              universalStyles.row_f1_sb_c,
                              {
                                flexWrap: "wrap",
                                marginLeft: 7,
                                marginRight: 7,
                              },
                            ]}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                              }}
                            >
                              {orderItem[0].name}
                            </Text>
                          </View>
                        </Pressable>
                      </Animatable.View>
                    )}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                      Order Total
                    </Text>
                    <NumberFormat
                      value={item.total}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"PKR "}
                      renderText={(value) => (
                        <Text style={{ fontSize: 25 }}>{value}</Text>
                      )}
                    />
                  </View>
                </View>
              </View>
            )}
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
