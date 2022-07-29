import React, { useState, useEffect } from "react";
import { Text, View, Pressable, Image, FlatList, Alert } from "react-native";
import Shimmer from "./Shimmer";
import NumberFormat from "react-number-format";
import { useTasks } from "../providers/TasksProvider";
import universalStyles from "../styles/UniversalStyles";
import productCardStyles from "../styles/ProductCardStyle";
import Icon from "react-native-vector-icons/AntDesign";
export default function ProductItem({
  user,
  elementRef,
  childToParent,
  navigation,
  setQuantity,
}) {
  let admin = user.customData["userType"] === "admin" ? true : false;
  const { tasks } = useTasks();
  const [loading, setLoading] = useState(true);
  const { deleteTask } = useTasks();
  // console.log(shimmerState);

  const renderSlide = (item) => {
    setQuantity("1");
    childToParent(item);
    elementRef.current.show();
  };
  // console.log(loading);
  // console.log(tasks.length);
  if (tasks.length > 0 && loading) {
    setLoading(false);
  }
  const makeEditButton = (item) => {
    return (
      <Icon
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 100,
          elevation: 3,
          fontSize: 21,
          backgroundColor: "#f6f8f9",
        }}
        name="edit"
        onPress={() => {
          navigation.navigate("Editproduct", { currItem: item });
        }}
      />
    );
  };
  const makeRemoveButton = (item) => {
    return (
      <View style={styles.cartButtonsDelete}>
        <Icon
          style={styles.cartIcons}
          name="delete"
          onPress={() =>
            Alert.alert("Are you sure you want to delete this product?", null, [
              {
                text: "Yes, Delete",
                style: "destructive",
                onPress: () => {
                  console.log("deleting item");
                  deleteTask(item);
                  navigation.navigate("Homescreen");
                },
              },
              { text: "Cancel", style: "cancel" },
            ])
          }
        />
      </View>
    );
  };
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
              <View
                style={{
                  // marginBottom: 3,
                  margin: 3,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Shimmer
                  autoRun={true}
                  visible={!loading}
                  style={{ marginBottom: 5 }}
                >
                  <Text style={productCardStyles.nameText}>{item.name}</Text>
                </Shimmer>
                {admin ? makeRemoveButton(item) : void 0}
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
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
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
                {admin ? makeEditButton(item) : void 0}
              </View>
            </View>
          </View>
        </Pressable>
      )}
    />
  );
}
