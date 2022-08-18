//React
import React from "react";

//React Components
import { Text, View, Image, FlatList } from "react-native";
import NumberFormat from "react-number-format";

//Providers
import { useOrder } from "../../providers/OrderProvider";

import OrderProductItem from "./OrderProductItem";

//Styles
import UniversalStyles from "../../styles/UniversalStyles";
import productCardStyles from "../../styles/ProductCardStyle";

export default function OrderItemUser() {
  const { orders } = useOrder();

  return (
    <FlatList
      data={orders}
      showsVerticalScrollIndicator={false}
      style={{ margin: 10, borderRadius: 15 }}
      renderItem={({ item }) => (
        <View>
          <View
            style={[
              productCardStyles.productCard,
              {
                justifyContent: "space-between",
                flexDirection: "column",
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  Order# {item.orderNumber}
                </Text>
              </View>
            </View>

            <View style={UniversalStyles.row_f1_sb_c}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                  <Text style={{ fontSize: 12, fontStyle: "italic" }}>
                    {item.paymentMethod}
                  </Text>
                  <Image
                    source={
                      item.paymentMethod === "Card"
                        ? require("../../assets/credit-card.png")
                        : require("../../assets/cash-on-delivery.png")
                    }
                    style={{ height: 15, width: 15, marginLeft: 5 }}
                  />
                </View>
                <View>
                  <Text>Placed on: {item.orderTime}</Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor:
                    item.orderStatus === "Processing"
                      ? "#BC544B"
                      : item.orderStatus === "Dispatched"
                      ? "#E3B104"
                      : "#87AB69",
                  borderRadius: 10,
                  justifyContent: "center",
                  width: 80,
                  height: 30,
                }}
              >
                <Text style={{ fontSize: 12 }}>{item.orderStatus}</Text>
              </View>
            </View>

            <OrderProductItem
              orderItems={item.orderItems}
              orderNumber={item.orderNumber}
            />

            <View style={UniversalStyles.row_f1_sb_c}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                Order Total
              </Text>

              <NumberFormat
                value={item.total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"PKR "}
                renderText={(value) => (
                  <Text style={{ fontSize: 25 }}>{value}</Text>
                )}
              />
            </View>
          </View>
        </View>
      )}
    />
  );
}
