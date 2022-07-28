import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Text,
  TextInput,
  View,
  ImageBackground,
  Pressable,
  Image,
  Alert,
  FlatList,
} from "react-native";

import Icon from "react-native-vector-icons/AntDesign";

import { useAuth } from "../providers/AuthProvider.js";
import { useTasks } from "../providers/TasksProvider.js";
import NumberFormat from "react-number-format";
import styles from "../styles/Styles.js";
import Shimmer from "../Shimmer";
import Footer from "../components/Footer.js";

export default function Cart({ navigation, route }) {
  const { updateQuantityCart, removeFromCart, user } = useAuth();
  const { getCart } = useTasks();
  const [added, setAdded] = useState(route.params.addition);
  const [render, setRender] = useState(false);
  console.log(added);
  const [cart, setCart] = useState(getCart(user.customData.memberOf));
  const refreshCart = async () => {
    // setTimeout(async () => await user.refreshCustomData(), 2500);
    await user.refreshCustomData();
    await user.refreshCustomData();
    await setCart(getCart(user.customData.memberOf));
    // setTimeout(async () => {
    //   await setCart(getCart(user.customData.memberOf));
    // }, 2000);
    setAdded(false);
    console.log(added);
  };
  if (added && !render) {
    console.log("Refreshing Cart");
    setRender(true);
    refreshCart();
  }
  const makeRemoveButton = (item) => {
    return (
      <View style={styles.cartButtonsDelete}>
        <Shimmer
          autoRun={true}
          visible={!added}
          style={{ width: 30, height: 30, borderRadius: 15 }}
        >
          <Icon
            style={styles.cartIcons}
            name="delete"
            onPress={async () => {
              await removeFromCart(String(item[0]["_id"]));
              await user.refreshCustomData();
              setCart((prevState) => {
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////
                prevState.splice(prevState.indexOf(item), 1);
                return [...prevState];
              });
              // console.log("Hello", cart.length);
              Alert.alert(item.name, "removed from shopping cart");
            }}
          />
        </Shimmer>
      </View>
    );
  };

  if (cart.length) {
    //If cart.length is not zero (meaning there are items inside shopping cart)
    return (
      <View style={styles.main}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={styles.image}
        >
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
                      {makeRemoveButton(item)}
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
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                        marginTop: 5,
                      }}
                    >
                      {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
                      <View style={{ flexDirection: "row-reverse" }}>
                        <View style={styles.cartButtons}>
                          <Shimmer
                            autoRun={true}
                            visible={!added}
                            style={{ width: 30, height: 30, borderRadius: 15 }}
                          >
                            <Icon
                              style={styles.cartIcons}
                              name="plus"
                              onPress={async () => {
                                await updateQuantityCart(item[0]["_id"], true);
                                user.refreshCustomData();
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
                          </Shimmer>
                        </View>
                        <View
                          style={{
                            borderWidth: 2,
                            width: 50,
                            height: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 15,
                            marginLeft: 5,
                            marginRight: 5,
                          }}
                        >
                          <Shimmer
                            autoRun={true}
                            visible={!added}
                            style={{
                              // borderWidth: 2,
                              width: 50,
                              height: 30,
                              borderRadius: 15,
                              marginLeft: 5,
                              marginRight: 5,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 18,
                              }}
                            >
                              {item[1]}
                            </Text>
                          </Shimmer>
                        </View>
                        <View style={styles.cartButtons}>
                          <Shimmer
                            autoRun={true}
                            visible={!added}
                            style={{ width: 30, height: 30, borderRadius: 15 }}
                          >
                            <Icon
                              style={styles.cartIcons}
                              name="minus"
                              onPress={async () => {
                                await updateQuantityCart(item[0]["_id"], false);
                                user.refreshCustomData();
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
                          </Shimmer>
                        </View>
                      </View>

                      <Shimmer
                        autoRun={true}
                        visible={!added}
                        style={{ width: 80, height: 30, borderRadius: 15 }}
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
    );
  } else {
    return (
      <View style={styles.main}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={styles.image}
        >
          <Text>Your shopping cart is empty</Text>
          <Footer navigation={navigation} />
        </ImageBackground>
      </View>
    );
  }
}
