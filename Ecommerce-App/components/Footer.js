//React
import React from "react";
import { View } from "react-native";
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
  const { user } = useAuth();
  const { added, setAdded } = useTasks();
  // console.log(setAdded, "HJello");
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
        onPress={() => {
          setAdded(true);
          navigation.navigate("Cart", {
            childToParent: childToParent,
            childToParent_edit: childToParent_edit,
            elementRef: elementRef,
          });
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
