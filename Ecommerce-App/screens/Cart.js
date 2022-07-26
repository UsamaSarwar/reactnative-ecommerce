import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
  Button,
  ImageBackground,
  Pressable,
  Image,
  Alert,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useAuth } from "../providers/AuthProvider.js";
import { useTasks } from "../providers/TasksProvider.js";
import styles from "../styles/Styles.js";
import Footer from "../components/Footer.js";

export default function Cart({ navigation }) {
  const { removeFromCart, user } = useAuth();
  const { getCart } = useTasks();
  const [cart, setCart] = useState(getCart(user.customData.memberOf));
  const makeRemoveButton = (item) => {
    return (
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 5,
          paddingHorizontal: 30,
          borderRadius: 15,
          elevation: 3,
          backgroundColor: "red",
        }}
        onPress={async () => {
          // console.log(item.name, "Delete Item from cart");
          await removeFromCart(item["_id"]);
          await user.refreshCustomData();
          // setCart(getCart(user.customData.memberOf));
          // console.log(cart.length);
          setCart((prevState) => {
            prevState.splice(prevState.indexOf(item), 1);
            return [...prevState];
          });
          // console.log("Hello", cart.length);
          Alert.alert(item.name, "removed from shopping cart");
        }}
      >
        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            letterSpacing: 0.25,
            color: "white",
          }}
        >
          Remove
        </Text>
      </Pressable>
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
                        uri: `data:${item.imageForm};base64,${item.image}`,
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
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={{ flex: 1, marginBottom: 5 }}>
                      <Text
                        style={{
                          fontSize: 11,
                          color: "grey",
                        }}
                      >
                        {item.category}
                      </Text>
                    </View>

                    <Text
                      numberOfLines={3}
                      style={{ marginBottom: 10, fontSize: 15 }}
                    >
                      {item.description}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 5,
                      }}
                    >
                      <Text>PKR {item.price}</Text>
                      {makeRemoveButton(item)}
                    </View>
                  </View>
                </View>
              </Pressable>
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
