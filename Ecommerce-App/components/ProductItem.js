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
  const [shimmerState, setShimmerState] = useState(false);
  const [initiate, setInitiate] = useState(true);
  // console.log(shimmerState);
  const renderSlide = (item) => {
    setQuantity("1");
    childToParent(item);
    elementRef.current.show();
  };
  if (tasks && initiate) {
    setShimmerState(true);
    setInitiate(false);
  }
  // useEffect(() => {
  //   if (tasks) {
  //     setShimmerState(!shimmerState);
  //   }
  // }, [tasks]);

  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            admin ? void 0 : renderSlide(item);
          }}
        >
          <View style={universalStyles.productCard}>
            {/* <Shimmer autoRun={true} visible={shimmerState}> */}
            <View style={productCardStyles.imageContainer}>
              <Shimmer
                autoRun={true}
                visible={shimmerState}
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
              <View style={productCardStyles.name}>
                <Shimmer
                  autoRun={true}
                  visible={shimmerState}
                  style={productCardStyles.nameText}
                >
                  <Text style={productCardStyles.nameText}>{item.name}</Text>
                </Shimmer>
              </View>
              <View style={productCardStyles.categoryContainer}>
                <Shimmer autoRun={true} visible={shimmerState}>
                  <Text style={productCardStyles.categoryText}>
                    {item.category}
                  </Text>
                </Shimmer>
              </View>
              <Shimmer autoRun={true} visible={shimmerState}>
                <Text
                  numberOfLines={2}
                  style={productCardStyles.descriptionText}
                >
                  {item.description}
                </Text>
              </Shimmer>
              {/* <Text> */}
              {/* PKR {item.price} */}
              {/* </Text> */}
              <Shimmer autoRun={true} visible={shimmerState}>
                <NumberFormat
                  value={parseInt(item.price)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"PKR "}
                  renderText={(value) => <Text>{value}</Text>}
                />
              </Shimmer>
            </View>
            {/* </Shimmer> */}
          </View>
        </Pressable>
      )}
    />
  );
}
