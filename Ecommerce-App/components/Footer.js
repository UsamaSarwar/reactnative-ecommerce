//React
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

//Providers
import { useAuth } from "../providers/AuthProvider.js";
import { useTasks } from "../providers/TasksProvider.js";
//Styles
import universalStyles from "../styles/UniversalStyles.js";
import iconStyles from "../styles/IconStyles.js";

export default function Footer({
  navigation,
  childToParent,
  childToParent_edit,
  elementRef,
}) {
  const { user, cartSize } = useAuth();
  const { setAdded } = useTasks();

  // console.log(cartSize);

  const admin = user.customData["userType"] === "admin" ? true : false;

  const renderSlide = () => {
    console.log("Pressed add item");
    childToParent("");
    childToParent_edit(false);
    elementRef.current.show();
  };

  const adminPanel = () => {
    return (
      <Icon style={iconStyles.icon} name="plus" onPress={() => renderSlide()} />
    );
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
          style={iconStyles.icon}
          name="shoppingcart"
          onPress={() => {
            setAdded(true);
            navigation.navigate("Cart", {
              childToParent: childToParent,
              childToParent_edit: childToParent_edit,
              elementRef: elementRef,
            });
          }}
        />
      </View>
    );
  };

  return (
    <View style={universalStyles.footer}>
      <Icon
        style={iconStyles.icon}
        name="home"
        onPress={() => navigation.navigate("Homescreen")}
      />

      {admin ? adminPanel() : userPanel()}

      <Icon
        style={iconStyles.icon}
        name="user"
        onPress={() =>
          navigation.navigate("Setting", {
            childToParent: childToParent,
            childToParent_edit: childToParent_edit,
            elementRef: elementRef,
          })
        }
      />
    </View>
  );
}
