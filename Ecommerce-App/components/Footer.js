//React
import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

//Providers
import { useAuth } from "../providers/AuthProvider.js";

//Styles
import universalStyles from "../styles/UniversalStyles.js";
import iconStyles from "../styles/IconStyles.js";

export default function Footer({
  navigation,
  addition,
  setAdded,
  childToParent_edit,
  elementRef,
}) {
  const { user } = useAuth();

  let admin = null;

  if (user) {
    admin = user.customData["userType"] === "admin" ? true : false;
  }

  const renderSlide = () => {
    console.log("Pressed add item");
    childToParent_edit(false);
    elementRef.current.show();
  };

  const adminPanel = () => {
    return (
      <Icon style={iconStyles.icon} name="plus" onPress={() => renderSlide()} />
    );
  };
  const userPanel = () => {
    return (
      <Icon
        style={iconStyles.icon}
        name="shoppingcart"
        onPress={async () => {
          navigation.navigate("Cart", { addition: addition });
          setAdded(true);
        }}
      />
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
        onPress={() => navigation.navigate("Setting")}
      />
    </View>
  );
}
