//React
import React from "react";
import { View, TextInput } from "react-native";
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
          onPress={() => {
            setQuantity((prevState) =>
              prevState === "1" ? prevState : String(Number(prevState) - 1)
            );
          }}
        />
      </View>
      <TextInput
        style={{
          marginLeft: 10,
          marginRight: 10,
          fontSize: 21,
        }}
        onChangeText={(text) => setQuantity(text)}
        value={quantity}
        keyboardType="number-pad"
        textAlign="center"
      ></TextInput>
      <View style={IconStyles.background1}>
        <Icon
          name="plus"
          size={21}
          onPress={() => {
            setQuantity((prevState) => String(Number(prevState) + 1));
          }}
        />
      </View>
    </View>
  );
}
