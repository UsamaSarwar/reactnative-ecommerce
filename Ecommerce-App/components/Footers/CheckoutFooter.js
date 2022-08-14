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
  const { user, emptyUserCart } = useAuth();
  const { cartTotal } = useTasks();
  const { createOrder, orders } = useOrder();

  const [detailsError, setDetailsError] = useState(false);

  const onPressOrder = () => {
    if (
      user.customData.details.name === "" ||
      user.customData.details.phoneNumber === "" ||
      user.customData.details.country === "" ||
      user.customData.details.province === "" ||
      user.customData.details.city === "" ||
      user.customData.details.address === "" ||
      user.customData.details.postalCode === ""
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
        style={ButtonStyles.checkout_button}
        onPress={() => onPressOrder()}
      >
        <Text style={ButtonStyles.checkout_button_text}>ORDER</Text>
      </Pressable>
    </View>
  );
}
