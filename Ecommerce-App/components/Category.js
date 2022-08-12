//React
import React from "react";

//React Components
import { Text, Pressable, FlatList, View } from "react-native";

//Providers
import { useGlobal } from "../providers/GlobalProvider.js";

//Styles
import universalStyles from "../styles/UniversalStyles.js";
import iconStyles from "../styles/IconStyles.js";

export default function Category() {
  const { category, categoryFilter, setCategoryFilter } = useGlobal();

  const onPressCategory = (item) => {
    setCategoryFilter(item);
  };

  return (
    <FlatList
      data={category}
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
              height: 30,
              color: categoryFilter === item ? "white" : "grey",
            }}
          >
            {item}
          </Text>
        </Pressable>
      )}
    />
  );
}
