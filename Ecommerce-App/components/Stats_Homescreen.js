//React
import React, { useState } from "react";

//React Components
import { View, Text, Pressable } from "react-native";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";

//Providers
import { useTasks } from "../providers/TasksProvider";
import { useOrder } from "../providers/OrderProvider";
import { useGlobal } from "../providers/GlobalProvider";

//Styles
import UniversalStyles from "../styles/UniversalStyles";

export default function Stats() {
  const { tasks } = useTasks();
  const { orders } = useOrder();

  const { listType, setListType } = useGlobal();

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
          {
            flex: listType === "Orders" ? 1 : 0.08,
            backgroundColor: "#f6f8f9",
          },
        ]}
        onPress={() => setListType("Orders")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IonIcon name="boat-outline" size={23} />

          {listType === "Orders" ? (
            <Text
              style={{
                fontSize: 23,
                fontWeight: "normal",
                marginLeft: 5,
              }}
            >
              Orders
            </Text>
          ) : null}
        </View>

        {listType === "Orders" ? (
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {orders.length} Orders
          </Text>
        ) : null}
      </Pressable>

      <Pressable
        style={[
          UniversalStyles.col_sb_conatiner,
          UniversalStyles.pressable_1,
          {
            flex: listType === "Inventory" ? 1 : 0.08,
            marginLeft: 10,
            backgroundColor: "#f6f8f9",
          },
        ]}
        onPress={() => setListType("Inventory")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IonIcon name="cube-outline" size={23} />
          {listType === "Inventory" ? (
            <Text
              style={{
                fontSize: 23,
                fontWeight: "normal",
                marginLeft: 5,
              }}
            >
              Inventory
            </Text>
          ) : null}
        </View>
        {listType === "Inventory" ? (
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {tasks.length} Products
          </Text>
        ) : null}
      </Pressable>
    </View>
  );
}
