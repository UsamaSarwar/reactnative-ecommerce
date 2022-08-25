//React Components
import React from "react";
import { View, Dimensions, Image } from "react-native";

//Styles
import UniversalStyles from "../../styles/UniversalStyles";

//Window Properties
export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

export default function CarouselCardItem({ item, index }) {
  return (
    <View style={UniversalStyles.carousel_card} key={String(index) + "View"}>
      <Image
        key={String(index) + "carousalItemImage"}
        source={{ uri: item }}
        style={UniversalStyles.carousel_image}
      />
    </View>
  );
}
