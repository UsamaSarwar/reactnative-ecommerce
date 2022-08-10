//React
import React, { useState } from "react";

//React Components
import {
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import NumberFormat from "react-number-format";

//Animation-Component
import * as Animatable from "react-native-animatable";
// import Snackbar from "react-native-snackbar";

//Icons
import Icon from "react-native-vector-icons/AntDesign";
import MatIcon from "react-native-vector-icons/MaterialIcons";

//Providers
import { useTasks } from "../providers/TasksProvider";
import { useAuth } from "../providers/AuthProvider";
import { useGlobal } from "../providers/GlobalProvider";

//Components
import Shimmer from "./Shimmer";

//Styles
import universalStyles from "../styles/UniversalStyles";
import productCardStyles from "../styles/ProductCardStyle";
import IconStyles from "../styles/IconStyles";

export default function ProductItem({ elementRef, searchText }) {
  const { user, addToUserCart } = useAuth();
  const { tasks, deleteTask } = useTasks();
  const { setProduct, setIsNewProduct } = useGlobal();

  const [loading, setLoading] = useState(true);

  const [updatingCart, setUpdatingCart] = useState(false);

  const admin = user.customData["userType"] === "admin" ? true : false;

  if (tasks.length > 0 && loading) {
    setLoading(false);
  }

  const renderSlide = (item) => {
    elementRef.current.show();
    setProduct(item);
    setIsNewProduct(false);
  };

  const onPressAddtoCart = (item) => {
    setUpdatingCart(true);
    addToUserCart(item["_id"], 1);
    setUpdatingCart(false);
  };

  const onPressDeleteProduct = (item) => {
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
      <View style={IconStyles.background3}>
        {updatingCart ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Animatable.View ref={(here) => (elementRef[item._id] = here)}>
            <MatIcon
              name="add-shopping-cart"
              size={18}
              color={"#FFFFFF"}
              onPress={() => {
                elementRef[item._id].rotate(1000);
                elementRef.cartIcon.rubberBand(1000);
                onPressAddtoCart(item);
              }}
            />
          </Animatable.View>
        )}
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
      style={{ margin: 10, borderRadius: 15 }}
      renderItem={({ item }) => (
        <Pressable onPress={() => renderSlide(item)}>
          <Animatable.View
            animation="zoomInUp"
            duration={1500}
            style={productCardStyles.productCard}
          >
            <View
              style={[
                universalStyles.centered_container,
                { backgroundColor: "white", padding: 10, borderRadius: 15 },
              ]}
            >
              <Shimmer
                autoRun={true}
                visible={!loading}
                style={productCardStyles.product_image}
              >
                <Image
                  source={{
                    uri: `data:${item.imageForm};base64,${item.image}`,
                  }}
                  style={productCardStyles.product_image}
                />
              </Shimmer>
            </View>

            <View style={productCardStyles.textContainer}>
              <View
                style={[
                  universalStyles.row_f1_sb_c,
                  { alignItems: "flex-start" },
                ]}
              >
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
                {admin && !loading ? makeRemoveButton(item) : null}
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
                  <View style={IconStyles.background3}>
                    <Icon name="edit" color="white" size={18} />
                  </View>
                ) : !loading ? (
                  makeAddToCartButton(item)
                ) : null}
              </View>
            </View>
          </Animatable.View>
        </Pressable>
      )}
    />
  );
}
