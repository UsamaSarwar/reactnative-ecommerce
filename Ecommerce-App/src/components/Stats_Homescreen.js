//React
import React from "react";

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
import ComponentStyles from "../styles/ComponentStyles";

export default function Stats({ elementRef }) {
  const { tasks } = useTasks();
  const { orders } = useOrder();
  const animationTime = 1000;
  const { listType, setListType } = useGlobal();

  return (
    <View
      style={[UniversalStyles.row_sb_conatiner, UniversalStyles.admin_stat]}
    >
      <Animatable.View
        style={[
          UniversalStyles.col_sb_container,
          UniversalStyles.pressable_1,
          {
            flex: listType === "Orders" ? 1 : 0.08,
            backgroundColor:
              listType === "Orders"
                ? UniversalStyles.theme_green_low.color
                : UniversalStyles.theme_green_medium.color,
            justifyContent: listType === "Orders" ? "space-evenly" : "center",
          },
        ]}
        ref={(here) => {
          elementRef["ordersTab"] = here;
        }}
      >
        <Pressable
          style={[
            UniversalStyles.page_container,
            {
              justifyContent: listType === "Orders" ? "space-evenly" : "center",
            },
          ]}
          onPress={() => {
            if (listType !== "Orders") {
              setListType("Orders");
              elementRef["ordersTab"].slideInLeft(animationTime);
              elementRef["inventoryTab"].slideInRight(animationTime);
            }
          }}
        >
          <View style={UniversalStyles.row_sb_center_container}>
            <View style={UniversalStyles.row_center_container}>
              <IonIcon name="boat-outline" size={23} />
              {listType === "Orders" ? (
                <Text style={ComponentStyles.text_stats}>Orders</Text>
              ) : null}
            </View>
            {listType === "Orders" ? (
              <Text style={ComponentStyles.summary_text}>
                {orders.length} Orders
              </Text>
            ) : null}
          </View>
        </Pressable>
      </Animatable.View>

      <Animatable.View
        style={[
          UniversalStyles.col_sb_container,
          UniversalStyles.pressable_1,
          UniversalStyles.marginLeft10,
          {
            flex: listType === "Inventory" ? 1 : 0.08,
            backgroundColor:
              listType === "Inventory"
                ? UniversalStyles.theme_green_low.color
                : UniversalStyles.theme_green_medium.color,
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
            UniversalStyles.page_container,
            {
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
          <View style={UniversalStyles.row_sb_center_container}>
            <View style={UniversalStyles.row_center_container}>
              <IonIcon name="cube-outline" size={23} />
              {listType === "Inventory" ? (
                <Text style={ComponentStyles.text_stats}>Inventory</Text>
              ) : null}
            </View>
            {listType === "Inventory" ? (
              <Text style={ComponentStyles.summary_text}>
                {tasks.length} Products
              </Text>
            ) : null}
          </View>
        </Pressable>
      </Animatable.View>
    </View>
  );
}
