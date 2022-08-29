//React
import React from "react";

//React Components
import { Pressable, View } from "react-native";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";

//Styles
import UniversalStyles from "../../styles/UniversalStyles.js";

//To provide a headline at the checkout page such that user is able to
// navigate back to cart screen and to provide a headline

export default function CheckoutHeader({ navigation }) {
  return (
    <View style={UniversalStyles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <IonIcon name="arrow-back" size={30} color="grey" />
      </Pressable>
    </View>
  );
}
