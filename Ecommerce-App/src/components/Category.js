//React
import React from "react";

//React Components
import { Text, Pressable, FlatList, View } from "react-native";

//Providers
import { useTasks } from "../providers/TasksProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";

//Icons
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

//Styles
import UniversalStyles from "../styles/UniversalStyles.js";
import ComponentStyles from "../styles/ComponentStyles.js";

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
        style={[UniversalStyles.margin10, UniversalStyles.marginBottom5]}
        renderItem={({ item }) => (
          <View>
            <Pressable
              style={[
                ComponentStyles.category_item,
                {
                  backgroundColor:
                    categoryFilter === item[0]
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
                  color={categoryFilter === item[0] ? "white" : "grey"}
                />
                <Text
                  style={[
                    ComponentStyles.category_align,
                    {
                      color: categoryFilter === item[0] ? "white" : "grey",
                    },
                  ]}
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
