//React
import React, { useState, useEffect } from "react";

//React Components
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import NumberFormat from "react-number-format";
import { ProgressBar } from "react-native-paper";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";

//Providers
import { useOrder } from "../../providers/OrderProvider";

//Components
import Shimmer from "../Shimmer";

//Styles

import productCardStyles from "../../styles/ProductCardStyle";
import UniversalStyles from "../../styles/UniversalStyles.js";
import { useGlobal } from "../../providers/GlobalProvider";

export default function OrderItemAdmin({ elementRef, setSlideLoading }) {
  const { orders, getCustomerDetails } = useOrder();
  const { currOrder, setCurrOrder, setCustomer, searchText, listType } =
    useGlobal();

  const animationTime = 1500;

  const [loading, setLoading] = useState(true);

  if (orders.length > 0 && loading) {
    setLoading(false);
  }

  const renderOrderSlide = (item) => {
    if (item.customerid !== "") {
      elementRef.current.show();
      setCurrOrder(item);
    }
  };

  useEffect(() => {
    setSlideLoading(true);
  }, [currOrder]);

  useEffect(() => {
    setNewCustomer();
  }, [currOrder]);

  const setNewCustomer = async () => {
    const acquiredCustomer = await getCustomerDetails(currOrder.customerid);
    setCustomer(acquiredCustomer);
    setSlideLoading(false);
  };

  const searchOrders =
    listType === "Orders"
      ? orders
          .slice()
          .reverse()
          .filter((item) => {
            return (
              item.orderNumber
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              searchText === "" ||
              item.customerName.toLowerCase().includes(searchText.toLowerCase())
            );
          })
      : orders;

  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <FlatList
          data={searchOrders}
          showsVerticalScrollIndicator={false}
          style={{ margin: 10, borderRadius: 15 }}
          renderItem={({ item }) => (
            <Pressable onPress={() => renderOrderSlide(item)}>
              <Animatable.View
                ref={(here) => (elementRef[item.orderNumber] = here)}
                animation="fadeInLeft"
                duration={animationTime}
                style={[
                  productCardStyles.productCard,
                  {
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
                  <View>
                    <View>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 14,
                          marginBottom: 5,
                        }}
                      >
                        Order# {item.orderNumber}
                      </Text>
                      <View
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      >
                        <View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <IonIcon
                                name="person"
                                size={20}
                                color="rgba(66, 200, 143, 1)"
                                style={{ marginRight: 2 }}
                              />
                              <Text
                                numberOfLines={1}
                                style={{
                                  fontSize: 18,
                                  marginTop: 5,
                                  bottom: 2.5,
                                  fontWeight: "bold",
                                  textShadowColor: "rgba(66, 200, 143, 0.7)",
                                  textShadowOffset: { width: -1, height: 1 },
                                  textShadowRadius: 10,
                                  width: 225,
                                  paddingRight: 5,
                                }}
                              >
                                {item.customerName}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <IonIcon
                                name="cart"
                                size={20}
                                color="rgba(66, 200, 143, 1)"
                                style={{ marginRight: 2 }}
                              />
                              <Text>Items: </Text>

                              <Text style={{ fontWeight: "bold" }}>
                                {item.orderItems.length}
                              </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <IonIcon
                              name="calendar-outline"
                              size={18}
                              color="rgba(66, 200, 143, 1)"
                              style={{ marginRight: 2 }}
                            />
                            <Text>Placed On: </Text>
                            <Text style={{ fontWeight: "bold" }}>
                              {item.orderTime}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            alignItems: "center",
                            backgroundColor:
                              item.orderStatus === "Processing"
                                ? "#BC544B"
                                : item.orderStatus === "Dispatched"
                                ? "#E3B104"
                                : "#87AB69",
                            borderRadius: 10,
                            paddingTop: 5,
                            paddingBottom: 5,
                            width: 100,
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                            {item.orderStatus}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                        {item.paymentMethod}
                      </Text>
                      <Image
                        source={
                          item.paymentMethod === "Card"
                            ? require("../../assets/credit-card.png")
                            : require("../../assets/cash-on-delivery.png")
                        }
                        style={{ height: 15, width: 15, marginLeft: 5 }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: "30%",
                    }}
                  >
                    {/* <ProgressBar
                      progress={
                        item.orderStatus === "Processing"
                          ? 0.2
                          : item.orderStatus === "Dispatched"
                          ? 0.6
                          : item.orderStatus === "Delivered"
                          ? 1
                          : 0
                      }
                      color={"rgba(66, 200, 143, 1)"}
                      // indeterminate={true}
                      style={{ height: 10, borderRadius: 10 }}
                    /> */}
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}></View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <IonIcon
                      name="cash-outline"
                      size={28}
                      color="green"
                      style={{ marginRight: 5 }}
                    />
                    <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                      Total
                    </Text>
                  </View>
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
              </Animatable.View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
