//React
import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

//Styles
import IconStyles from "../styles/IconStyles";

export default function Quantity({ quantity, setQuantity }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={IconStyles.background1}>
        <Icon
          name="minus"
          size={21}
          onPress={() =>
            setQuantity((prevState) =>
              prevState === 1 ? prevState : prevState - 1
            )
          }
        />
      </View>
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
      <View style={IconStyles.background1}>
        <Icon
          name="plus"
          size={21}
          onPress={() => setQuantity((prevState) => prevState + 1)}
        />
      </View>
    </View>
  );
}
