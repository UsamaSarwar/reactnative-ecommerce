//React
import React, { useState } from "react";

//React Components
import { Text, View, Pressable, Image, FlatList, Alert } from "react-native";
import NumberFormat from "react-number-format";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Icons
import Icon from "react-native-vector-icons/AntDesign";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import IonIcon from "react-native-vector-icons/Ionicons";

//Providers
import { useTasks } from "../../providers/TasksProvider";
import { useAuth } from "../../providers/AuthProvider";
import { useGlobal } from "../../providers/GlobalProvider";

//Components
import Shimmer from "../Shimmer";

//Styles
import universalStyles from "../../styles/UniversalStyles";
import productCardStyles from "../../styles/ProductCardStyle";
import IconStyles from "../../styles/IconStyles";

export default function ProductItem({ elementRef }) {
  const {
    user,
    addToUserCart,
    addToUserWishList,
    userWishList,
    removeFromUserWishList,
  } = useAuth();
  const { tasks, deleteTask } = useTasks();
  const {
    setProduct,
    setIsNewProduct,
    searchText,
    listType,
    update,
    setUpdate,
  } = useGlobal();

  // console.log(userWishList.length);

  const [loading, setLoading] = useState(true);

  const admin = user.customData["userType"] === "admin" ? true : false;

  if (tasks.length > 0 && loading) {
    setLoading(false);
  }

  const renderSlide = (item) => {
    elementRef.current.show();
    setProduct(item);
    setIsNewProduct(false);
  };

  const onPressRemoveFromWishList = (item) => {
    removeFromUserWishList(item["_id"]);
    setUpdate(!update);
  };

  const onPressAddtoCart = (item) => {
    addToUserCart(item["_id"], 1);
  };

  const onPressAddtoWishList = (item) => {
    addToUserWishList(item["_id"]);
  };

  const onPressDeleteProduct = (item) => {
    Alert.alert("Are you sure you want to delete this product?", null, [
      {
        text: "Yes, Delete",
        style: "destructive",
        onPress: () => {
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
      <Animatable.View ref={(here) => (elementRef[item._id] = here)}>
        <Pressable
          style={IconStyles.background3}
          onPress={() => {
            elementRef[item._id].rotate(1000);
            elementRef.cartIcon.rubberBand(1000);
            onPressAddtoCart(item);
          }}
        >
          <MatIcon name="add-shopping-cart" size={18} color={"#FFFFFF"} />
        </Pressable>
      </Animatable.View>
    );
  };

  const makeAddtoWishListButton = (item) => {
    return (
      <Animatable.View
        ref={(here) => (elementRef[String(item._id) + "favorite"] = here)}
      >
        <Shimmer
          autoRun={true}
          visible={!loading}
          style={{ marginLeft: 5, width: 24, height: 24, borderRadius: 12 }}
        >
          <Pressable
            onPress={() => {
              if (userWishList.includes(String(item._id))) {
                elementRef[String(item._id) + "favorite"].pulse(1000);
                onPressRemoveFromWishList(item);
              } else {
                elementRef[String(item._id) + "favorite"].tada(1000);
                onPressAddtoWishList(item);
              }
            }}
          >
            <IonIcon
              name="heart"
              size={24}
              color={
                userWishList.includes(String(item._id)) ? "#BC544B" : "#BBBBBB"
              }
            />
          </Pressable>
        </Shimmer>
      </Animatable.View>
    );
  };
  const searchTasks =
    listType === "Inventory"
      ? tasks.filter((item) => {
          return (
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            searchText === ""
          );
        })
      : tasks;

  return (
    <FlatList
      data={!loading ? searchTasks : [1, 2, 3, 4, 5]}
      showsVerticalScrollIndicator={false}
      style={{ margin: 10, borderRadius: 15 }}
      renderItem={({ item }) => (
        <Pressable onPress={() => renderSlide(item)}>
          <Animatable.View
            animation={
              user.customData.userType === "admin" ? "fadeInRight" : "zoomInUp"
            }
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
                {admin && !loading
                  ? makeRemoveButton(item)
                  : makeAddtoWishListButton(item)}
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
