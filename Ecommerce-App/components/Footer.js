import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { useAuth } from "../providers/AuthProvider.js";
import { View, Alert } from "react-native";
// import styles from "../styles/Styles.js";
import { useProducts } from "../providers/ProductsProvider.js";
import { TasksProvider, useTasks } from "../providers/TasksProvider.js";

import universalStyles from "../styles/UniversalStyles.js";
import iconStyles from "../styles/IconStyles.js";

export default function Footer({ navigation, addition, setAdded }) {
  const { user, signOut } = useAuth();
  const { createTask } = useTasks();
  let admin = null;
  if (user) {
    admin = user.customData["userType"] === "admin" ? true : false;
  }
  const adminPanel = () => {
    return <Icon style={iconStyles.icon} name="plus" />;
  };
  const userPanel = () => {
    return (
      <Icon
        style={iconStyles.icon}
        name="shoppingcart"
        onPress={async () => {
          // await user.refreshCustomData();
          navigation.navigate("Cart", { addition: addition });
          // setAdded(false);
        }}
      />
    );
  };

  // console.log(user.name);
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
        onPress={() => {
          navigation.navigate("Setting");
        }}
      />
    </View>
  );
}
