import React, { useEffect, useRef } from "react";
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
  const { user } = useAuth();
  const { getCart } = useTasks();
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);
  const elementRef = useRef();
  const cart = getCart(user.customData.memberOf);
  // user.refreshCustomData();
  // console.log(cart.length, user.customData.memberOf.length);
  return (
    <View style={styles.main}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            // {of}
            // <Pressable></Pressable>
            <Pressable
              onPress={() => {
                admin ? void 0 : renderSlide(item);
              }}
            >
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
                  </View>
                </View>
              </View>
            </Pressable>
          )}
        />
        {/* <Pressable
          style={styles.p_button}
          onPress={() => {
            getCart(user.customData.memberOf);
          }}
        >
          <Text>Show Cart</Text>
        </Pressable> */}
        {/* <ProductItem navigation={navigation} user={user} /> */}
        <Footer navigation={navigation} />
      </ImageBackground>
    </View>
  );
}
