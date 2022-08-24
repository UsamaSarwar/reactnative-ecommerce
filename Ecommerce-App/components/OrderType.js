//React
import React from "react";

//React Components
import { Text, Pressable, FlatList, View } from "react-native";

//Providers
import { useTasks } from "../providers/TasksProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";
import { useOrder } from "../providers/OrderProvider.js";

//Icons
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

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
        style={{ margin: 10, marginBottom: 0 }}
        renderItem={({ item }) => (
          <Pressable
            style={{
              backgroundColor:
                orderCategory === item[0] ? "#42C88F" : "#f6f8f9",
              marginRight: 10,
              alignItems: "center",
              borderRadius: 20,
              padding: 10,
            }}
            onPress={() => onPressCategory(item[0])}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MatIcon
                name={item[1]}
                size={16}
                color={orderCategory === item[0] ? "white" : "grey"}
              />
              <Text
                style={{
                  textAlignVertical: "center",
                  textAlign: "center",
                  color: orderCategory === item[0] ? "white" : "grey",
                }}
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
