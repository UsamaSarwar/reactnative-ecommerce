//React
import React from "react";

//React Components
import { Text, Pressable, FlatList, View } from "react-native";

//Providers
import { useTasks } from "../providers/TasksProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";
import { useOrder } from "../providers/OrderProvider.js";

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
        style={{ margin: 10 }}
        renderItem={({ item }) => (
          <Pressable
            style={{
              backgroundColor: orderCategory === item ? "#42C88F" : "#f6f8f9",
              marginRight: 10,
              alignItems: "center",
              borderRadius: 20,
              padding: 10,
            }}
            onPress={() => onPressCategory(item)}
          >
            <Text
              style={{
                textAlignVertical: "center",
                textAlign: "center",
                color: orderCategory === item ? "white" : "grey",
              }}
            >
              {item}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
