//React
import React from "react";

//React Components
import { Text, Pressable, FlatList, View } from "react-native";

//Providers
import { useTasks } from "../providers/TasksProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";

//Icons
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Category() {
  const { category } = useGlobal();
  const { categoryFilter, setCategoryFilter } = useTasks();

  const onPressCategory = (item) => {
    setCategoryFilter("Refresh"); //To refresh the animation
    setTimeout(() => {
      setCategoryFilter(item);
    }, 0.1);
  };

  return (
    <View>
      <FlatList
        data={category}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ margin: 10, marginBottom: 0 }}
        renderItem={({ item }) => (
          <View>
            <Pressable
              style={{
                backgroundColor:
                  categoryFilter === item[0] ? "#42C88F" : "#f6f8f9",
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
                  color={categoryFilter === item[0] ? "white" : "grey"}
                />
                <Text
                  style={{
                    textAlignVertical: "center",
                    textAlign: "center",
                    color: categoryFilter === item[0] ? "white" : "grey",
                  }}
                >
                  {item[0]}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
