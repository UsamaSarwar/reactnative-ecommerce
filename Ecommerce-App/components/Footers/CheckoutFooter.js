//React
import React, { useState, useRef } from "react";

//React Components
import { View, Text, Pressable, Alert } from "react-native";
import NumberFormat from "react-number-format";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Snackbar from "react-native-snackbar";

//Providers
import { useAuth } from "../../providers/AuthProvider.js";
import { useTasks } from "../../providers/TasksProvider.js";
import { useOrder } from "../../providers/OrderProvider.js";
import { useGlobal } from "../../providers/GlobalProvider.js";

//Styles
import UniversalStyles from "../../styles/UniversalStyles.js";
import ButtonStyles from "../../styles/ButtonStyles.js";

//Animation-Component
import * as Animatable from "react-native-animatable";

export default function CheckoutFooter({ navigation, payMethod }) {
  const { user, emptyUserCart, personalDetails } = useAuth();
  const { cartTotal } = useTasks();
  const { createOrder } = useOrder();
  const { detailsError } = useGlobal();
  const [orderPressed, setOrderPressed] = useState(false);
  const elementRef = useRef();
  const animationTime = 1000;
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  const onPressOrder = async () => {
    elementRef["orderAnimate"].slideInLeft(animationTime);
    setTimeout(
      () => elementRef["orderAnimate"].fadeOutRight(animationTime),
      animationTime * 0.85
    );
    setTimeout(async () => {
      if (!detailsError) {
        console.log("Here");
        try {
          await createOrder(
            user.customData["_id"],
            personalDetails.name,
            uuid(),
            !payMethod ? "Cash on Delivery" : "Card",
            cartTotal
          );
          emptyUserCart();
          navigation.navigate("Homescreen");
          Snackbar.show({
            text: "Your order has been placed 🚛📦",
            duration: Snackbar.LENGTH_LONG,
            action: {
              text: "Check",
              textColor: "rgba(66, 200, 143, 1)",
              onPress: () => {
                console.log(navigation.navigate("Myorders"));
              },
            },
          });
        } catch (error) {
          console.error(error.message);
        }
      }
    }, animationTime * 2);
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
        style={[
          detailsError
            ? ButtonStyles.checkout_button_dis
            : ButtonStyles.checkout_button,
          { width: 150 },
        ]}
        disabled={detailsError ? true : false}
        onPress={() => {
          setOrderPressed(true);
          onPressOrder();
        }}
      >
        <Animatable.View
          ref={(here) => (elementRef["orderAnimate"] = here)}
          style={{ flexDirection: "row" }}
        >
          {orderPressed ? (
            <MatIcon
              name="weather-windy"
              size={28}
              color="white"
              style={{ transform: [{ rotateY: "180deg" }] }}
            />
          ) : (
            void 0
          )}
          <MatIcon
            name="truck-fast-outline"
            size={28}
            color="white"
            style={{ marginRight: 5 }}
          />
        </Animatable.View>

        {!orderPressed ? (
          <Text
            style={
              detailsError
                ? ButtonStyles.checkout_button_text_dis
                : ButtonStyles.checkout_button_text
            }
          >
            ORDER
          </Text>
        ) : (
          void 0
        )}
      </Pressable>
    </View>
  );
}
