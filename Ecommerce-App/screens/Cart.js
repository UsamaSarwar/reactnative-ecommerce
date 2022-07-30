//React
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
  Alert,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import NumberFormat from "react-number-format";

//Providers
import { useAuth } from "../providers/AuthProvider.js";
import { useTasks } from "../providers/TasksProvider.js";

//Components
import Shimmer from "../components/Shimmer";
import Footer from "../components/Footer.js";

//Styles
import styles from "../styles/Styles.js";
import UniversalStyles from "../styles/UniversalStyles.js";
import IconStyles from "../styles/IconStyles.js";

export default function Cart({ navigation, route }) {
  const { updateQuantityCart, removeFromCart, user } = useAuth();
  const { getCart, total } = useTasks();

  const [added, setAdded] = useState(route.params.addition);
  const [render, setRender] = useState(false);
  const [totalPrice, setTotalPrice] = useState(total);
  const [cart, setCart] = useState(getCart(user.customData.memberOf));

  const refreshCart = async () => {
    await user.refreshCustomData();
    await setCart(getCart(user.customData.memberOf));

    setAdded(false);
    setTotalPrice(total);
  };

  if (added && !render) {
    setRender(true);
    refreshCart();
  }

  const makeRemoveButton = (item) => {
    return (
      <View style={IconStyles.background2}>
        <Icon
          name="delete"
          color={"#ff6c70"}
          size={21}
          onPress={async () => {
            await removeFromCart(String(item[0]["_id"]));
            await user.refreshCustomData();
            setTotalPrice(totalPrice - item[0].price * item[1]);
            setCart((prevState) => {
              prevState.splice(prevState.indexOf(item), 1);
              return [...prevState];
            });

            Alert.alert(item.name, "is removed from shopping cart.");
          }}
        />
      </View>
    );
  };

  if (cart.length) {
    //If cart.length is not zero (meaning there are items inside shopping cart)
    return (
      <SafeAreaView style={UniversalStyles.flex1}>
        <View style={UniversalStyles.flex1}>
          <ImageBackground
            source={require("../assets/home.jpeg")}
            resizeMode="cover"
            style={UniversalStyles.image}
          >
            {cart.length === 0 ? null : null}

            <View style={UniversalStyles.header}>
              <Shimmer
                autoRun={true}
                visible={!added}
                style={{ width: 100, height: 30, borderRadius: 15 }}
              >
                <Text style={{ fontSize: 23, fontWeight: "bold" }}>Total</Text>
                <NumberFormat
                  value={totalPrice > 0 ? totalPrice : total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"PKR "}
                  renderText={(value) => (
                    <Text style={{ fontSize: 23 }}>{value}</Text>
                  )}
                />
              </Shimmer>
              <Pressable
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  borderRadius: 15,
                  elevation: 3,
                  backgroundColor: "#40e1d1",
                }}
                onPress={() => {
                  navigation.navigate("Checkout", {
                    total: totalPrice,
                    cart: cart,
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    lineHeight: 18,
                    fontWeight: "bold",
                    letterSpacing: 0.25,
                    color: "white",
                  }}
                >
                  Checkout
                </Text>
              </Pressable>
            </View>

            <FlatList
              extraData={cart}
              data={cart}
              renderItem={({ item }) => (
                <Pressable>
                  <View
                    style={{
                      backgroundColor: "white",
                      opacity: 0.9,
                      padding: 10,
                      margin: 10,
                      borderRadius: 10,
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#f3f3f3",
                        justifyContent: "center",
                      }}
                    >
                      <Shimmer
                        autoRun={true}
                        visible={!added}
                        style={productCardStyles.image}
                      >
                        <Image
                          source={{
                            uri: `data:${item[0].imageForm};base64,${item[0].image}`,
                          }}
                          style={{
                            height: 100,
                            width: 100,
                            borderRadius: 10,
                          }}
                        />
                      </Shimmer>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        marginLeft: 10,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          marginBottom: 3,
                          flexDirection: "row",
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Shimmer
                            autoRun={true}
                            visible={!added}
                            style={{ fontWeight: "bold", fontSize: 18 }}
                          >
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                              {item[0].name}
                            </Text>
                          </Shimmer>
                        </View>
                        {!added ? makeRemoveButton(item) : null}
                      </View>
                      <View style={{ flex: 1, marginBottom: 5 }}>
                        <Shimmer
                          autoRun={true}
                          visible={!added}
                          style={{
                            fontSize: 11,
                            color: "grey",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 11,
                              color: "grey",
                            }}
                          >
                            {item[0].category}
                          </Text>
                        </Shimmer>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                          alignItems: "center",
                        }}
                      >
                        {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

                        <Shimmer
                          autoRun={true}
                          visible={!added}
                          style={{ width: 80, height: 18 }}
                        >
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
                        </Shimmer>

                        {!added ? (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <View style={IconStyles.background2}>
                              <Icon
                                name="minus"
                                size={21}
                                onPress={async () => {
                                  await updateQuantityCart(
                                    item[0]["_id"],
                                    false
                                  );
                                  user.refreshCustomData();
                                  setTotalPrice(
                                    totalPrice - Number(item[0].price)
                                  );
                                  setCart((prevState) => {
                                    if (item[1] > 1) {
                                      let index = prevState.indexOf(item);
                                      let newVal = [
                                        prevState[index][0],
                                        prevState[index][1] - 1,
                                      ];
                                      prevState.splice(index, 1, newVal);
                                      return [...prevState];
                                    }
                                  });
                                }}
                              />
                            </View>

                            <Text
                              style={{
                                marginLeft: 10,
                                marginRight: 10,
                                fontSize: 21,
                              }}
                            >
                              {item[1]}
                            </Text>

                            <View style={IconStyles.background2}>
                              <Icon
                                name="plus"
                                size={21}
                                onPress={async () => {
                                  await updateQuantityCart(
                                    item[0]["_id"],
                                    true
                                  );
                                  user.refreshCustomData();
                                  setTotalPrice(
                                    totalPrice + Number(item[0].price)
                                  );
                                  setCart((prevState) => {
                                    let index = prevState.indexOf(item);
                                    let newVal = [
                                      prevState[index][0],
                                      prevState[index][1] + 1,
                                    ];
                                    prevState.splice(index, 1, newVal);
                                    return [...prevState];
                                  });
                                }}
                              />
                            </View>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </Pressable>
                // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
              )}
            />
            <Footer navigation={navigation} />
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={UniversalStyles.flex1}>
        <View style={UniversalStyles.flex1}>
          <ImageBackground
            source={require("../assets/home.jpeg")}
            resizeMode="cover"
            style={styles.image}
            opacity={0.5}
          >
            <View style={UniversalStyles.header}>
              <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                Your cart is empty
              </Text>
            </View>

            <View style={UniversalStyles.center}>
              <Image
                source={require("../assets/cartIsEmptyCrop.png")}
                style={{
                  height: 400,
                  width: 400,
                }}
              />
            </View>

            <Footer navigation={navigation} />
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}
