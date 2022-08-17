//React
import React, { useState, useRef } from "react";

//React Components
import { Text, View, Pressable, Image, FlatList } from "react-native";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Providers
import { useOrder } from "../../providers/OrderProvider";

//Styles
import universalStyles from "../../styles/UniversalStyles";

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
      style={{
        marginBottom: 10,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        backgroundColor: "#f6f8f9",
        padding: 10,
      }}
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
            style={[
              universalStyles.row_f1_sb_c,
              {
                padding: 5,
                backgroundColor: "white",
                margin: 5,
                borderRadius: 10,
              },
            ]}
          >
            <View
              style={[
                universalStyles.centered_container,
                { flexDirection: "row" },
              ]}
            >
              <Image
                source={{
                  uri: `data:${orderItem[0].imageForm};base64,${orderItem[0].image}`,
                }}
                style={{ height: 40, width: 40, borderRadius: 5 }}
              />
              <View
                style={[
                  universalStyles.centered_container,
                  {
                    backgroundColor: "#f6f8f9",
                    marginLeft: 7,
                    borderRadius: 100,
                    padding: 4,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  x{orderItem[1]}
                </Text>
              </View>
            </View>

            <View
              style={[
                universalStyles.row_f1_sb_c,
                {
                  flexWrap: "wrap",
                  marginLeft: 7,
                  marginRight: 7,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                {orderItem[0].name}
              </Text>
            </View>
          </Pressable>
        </Animatable.View>
      )}
    />
  );
}
