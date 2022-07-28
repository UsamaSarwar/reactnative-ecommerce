import React, { useState, useEffect } from "react";
import { Text, View, Pressable, Image, FlatList } from "react-native";
import Shimmer from "../Shimmer";
import NumberFormat from "react-number-format";
import { useTasks } from "../providers/TasksProvider";

import universalStyles from "../styles/UniversalStyles";
import productCardStyles from "../styles/ProductCardStyle";

export default function ProductItem({
  user,
  elementRef,
  childToParent,
  setQuantity,
}) {
  let admin = user.customData["userType"] === "admin" ? true : false;
  const { tasks } = useTasks();
  const [loading, setLoading] = useState(true);
  // console.log(shimmerState);
  const renderSlide = (item) => {
    setQuantity("1");
    childToParent(item);
    elementRef.current.show();
  };
  console.log(loading);
  console.log(tasks.length);
  if (tasks.length > 0 && loading) {
    setLoading(false);
  }
  return (
    <FlatList
      data={!loading ? tasks : [1, 2, 3, 4, 5]}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            admin ? void 0 : renderSlide(item);
          }}
        >
          <View style={universalStyles.productCard}>
            <View style={productCardStyles.imageContainer}>
              <Shimmer
                autoRun={true}
                visible={!loading}
                style={productCardStyles.image}
              >
                <Image
                  source={{
                    uri: `data:${item.imageForm};base64,${item.image}`,
                  }}
                  style={productCardStyles.image}
                />
              </Shimmer>
            </View>
            <View style={productCardStyles.textContainer}>
              <View style={productCardStyles.nameText}>
                <Shimmer
                  autoRun={true}
                  visible={!loading}
                  style={{ marginBottom: 5 }}
                >
                  <Text style={productCardStyles.nameText}>{item.name}</Text>
                </Shimmer>
              </View>
              <View style={productCardStyles.categoryContainer}>
                <Shimmer
                  autoRun={true}
                  visible={!loading}
                  style={productCardStyles.categoryText}
                >
                  <Text style={productCardStyles.categoryText}>
                    {item.category}
                  </Text>
                </Shimmer>
              </View>
              <Shimmer
                autoRun={true}
                visible={!loading}
                style={productCardStyles.descriptionText}
              >
                <Text
                  numberOfLines={2}
                  style={productCardStyles.descriptionText}
                >
                  {item.description}
                </Text>
              </Shimmer>

              <NumberFormat
                value={parseInt(item.price)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"PKR "}
                renderText={(value) => (
                  <Shimmer
                    autoRun={true}
                    visible={!loading}
                    style={{ marginTop: 5 }}
                  >
                    <Text>{value}</Text>
                  </Shimmer>
                )}
              />
            </View>
          </View>
        </Pressable>
      )}
    />
  );
}
