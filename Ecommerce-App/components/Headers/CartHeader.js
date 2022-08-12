//React
import React from "react";

//React Components
import { View, Text, Pressable } from "react-native";
import NumberFormat from "react-number-format";

//Providers
import { useTasks } from "../../providers/TasksProvider.js";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";

//Styles
import UniversalStyles from "../../styles/UniversalStyles.js";
import ButtonStyles from "../../styles/ButtonStyles.js";

export default function CartHeader() {
  const { cartTotal } = useTasks();

  return (
    <View style={UniversalStyles.header}>
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontSize: 23, fontWeight: "bold" }}>Total</Text>

        <NumberFormat
          value={cartTotal}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"PKR "}
          renderText={(value) => <Text style={{ fontSize: 23 }}>{value}</Text>}
        />
      </View>
      <Pressable
        style={ButtonStyles.checkout_button}
        onPress={() => {
          navigation.navigate("Checkout");
        }}
      >
        <Text style={[ButtonStyles.checkout_button_text, { marginRight: 15 }]}>
          Checkout
        </Text>
        <IonIcon name="arrow-forward" size={24} color="white" />
      </Pressable>
    </View>
  );
}
