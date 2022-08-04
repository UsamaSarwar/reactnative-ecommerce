//React
import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import NumberFormat from "react-number-format";
import Icon from "react-native-vector-icons/AntDesign";

import MatIcon from "react-native-vector-icons/MaterialIcons";

//Providers
import { useTasks } from "../providers/TasksProvider";
import { useAuth } from "../providers/AuthProvider";

//Components
import Shimmer from "./Shimmer";

//Styles
import universalStyles from "../styles/UniversalStyles";
import productCardStyles from "../styles/ProductCardStyle";
import IconStyles from "../styles/IconStyles";

export default function ProductItem({
  elementRef,
  childToParent,
  searchText,
  childToParent_edit,
}) {
  const { user, addToCart } = useAuth();
  const { tasks, total, setTotal, setAdded, deleteTask } = useTasks();
  const [loading, setLoading] = useState(true);

  const admin = user.customData["userType"] === "admin" ? true : false;

  if (tasks.length > 0 && loading) {
    setLoading(false);
  }
  // console.log(searchText, "Inside Product Item");
  const renderSlide = (item) => {
    childToParent(item);
    childToParent_edit(true);
    elementRef.current.show();
  };

  const onPressAddtoCart = async (item) => {
    console.log("Add to cart pressed Outside");

    await addToCart(item["_id"], 1);
    await user.refreshCustomData();

    setTotal(total + item.price);
    setAdded(true);

    Alert.alert(item.name, "has been added to your shopping cart.");
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
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const makeRemoveButton = (item) => {
    return (
      <View style={[IconStyles.background2, { marginLeft: 3 }]}>
        <Icon
          name="delete"
          color={"#ff6c70"}
          size={18}
          onPress={() => onPressDeleteProduct(item)}
        />
      </View>
    );
  };
  const makeAddToCartButton = (item) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: "#42C88F",
          borderRadius: 100,
          padding: 7,
          marginLeft: 3,
        }}
      >
        <MatIcon
          name="add-shopping-cart"
          color={"#42C88F"}
          size={18}
          onPress={() => onPressAddtoCart(item)}
        />
      </View>
    );
  };
  const searchTasks = tasks.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      searchText === ""
    );
  });
  return (
    <FlatList
      data={!loading ? searchTasks : [1, 2, 3, 4, 5]}
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
                <View
                  style={[universalStyles.row_f1_sb_c, { flexWrap: "wrap" }]}
                >
                  <Shimmer
                    autoRun={true}
                    visible={!loading}
                    style={productCardStyles.nameText}
                  >
                    <Text style={productCardStyles.nameText}>{item.name}</Text>
                  </Shimmer>
                </View>
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
                  makeAddToCartButton(item)
                )}
              </View>
            </View>
          </View>
        </Pressable>
      )}
    />
  );
}
