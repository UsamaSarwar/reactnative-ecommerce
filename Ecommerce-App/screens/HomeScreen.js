//React
import React, { useRef, useState, useEffect } from "react";
import { Text, View, SafeAreaView, ImageBackground } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import SlidingUpPanel from "rn-sliding-up-panel";

//Providers
import { useAuth } from "../providers/AuthProvider.js";

//Styles
import universalStyles from "../styles/UniversalStyles.js";

//Components
import ProductItem from "../components/ProductItem.js";
import Footer from "../components/Footer.js";
import UserSlideUpCard from "../components/UserSlideUpCard.js";
import AdminSlideUpCard from "../components/AdminUserSlideUpCard.js";

export default function Homescreen({ navigation }) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  const admin = user.customData["userType"] === "admin" ? true : false;

  const elementRef = useRef();

  const [data, setData] = useState("");
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [edit, setEdit] = useState(true);

  const childToParent = (childData) => {
    setData(childData);
  };

  const childToParent_edit = (childData) => {
    setEdit(childData);
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
            childToParent_edit={childToParent_edit}
            setData={setData}
            setQuantity={setQuantity}
          />
          <Footer
            navigation={navigation}
            addition={added}
            setAdded={setAdded}
            childToParent={childToParent}
            childToParent_edit={childToParent_edit}
            elementRef={elementRef}
          />
          <SlidingUpPanel
            allowDragging={true}
            ref={(c) => (elementRef.current = c)}
          >
            {admin ? (
              <AdminSlideUpCard data={data} toEdit={edit} />
            ) : (
              <UserSlideUpCard data={data} setAdded={setAdded} />
            )}
          </SlidingUpPanel>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
