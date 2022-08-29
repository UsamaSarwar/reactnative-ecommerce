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
import OrderStyles from "../../styles/OrderStyles";
import TextStyles from "../../styles/TextStyles";

//Loads the orders at the user side which were placed by them only.

export default function OrderItemUser() {
  const { orders } = useOrder();

  return (
    <FlatList
      data={orders.slice().reverse()}
      showsVerticalScrollIndicator={false}
      style={OrderStyles.order_list}
      renderItem={({ item }) => (
        <View>
          <View
            style={[
              productCardStyles.productCard,
              UniversalStyles.col_sb_container,
            ]}
          >
            <View style={UniversalStyles.row_sb_conatiner}>
              <View style={UniversalStyles.row_center_container}>
                <Text style={TextStyles.bold_normal}>
                  Order# {item.orderNumber}
                </Text>
              </View>
            </View>

            <View style={UniversalStyles.row_f1_sb_c}>
              <View>
                <View style={OrderStyles.total_container}>
                  <Text style={TextStyles.small_italic}>
                    {item.paymentMethod}
                  </Text>
                  <Image
                    source={
                      item.paymentMethod === "Card"
                        ? require("../../assets/credit-card.png")
                        : require("../../assets/cash-on-delivery.png")
                    }
                    style={OrderStyles.payment_icon}
                  />
                </View>
                <View>
                  <Text>Placed on: {item.orderTime}</Text>
                </View>
              </View>
              <View
                style={[
                  OrderStyles.status_container,
                  {
                    backgroundColor:
                      item.orderStatus === "Processing"
                        ? "#BC544B"
                        : item.orderStatus === "Dispatched"
                        ? "#E3B104"
                        : "#87AB69",
                  },
                ]}
              >
                <Text style={TextStyles.normal_font}>{item.orderStatus}</Text>
              </View>
            </View>

            <OrderProductItem
              orderItems={item.orderItems}
              orderNumber={item.orderNumber}
            />

            <View style={UniversalStyles.row_f1_sb_c}>
              <Text style={TextStyles.large_bold}>Order Total</Text>

              <NumberFormat
                value={item.total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"PKR "}
                renderText={(value) => (
                  <Text style={TextStyles.large_font}>{value}</Text>
                )}
              />
            </View>
          </View>
        </View>
      )}
    />
  );
}
