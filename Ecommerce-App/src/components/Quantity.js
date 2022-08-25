//React
import React from "react";
import { View, Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Styles
import IconStyles from "../styles/IconStyles";
import UniversalStyles from "../styles/UniversalStyles";

export default function Quantity({ quantity, setQuantity, elementRef }) {
  const animationTime = 800;
  return (
    <View style={UniversalStyles.row_center_container}>
      <Animatable.View
        style={quantity > 1 ? IconStyles.background1 : IconStyles.background6}
        ref={(here) => {
          elementRef["minusSlideUp"] = here;
        }}
      >
        <Pressable
          onPress={() => {
            if (quantity > 1) {
              elementRef["minusSlideUp"].rubberBand(animationTime);
              setQuantity(quantity - 1);
            }
          }}
        >
          <Icon name="minus" size={18} />
        </Pressable>
      </Animatable.View>
      <Text style={UniversalStyles.quantity_container}>{quantity}</Text>
      <Animatable.View
        style={IconStyles.background1}
        ref={(here) => {
          elementRef["plusSlideUp"] = here;
        }}
      >
        <Pressable
          onPress={() => {
            elementRef["plusSlideUp"].rubberBand(animationTime);
            setQuantity((prevState) => prevState + 1);
          }}
        >
          <Icon name="plus" size={18} />
        </Pressable>
      </Animatable.View>
    </View>
  );
}
