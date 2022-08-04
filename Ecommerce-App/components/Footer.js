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
  const { user, getCartSize } = useAuth();
  const { setAdded } = useTasks();
  let cartSize = getCartSize();
  let admin = null;

  if (user) {
    admin = user.customData["userType"] === "admin" ? true : false;
  }

  const renderSlide = () => {
    console.log("Pressed add item");
    childToParent("");
    childToParent_edit(false);
    elementRef.current.show();
  };
  // console.log(cartSize);
  const adminPanel = () => {
    return (
      <Icon style={iconStyles.icon} name="plus" onPress={() => renderSlide()} />
    );
  };
  const userPanel = () => {
    return (
      <View style={{ flexDirection: "row-reverse" }}>
        {cartSize > 0 ? (
          <Text
            style={{
              position: "absolute",
              top: -12,
              right: 30,
              // color: "#42C88F",
              borderRadius: 10,
              borderWidth: 1,
              width: 20,
              textAlign: "center",
            }}
          >
            {String(cartSize)}
          </Text>
        ) : (
          void 0
        )}
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
