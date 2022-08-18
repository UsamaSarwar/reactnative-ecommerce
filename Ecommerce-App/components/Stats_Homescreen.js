//React
import React, { useState } from "react";

//React Components
import { View, Text, Pressable } from "react-native";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Providers
import { useTasks } from "../providers/TasksProvider";
import { useOrder } from "../providers/OrderProvider";
import { useGlobal } from "../providers/GlobalProvider";

//Styles
import UniversalStyles from "../styles/UniversalStyles";

export default function Stats({ elementRef }) {
  const { tasks } = useTasks();
  const { orders } = useOrder();
  const animationTime = 1500;
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
      <Animatable.View
        style={[
          UniversalStyles.col_sb_conatiner,
          UniversalStyles.pressable_1,
          {
            flex: listType === "Orders" ? 1 : 0.08,

            backgroundColor:
              listType === "Orders"
                ? "rgba(66, 200, 143, 0.2)"
                : "rgba(66, 200, 143, 0.4)",
            //
            justifyContent: listType === "Orders" ? "space-evenly" : "center",
          },
        ]}
        ref={(here) => {
          elementRef["ordersTab"] = here;
        }}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: listType === "Orders" ? "space-evenly" : "center",
          }}
          onPress={() => {
            if (listType !== "Orders") {
              setListType("Orders");
              elementRef["ordersTab"].slideInLeft(animationTime);
              elementRef["inventoryTab"].slideInRight(animationTime);
            }
          }}
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
      </Animatable.View>

      <Animatable.View
        style={[
          UniversalStyles.col_sb_conatiner,
          UniversalStyles.pressable_1,
          {
            flex: listType === "Inventory" ? 1 : 0.08,
            marginLeft: 10,
            backgroundColor:
              listType === "Inventory"
                ? "rgba(66, 200, 143, 0.2)"
                : "rgba(66, 200, 143, 0.4)",
            justifyContent:
              listType === "Inventory" ? "space-evenly" : "center",
          },
        ]}
        ref={(here) => {
          elementRef["inventoryTab"] = here;
        }}
      >
        <Pressable
          style={[
            {
              flex: 1,
              justifyContent:
                listType === "Inventory" ? "space-evenly" : "center",
            },
          ]}
          onPress={() => {
            if (listType !== "Inventory") {
              setListType("Inventory");
              elementRef["ordersTab"].slideInLeft(animationTime);
              elementRef["inventoryTab"].slideInRight(animationTime);
            }
          }}
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
      </Animatable.View>
    </View>
  );
}
