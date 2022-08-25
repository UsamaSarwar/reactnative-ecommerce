//React
import React from "react";

//React Components
import { Text, Pressable, FlatList, View } from "react-native";

//Providers
import { useGlobal } from "../providers/GlobalProvider.js";
import { useOrder } from "../providers/OrderProvider.js";

//Icons
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

//Styles
import UniversalStyles from "../styles/UniversalStyles.js";
import ComponentStyles from "../styles/ComponentStyles.js";

export default function OrderType() {
  const { orderTypes } = useGlobal();
  const { orderCategory, setOrderCategory } = useOrder();

  const onPressCategory = (item) => {
    setOrderCategory(item);
  };

  return (
    <View>
      <FlatList
        data={orderTypes}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={[UniversalStyles.margin10, UniversalStyles.marginBottom0]}
        renderItem={({ item }) => (
          <Pressable
            style={[
              ComponentStyles.category_item,
              {
                backgroundColor:
                  orderCategory === item[0]
                    ? UniversalStyles.theme_green.color
                    : UniversalStyles.theme_white_shade.color,
              },
            ]}
            onPress={() => onPressCategory(item[0])}
          >
            <View style={UniversalStyles.center_all_container}>
              <MatIcon
                name={item[1]}
                size={16}
                color={orderCategory === item[0] ? "white" : "grey"}
              />
              <Text
                style={[
                  ComponentStyles.category_align,
                  {
                    color: orderCategory === item[0] ? "white" : "grey",
                  },
                ]}
              >
                {item[0]}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
