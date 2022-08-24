import React from "react";
import { View, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

export default function CarouselCardItem({ item, index }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        marginTop: 10,
      }}
      key={String(index) + "View"}
    >
      <Image
        key={String(index) + "carousalItemImage"}
        source={{ uri: item }}
        style={{
          height: 200,
          borderRadius: 10,
        }}
      />
    </View>
  );
}
