//React
import React from "react";

//React Components
import { Text, View, Pressable, Image, FlatList } from "react-native";
import NumberFormat from "react-number-format";

//Providers
import { useTasks } from "../../providers/TasksProvider";

//Styles
import UniversalStyles from "../../styles/UniversalStyles.js";
import CheckoutStyles from "../../styles/CheckoutStyles";
import TextStyles from "../../styles/TextStyles.js";

// Loads the order summary item at the checkout screen

export default function CheckoutItem() {
  const { shoppingCart } = useTasks();

  return (
    <FlatList
      data={shoppingCart}
      showsVerticalScrollIndicator={false}
      style={CheckoutStyles.cart_list}
      renderItem={({ item }) => (
        <Pressable
          style={[UniversalStyles.row_f1_sb_c, CheckoutStyles.press_able_list]}
        >
          <View
            style={[
              UniversalStyles.centered_container,
              UniversalStyles.flex_row,
            ]}
          >
            <Image
              source={{
                uri: `data:${item[0].imageForm};base64,${item[0].image}`,
              }}
              style={CheckoutStyles.checkout_image}
            />
            <View
              style={[
                UniversalStyles.centered_container,
                CheckoutStyles.item_container,
              ]}
            >
              <Text style={TextStyles.normal_font}>x{item[1]}</Text>
            </View>
          </View>

          <View
            style={[UniversalStyles.row_f1_sb_c, CheckoutStyles.container_wrap]}
          >
            <Text style={TextStyles.normal_font}>{item[0].name}</Text>
          </View>

          <NumberFormat
            value={parseInt(item[0].price) * item[1]}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"PKR "}
            renderText={(value) => <Text>{value}</Text>}
          />
        </Pressable>
      )}
    />
  );
}
