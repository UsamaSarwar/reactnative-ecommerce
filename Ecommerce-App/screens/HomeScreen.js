//React
import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Pressable,
  Image,
  Alert,
} from "react-native";
import NumberFormat from "react-number-format";
import Icon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";

import SlidingUpPanel from "rn-sliding-up-panel";

//Providers
import { useAuth } from "../providers/AuthProvider.js";
import { useTasks } from "../providers/TasksProvider.js";

//Styles
import universalStyles from "../styles/UniversalStyles.js";

//Components
import ProductItem from "../components/ProductItem.js";
import Footer from "../components/Footer.js";
import SlideUpCard from "../components/SlideUpCard.js";

export default function Homescreen({ navigation }) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  const elementRef = useRef();

  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [data, setData] = useState("");

  console.log(quantity);

  const childToParent = (childData) => {
    setData(childData);
    console.log(childData.name);
  };

  return (
    <SafeAreaView style={universalStyles.flex1}>
      <View style={universalStyles.main}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={universalStyles.image}
        >
          <View style={universalStyles.header}>
            <Text style={{ fontSize: 23 }}>
              Welcome, {user.customData.email}
            </Text>
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
          <Footer
            navigation={navigation}
            addition={added}
            setAdded={setAdded}
          />
          <SlidingUpPanel
            allowDragging={true}
            ref={(c) => (elementRef.current = c)}
          >
            <SlideUpCard data={data} setAdded={setAdded} />
          </SlidingUpPanel>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
