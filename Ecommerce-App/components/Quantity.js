//React
import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Styles
import IconStyles from "../styles/IconStyles";

export default function Quantity({ quantity, setQuantity, elementRef }) {
  const animationTime = 800;
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Animatable.View
        style={quantity > 1 ? IconStyles.background1 : IconStyles.background6}
        ref={(here) => {
          elementRef["minusSlideUp"] = here;
        }}
      >
        <Icon
          name="minus"
          size={21}
          onPress={() => {
            if (quantity > 1) {
              elementRef["minusSlideUp"].rubberBand(animationTime);
              setQuantity(quantity - 1);
            }
          }}
        />
      </Animatable.View>
      <Text
        style={{
          marginLeft: 10,
          marginRight: 10,
          fontSize: 21,
          textAlign: "center",
        }}
      >
        {quantity}
      </Text>
      <Animatable.View
        style={IconStyles.background1}
        ref={(here) => {
          elementRef["plusSlideUp"] = here;
        }}
      >
        <Icon
          name="plus"
          size={21}
          onPress={() => {
            elementRef["plusSlideUp"].rubberBand(animationTime);
            setQuantity((prevState) => prevState + 1);
          }}
        />
      </Animatable.View>
    </View>
  );
}
