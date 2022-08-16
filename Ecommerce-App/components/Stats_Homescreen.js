//React
import React, { useState } from "react";

//React Components
import { View, Text, Pressable } from "react-native";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";

//Providers
import { useTasks } from "../providers/TasksProvider";
import { useOrder } from "../providers/OrderProvider";

//Styles
import UniversalStyles from "../styles/UniversalStyles";

export default function Stats({ listType, setListType }) {
  const { tasks } = useTasks();
  const { orders } = useOrder();

  return (
    <View
      style={[
        UniversalStyles.row_sb_conatiner,
        {
          height: 100,
          margin: 10,
        },
      ]}
    >
      <Pressable
        style={[
          UniversalStyles.col_sb_conatiner,
          UniversalStyles.pressable_1,
          { flex: 1 },
          listType === "Orders"
            ? { backgroundColor: "silver" }
            : { backgroundColor: "#f6f8f9" },
        ]}
        onPress={() => {
          setListType("Orders");
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IonIcon name="boat-outline" size={23} />
          <Text
            style={{
              fontSize: 23,
              fontWeight: listType === "Orders" ? "bold" : "normal",
              marginLeft: 5,
            }}
          >
            Pending Orders
          </Text>
        </View>
        <Text
          style={{
            fontSize: 21,
          }}
        >
          {orders.length} Orders
        </Text>
      </Pressable>

      <Pressable
        style={[
          UniversalStyles.col_sb_conatiner,
          UniversalStyles.pressable_1,
          { flex: 1, marginLeft: 10 },
          listType === "Inventory"
            ? { backgroundColor: "silver" }
            : { backgroundColor: "#f6f8f9" },
        ]}
        onPress={() => {
          setListType("Inventory");
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IonIcon name="cube-outline" size={23} />
          <Text
            style={{
              fontSize: 23,
              fontWeight: listType === "Inventory" ? "bold" : "normal",
              marginLeft: 5,
            }}
          >
            Inventory
          </Text>
        </View>
        <Text
          style={{
            fontSize: 21,
          }}
        >
          {tasks.length} Products
        </Text>
      </Pressable>
    </View>
  );
}
