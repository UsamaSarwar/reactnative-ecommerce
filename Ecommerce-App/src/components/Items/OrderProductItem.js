//React
import React, { useState, useRef } from "react";

//React Components
import { Text, View, Pressable, Image, FlatList } from "react-native";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Providers
import { useOrder } from "../../providers/OrderProvider";

//Styles
import UniversalStyles from "../../styles/UniversalStyles";
import OrderStyles from "../../styles/OrderStyles";
import TextStyles from "../../styles/TextStyles";

export default function OrderProductItem({ orderItems, orderNumber }) {
  const { orders, orderDetails } = useOrder();

  const animationTime = 800;
  const [refresh, setRefresh] = useState(false);
  const elementRef = useRef();

  const [view, setView] = useState(
    orders.reduce((obj, v) => {
      obj[v.orderNumber] = true;
      return obj;
    }, {})
  );

  const animateItems = () => {
    const allItems = orderDetails(orderItems);
    for (let x = 0; x < allItems.length; x++) {
      elementRef[String(orderNumber) + allItems[x][0]._id].lightSpeedIn(
        animationTime + animationTime * x * 0.3
      );
    }
  };

  return (
    <FlatList
      data={orderDetails(orderItems)}
      horizontal={view[orderNumber]}
      showsHorizontalScrollIndicator={false}
      style={OrderStyles.itemView}
      renderItem={({ item: orderItem }) => (
        <Animatable.View
          ref={(here) =>
            (elementRef[String(orderNumber) + orderItem[0]._id] = here)
          }
        >
          <Pressable
            onPress={() => {
              let new_view = view;
              new_view[orderNumber] = !new_view[orderNumber];
              setView(new_view);
              setRefresh(!refresh);
              setTimeout(
                () =>
                  !new_view[orderNumber] ? animateItems(orderItem) : void 0,
                0.1
              );
            }}
            style={[UniversalStyles.row_f1_sb_c, OrderStyles.item_container]}
          >
            <View
              style={[
                UniversalStyles.centered_container,
                UniversalStyles.flex_row,
              ]}
            >
              <Image
                source={{
                  uri: `data:${orderItem[0].imageForm};base64,${orderItem[0].image}`,
                }}
                style={OrderStyles.item_image}
              />
              <View
                style={[
                  UniversalStyles.centered_container,
                  OrderStyles.text_view,
                ]}
              >
                <Text style={TextStyles.normal_font}>x{orderItem[1]}</Text>
              </View>
            </View>

            <View
              style={[UniversalStyles.row_f1_sb_c, OrderStyles.text_container]}
            >
              <Text style={TextStyles.normal_font}>{orderItem[0].name}</Text>
            </View>
          </Pressable>
        </Animatable.View>
      )}
    />
  );
}
