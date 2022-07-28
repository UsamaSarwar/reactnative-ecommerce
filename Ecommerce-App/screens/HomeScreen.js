import React, { useRef, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";
import { SearchBar } from "react-native-elements";
import SlidingUpPanel from "rn-sliding-up-panel";
import { useAuth } from "../providers/AuthProvider.js";
import { useTasks } from "../providers/TasksProvider.js";
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
  const { total, setTotal } = useTasks();
  const [added, setAdded] = useState(false);
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

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  return (
    <View style={universalStyles.main}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={universalStyles.image}
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
          <Text style={{ fontSize: 23 }}>Welcome, {user.customData.email}</Text>
          <IonIcon name="search" size={32} />
        </View>
        <ProductItem
          navigation={navigation}
          user={user}
          elementRef={elementRef}
          childToParent={childToParent}
          setData={setData}
          setQuantity={setQuantity}
        />
        <Footer navigation={navigation} addition={added} setAdded={setAdded} />
        <SlidingUpPanel
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
                  marginTop: 10,
                  marginBottom: 15,
                  // borderColor: "black",
                  // borderWidth: 1,
                  alignItems: "center",
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

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: "#f6f8f9",
                      borderRadius: 100,
                      padding: 3,
                    }}
                  >
                    <Icon
                      name="minus"
                      size={21}
                      onPress={() => {
                        setQuantity((prevState) => {
                          prevState =
                            prevState === "1"
                              ? prevState
                              : String(Number(prevState) - 1);

                          return prevState;
                        });
                      }}
                    />
                  </View>
                  <TextInput
                    style={{
                      marginLeft: 10,
                      marginRight: 10,
                      fontSize: 21,
                    }}
                    onChangeText={(text) => setQuantity(text)}
                    value={quantity}
                    keyboardType="number-pad"
                    textAlign="center"
                  ></TextInput>
                  <View
                    style={{
                      backgroundColor: "#f6f8f9",
                      borderRadius: 100,
                      padding: 3,
                    }}
                  >
                    <Icon
                      name="plus"
                      size={21}
                      onPress={() => {
                        setQuantity((prevState) => {
                          return String(Number(prevState) + 1);
                        });
                      }}
                    />
                  </View>
                </View>
              </View>
              <Pressable
                style={buttonStyles.p_button}
                onPress={async () => {
                  console.log("Add to cart pressed");
                  await addToCart(data["_id"], quantity);
                  await user.refreshCustomData();
                  setTotal(total + data.price * quantity);
                  setAdded(true);
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
  // } else {
  //   return null;
  // }
}
