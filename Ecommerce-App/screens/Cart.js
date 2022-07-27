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
import Footer from "../components/Footer.js";

export default function Cart({ navigation }) {
  const { updateQuantityCart, removeFromCart, user } = useAuth();
  const { getCart } = useTasks();
  const [cart, setCart] = useState(getCart(user.customData.memberOf));
  // console.log(cart);
  const makeRemoveButton = (item) => {
    return (
      <View style={styles.cartButtonsDelete}>
        <Icon
          style={styles.cartIcons}
          name="delete"
          onPress={async () => {
            removeFromCart(String(item[0]["_id"]));
            user.refreshCustomData();
            setCart((prevState) => {
              //////////////////////////////////////////////////////////////////////////////////////////////////////////////
              prevState.splice(prevState.indexOf(item), 1);
              return [...prevState];
            });
            // console.log("Hello", cart.length);
            Alert.alert(item.name, "removed from shopping cart");
          }}
        />
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
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                          {item[0].name}
                        </Text>
                      </View>
                      {makeRemoveButton(item)}
                    </View>
                    <View style={{ flex: 1, marginBottom: 5 }}>
                      <Text
                        style={{
                          fontSize: 11,
                          color: "grey",
                        }}
                      >
                        {item[0].category}
                      </Text>
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
                          <Icon
                            style={styles.cartIcons}
                            name="plus"
                            onPress={async () => {
                              await updateQuantityCart(item[0]["_id"], true);
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
                          <Text
                            style={{
                              fontSize: 18,
                            }}
                            // placeholder={String(item[1])}
                          >
                            {item[1]}
                          </Text>
                        </View>
                        <View style={styles.cartButtons}>
                          <Icon
                            style={styles.cartIcons}
                            name="minus"
                            onPress={async () => {
                              await updateQuantityCart(item[0]["_id"], false);
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
                      </View>

                      {/* <Text
                        style={{
                          fontSize: 16,
                          color: "green",
                          fontWeight: "bold",
                        }}
                      >
                        PKR {item[0].price}
                      </Text> */}
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
