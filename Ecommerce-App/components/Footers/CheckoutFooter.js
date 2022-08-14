//React
import React, { useState } from "react";

//React Components
import { View, Text, Pressable } from "react-native";
import NumberFormat from "react-number-format";

//Providers
import { useAuth } from "../../providers/AuthProvider.js";
import { useTasks } from "../../providers/TasksProvider.js";
import { useOrder } from "../../providers/OrderProvider.js";

//Styles
import UniversalStyles from "../../styles/UniversalStyles.js";
import ButtonStyles from "../../styles/ButtonStyles.js";

export default function CheckoutFooter({ navigation }) {
  const { user, personalDetails, emptyUserCart } = useAuth();
  const { cartTotal } = useTasks();
  const { createOrder, orders } = useOrder();

  const [detailsError, setDetailsError] = useState(false);

  const onPressOrder = () => {
    if (
      personalDetails.name === "" ||
      personalDetails.phoneNumber === "" ||
      personalDetails.country === "" ||
      personalDetails.province === "" ||
      personalDetails.city === "" ||
      personalDetails.address === "" ||
      personalDetails.postalCode === ""
    ) {
      setDetailsError(true);
    } else if (!detailsError) {
      try {
        createOrder(user.customData["_id"], orders.length + 1, "COD");
        emptyUserCart();
        Alert.alert("Order Placed");
        navigation.navigate("Homescreen");
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <View style={UniversalStyles.header}>
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>Total</Text>
        <NumberFormat
          value={cartTotal}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"PKR "}
          renderText={(value) => <Text style={{ fontSize: 25 }}>{value}</Text>}
        />
      </View>
      <Pressable
        style={
          detailsError
            ? ButtonStyles.checkout_button_dis
            : ButtonStyles.checkout_button
        }
        onPress={() => onPressOrder()}
      >
        <Text
          style={
            detailsError
              ? ButtonStyles.checkout_button_text_dis
              : ButtonStyles.checkout_button_text
          }
        >
          ORDER
        </Text>
      </Pressable>
    </View>
  );
}
