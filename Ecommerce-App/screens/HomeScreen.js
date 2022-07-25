import React, { useRef, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import SlidingUpPanel from "rn-sliding-up-panel";
import { useAuth } from "../providers/AuthProvider.js";
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
import ProductItem from "../components/ProductItem.js";
import { TasksProvider } from "../providers/TasksProvider.js";
import { ProductsProvider } from "../providers/ProductsProvider.js";
import { ImagePicker } from "react-native-image-crop-picker";
import Footer from "../components/Footer.js";

export default function Homescreen({ navigation }) {
  const { user, addToCart } = useAuth();
  const elementRef = useRef();
  // console.log(user.customData["name"]);
  const [data, setData] = useState("");
  // setData("hello");
  const childToParent = (childData) => {
    setData(childData);
    console.log(childData.name);
    // return <h1>{childData.name}</h1>;
  };
  // console.log("@Homescreen:", user.customData.memberOf[0]);
  if (user) {
    return (
      <View style={styles.main}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={styles.image}
        >
          <ProductItem
            navigation={navigation}
            user={user}
            elementRef={elementRef}
            childToParent={childToParent}
            setData={setData}
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
                  <Text>PKR {data.price}</Text>
                </View>
                <Pressable
                  style={styles.p_button}
                  // onPress={() => {
                  //   editCart(data["_id"]);
                  //   // Alert.alert("Item added to Cart");
                  // }}
                  onPress={() => {
                    console.log("Add to cart pressed");
                    addToCart(data["_id"]);
                  }}
                >
                  <Text style={styles.p_button_text}>Add to Cart</Text>
                </Pressable>
                <Pressable style={styles.s_button}>
                  <Text style={styles.s_button_text}>Checkout Now</Text>
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
