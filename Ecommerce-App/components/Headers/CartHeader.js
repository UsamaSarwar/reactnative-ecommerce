//React
import React, { useEffect } from "react";

//React Components
import { View, Text, Pressable } from "react-native";
import NumberFormat from "react-number-format";

//Providers
import { useTasks } from "../../providers/TasksProvider.js";
import { useGlobal } from "../../providers/GlobalProvider.js";
import { useAuth } from "../../providers/AuthProvider.js";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";

//Styles
import UniversalStyles from "../../styles/UniversalStyles.js";
import ButtonStyles from "../../styles/ButtonStyles.js";

export default function CartHeader({ navigation }) {
  const { personalDetails } = useAuth();
  const { cartTotal } = useTasks();
  const { detailsError, setDetailsError, checkDetailsError } = useGlobal();

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
        style={
          cartTotal === 0
            ? ButtonStyles.checkout_button_dis
            : ButtonStyles.checkout_button
        }
        disabled={cartTotal === 0 ? true : false}
        onPress={() => {
          checkDetailsError();
          navigation.navigate("Checkout");
        }}
      >
        <Text
          style={[
            cartTotal === 0
              ? ButtonStyles.checkout_button_text_dis
              : ButtonStyles.checkout_button_text,
            { marginRight: 15 },
          ]}
        >
          Checkout
        </Text>
        <IonIcon
          name="arrow-forward"
          size={24}
          color={cartTotal === 0 ? "grey" : "white"}
        />
      </Pressable>
    </View>
  );
}
