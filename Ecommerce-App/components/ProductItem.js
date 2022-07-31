//React
import React, { useState } from "react";
import { Text, View, Pressable, Image, FlatList, Alert } from "react-native";
import NumberFormat from "react-number-format";
import Icon from "react-native-vector-icons/AntDesign";

//Providers
import { useTasks } from "../providers/TasksProvider";

//Components
import Shimmer from "./Shimmer";

//Styles
import universalStyles from "../styles/UniversalStyles";
import productCardStyles from "../styles/ProductCardStyle";
import IconStyles from "../styles/IconStyles";

export default function ProductItem({
  user,
  elementRef,
  childToParent,
  childToParent_edit,
  navigation,
}) {
  const { tasks } = useTasks();
  const { deleteTask } = useTasks();

  const [loading, setLoading] = useState(true);

  const admin = user.customData["userType"] === "admin" ? true : false;

  if (tasks.length > 0 && loading) {
    setLoading(false);
  }

  const renderSlide = (item) => {
    childToParent(item);
    childToParent_edit(true);
    elementRef.current.show();
  };

  const onPressDeleteProduct = (item) => {
    console.log(item);
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
    ]);
  };

  const makeRemoveButton = (item) => {
    return (
      <View style={IconStyles.background2}>
        <Icon
          name="delete"
          color={"#ff6c70"}
          size={18}
          onPress={() => onPressDeleteProduct(item)}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={!loading ? tasks : [1, 2, 3, 4, 5]}
      renderItem={({ item }) => (
        <Pressable onPress={() => renderSlide(item)}>
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
              <View style={universalStyles.row_f1_sb_c}>
                <Shimmer
                  autoRun={true}
                  visible={!loading}
                  style={productCardStyles.nameText}
                >
                  <Text style={productCardStyles.nameText}>{item.name}</Text>
                </Shimmer>
                {admin && !loading ? makeRemoveButton(item) : void 0}
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

              <View style={universalStyles.row_f1_sb_c}>
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
                {admin && !loading ? (
                  <View style={IconStyles.background2}>
                    <Icon name="edit" size={18} />
                  </View>
                ) : (
                  void 0
                )}
              </View>
            </View>
          </View>
        </Pressable>
      )}
    />
  );
}
