//React
import React from "react";

//React Components
import { Text, Pressable, FlatList, View } from "react-native";

//Providers
import { useTasks } from "../providers/TasksProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";

export default function OrderType() {
  const { orderTypes } = useGlobal();
  const { categoryFilter, setCategoryFilter } = useTasks();

  const onPressCategory = (item) => {
    setCategoryFilter(item);
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
              backgroundColor: categoryFilter === item ? "#42C88F" : "#f6f8f9",
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
                color: categoryFilter === item ? "white" : "grey",
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
