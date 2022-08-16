//React
import React, { useState } from "react";

//React Components
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Alert,
} from "react-native";
import NumberFormat from "react-number-format";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Icons
import Icon from "react-native-vector-icons/AntDesign";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import IonIcon from "react-native-vector-icons/Ionicons";

//Providers
import { useTasks } from "../../providers/TasksProvider";
import { useOrder } from "../../providers/OrderProvider";
import { useGlobal } from "../../providers/GlobalProvider";
import { useAuth } from "../../providers/AuthProvider";

//Components
import Shimmer from "../Shimmer";

//Styles
import universalStyles from "../../styles/UniversalStyles";
import productCardStyles from "../../styles/ProductCardStyle";
import IconStyles from "../../styles/IconStyles";
import UniversalStyles from "../../styles/UniversalStyles.js";

export default function OrderItemAdmin({ elementRef }) {
  const { user } = useAuth();
  const { orders, orderDetails, userOrders } = useOrder();
  const userOrderList = userOrders(user.customData._id);
  const animationTime = 800;
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(
    userOrderList.reduce((obj, v) => {
      obj[v.orderNumber] = true;
      return obj;
    }, {})
  );
  const animateItems = (item) => {
    const allItems = orderDetails(item.orderItems);
    for (let x = 0; x < allItems.length; x++) {
      elementRef[String(item.orderNumber) + allItems[x][0]._id].lightSpeedIn(
        animationTime + animationTime * x * 0.3
      );
    }
  };
  if (orders.length > 0 && loading) {
    setLoading(false);
  }

  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
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
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                      Order# {item.orderNumber}
                    </Text>
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
                    <View>
                      <Text>Placed on: {item.orderTime}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor:
                        item.orderStatus === "Processing" ? "silver" : "green",
                      borderRadius: 10,
                      justifyContent: "center",
                      width: 80,
                      height: 30,
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>{item.orderStatus}</Text>
                  </View>
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{ flex: 1, height: 1, backgroundColor: "black" }}
                />
                <View
                  style={{ flex: 1, height: 1, backgroundColor: "black" }}
                />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
