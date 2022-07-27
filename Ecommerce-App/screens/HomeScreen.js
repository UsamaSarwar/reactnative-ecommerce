import React, { useRef, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { SearchBar } from "react-native-elements";
import SlidingUpPanel from "rn-sliding-up-panel";
import { useAuth } from "../providers/AuthProvider.js";
import NumberFormat from "react-number-format";
import Shimmer from "../Shimmer.js";
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

import styles from "../styles/Styles.js";

import universalStyles from "../styles/UniversalStyles.js";
import buttonStyles from "../styles/ButtonStyles.js";

import ProductItem from "../components/ProductItem.js";
import Footer from "../components/Footer.js";

export default function Homescreen({ navigation }) {
  const { user, addToCart } = useAuth();
  const elementRef = useRef();
  const [quantity, setQuantity] = useState("1");
  // console.log(user.customData.memberOf.length);
  const [data, setData] = useState("");
  console.log(quantity);
  // setData("hello");
  const childToParent = (childData) => {
    setData(childData);
    console.log(childData.name);
    // return <h1>{childData.name}</h1>;
  };
  // console.log("@Homescreen:", user.customData.memberOf[0]);
  if (user) {
    return (
      <View style={universalStyles.main}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={universalStyles.image}
        >
          <ProductItem
            navigation={navigation}
            user={user}
            elementRef={elementRef}
            childToParent={childToParent}
            setData={setData}
            setQuantity={setQuantity}
          />
          <Footer navigation={navigation} />
          <SlidingUpPanel
            onMomentumDragEnd={(value, gestureState) => {}}
            allowDragging={true}
            ref={(c) => (elementRef.current = c)}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  flex: 0.8,
                  flexDirection: "column",
                  backgroundColor: "white",
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#f3f3f3",
                    justifyContent: "center",
                    height: "40%",
                    // width: "100%",
                    marginBottom: 20,
                  }}
                >
                  <Image
                    source={{
                      uri: `data:${data.imageForm};base64,${data.image}`,
                    }}
                    style={{
                      height: "100%",
                      // width: "100%",
                      resizeMode: "contain",
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginBottom: 3,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    {data.name}
                  </Text>
                </View>
                <View style={{ flex: 1, marginBottom: 5 }}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: "grey",
                    }}
                  >
                    {data.category}
                  </Text>
                </View>

                <Text
                  numberOfLines={3}
                  style={{ marginBottom: 10, fontSize: 15 }}
                >
                  {data.description}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  {/* <Text>PKR {data.price}</Text> */}

                  <NumberFormat
                    value={parseInt(data.price)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"PKR "}
                    renderText={(value) => <Text>{value}</Text>}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      // margin: 10,
                    }}
                  >
                    <View style={styles.cartButtons}>
                      <Icon
                        style={styles.cartIcons}
                        name="plus"
                        onPress={() => {
                          setQuantity((prevState) => {
                            return String(Number(prevState) + 1);
                          });
                        }}
                      />
                    </View>
                    <View
                      style={{
                        borderWidth: 2,
                        width: 60,
                        height: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 15,
                        marginLeft: 15,
                        marginRight: 15,
                      }}
                    >
                      <TextInput
                        style={{
                          fontSize: 18,
                        }}
                        onChangeText={(text) => {
                          setQuantity(text);
                        }}
                      >
                        {quantity}
                      </TextInput>
                    </View>
                    <View style={styles.cartButtons}>
                      <Icon
                        style={styles.cartIcons}
                        name="minus"
                        onPress={() => {
                          setQuantity((prevState) => {
                            if (Number(prevState) > 1) {
                              return String(Number(prevState) - 1);
                            } else {
                              return prevState;
                            }
                          });
                        }}
                      />
                    </View>
                  </View>
                </View>
                <Pressable
                  style={buttonStyles.p_button}
                  // onPress={() => {
                  //   editCart(data["_id"]);
                  //   // Alert.alert("Item added to Cart");
                  // }}
                  onPress={async () => {
                    console.log("Add to cart pressed");
                    await addToCart(data["_id"], quantity);
                    await user.refreshCustomData();
                    Alert.alert(
                      data.name,
                      "has been added to your shopping cart."
                    );
                  }}
                >
                  <Text style={buttonStyles.p_button_text}>Add to Cart</Text>
                </Pressable>
                <Pressable style={buttonStyles.s_button}>
                  <Text style={buttonStyles.s_button_text}>Checkout Now</Text>
                </Pressable>
              </View>
            </View>
          </SlidingUpPanel>
        </ImageBackground>
      </View>
    );
  } else {
    return null;
  }
}
