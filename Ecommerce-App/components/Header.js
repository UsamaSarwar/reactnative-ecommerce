//React
import React, { useState, useEffect } from "react";

//React Components
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

//Providers
import { useAuth } from "../providers/AuthProvider.js";
import { useTasks } from "../providers/TasksProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";

//Styles
import universalStyles from "../styles/UniversalStyles.js";
import iconStyles from "../styles/IconStyles.js";

export default function Header({ navigation, elementRef }) {
  const { user, cartSize } = useAuth();
  const { setAdded } = useTasks();
  const { setIsNewProduct } = useGlobal();

  const admin = user.customData["userType"] === "admin" ? true : false;

  const renderSlide = () => {
    elementRef.current.show();
    setIsNewProduct(true);
  };

  const adminPanel = () => {
    return <Icon name="plus" size={30} onPress={() => renderSlide()} />;
  };

  const cartCount = () => {
    return (
      <View
        style={[
          iconStyles.background4,
          {
            position: "absolute",
            top: -10,
            right: -10,
          },
        ]}
      >
        <Text style={{ textAlign: "center", textAlignVertical: "center" }}>
          {String(cartSize)}
        </Text>
      </View>
    );
  };

  const userPanel = () => {
    return (
      <View>
        {cartSize > 0 ? cartCount() : null}
        <Icon
          name="shoppingcart"
          size={30}
          onPress={() => {
            setAdded(true);
            navigation.navigate("Cart");
          }}
        />
      </View>
    );
  };

  return (
    <View style={universalStyles.footer}>
      <Icon
        name="home"
        size={30}
        onPress={() => navigation.navigate("Homescreen")}
      />

      {admin ? adminPanel() : userPanel()}

      <Icon
        name="user"
        size={30}
        onPress={() => navigation.navigate("Setting")}
      />
    </View>
  );
}
