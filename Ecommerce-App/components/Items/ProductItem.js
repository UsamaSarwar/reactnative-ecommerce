//React
import React, { useState } from "react";

//React Components
import { Text, View, Pressable, Image, Alert } from "react-native";
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
      <View
        style={[IconStyles.background2, { marginLeft: 3 }]}
        key={item.name + "ViewRemove"}
      >
        <Icon
          name="delete"
          key={item.name + "IconRemove"}
          color={"#ff6c70"}
          size={18}
          onPress={() => onPressDeleteProduct(item)}
        />
      </View>
    );
  };

  const makeAddToCartButton = (item) => {
    return (
      <Animatable.View
        ref={(here) => (elementRef[item._id] = here)}
        key={item.name + "ViewAdd"}
      >
        <Pressable
          style={IconStyles.background3}
          key={item.name + "PressAdd"}
          onPress={() => {
            elementRef[item._id].rotate(1000);
            elementRef.cartIcon.rubberBand(1000);
            onPressAddtoCart(item);
          }}
        >
          <MatIcon
            name="add-shopping-cart"
            size={18}
            color={"#FFFFFF"}
            key={item.name + "IconAdd"}
          />
        </Pressable>
      </Animatable.View>
    );
  };

  const makeAddtoWishListButton = (item) => {
    return (
      <Animatable.View
        ref={(here) => (elementRef[String(item._id) + "favorite"] = here)}
        key={item.name + "ViewWish"}
      >
        {!loading ? (
          <Pressable
            key={item.name + "PressWish"}
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
              key={item.name + "IconWish"}
              name="heart"
              size={24}
              color={
                userWishList.includes(String(item._id)) ? "#BC544B" : "#BBBBBB"
              }
            />
          </Pressable>
        ) : null}
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

  const data = !loading ? searchTasks : [1, 2, 3, 4, 5];

  return (
    <View style={{ margin: 10, borderRadius: 15 }} key={"Main_View"}>
      {data.map((item) => {
        return (
          <Pressable onPress={() => renderSlide(item)} key={item.name}>
            <Animatable.View
              animation={
                user.customData.userType === "admin" ? "fadeInRight" : "fadeIn"
              }
              duration={1000}
              key={item.name + "Big"}
              style={productCardStyles.productCard}
            >
              <View
                style={[
                  universalStyles.centered_container,
                  { backgroundColor: "white", padding: 10, borderRadius: 15 },
                ]}
                key={item.name + "View1"}
              >
                <Shimmer
                  autoRun={true}
                  visible={!loading}
                  style={productCardStyles.product_image}
                  key={item.name + "shimmer"}
                >
                  <Image
                    source={{
                      uri: `data:${item.imageForm};base64,${item.image}`,
                    }}
                    key={item.name + "Image"}
                    style={productCardStyles.product_image}
                  />
                </Shimmer>
              </View>

              <View
                style={productCardStyles.textContainer}
                key={item.name + "View2"}
              >
                <View
                  style={[
                    universalStyles.row_f1_sb_c,
                    { alignItems: "flex-start" },
                  ]}
                  key={item.name + "View3"}
                >
                  <View
                    style={[universalStyles.row_f1_sb_c, { flexWrap: "wrap" }]}
                    key={item.name + "View4"}
                  >
                    <Shimmer
                      autoRun={true}
                      visible={!loading}
                      style={productCardStyles.nameText}
                      key={item.name + "shimmer2"}
                    >
                      <Text
                        style={productCardStyles.nameText}
                        key={item.name + "Text1"}
                      >
                        {item.name}
                      </Text>
                    </Shimmer>
                  </View>
                  {admin && !loading
                    ? makeRemoveButton(item)
                    : makeAddtoWishListButton(item)}
                </View>

                <View
                  style={productCardStyles.categoryContainer}
                  key={item.name + "View5"}
                >
                  <Shimmer
                    autoRun={true}
                    visible={!loading}
                    style={productCardStyles.categoryText}
                    key={item.name + "Shimmer3"}
                  >
                    <Text
                      style={productCardStyles.categoryText}
                      key={item.name + "Text2"}
                    >
                      {item.category}
                    </Text>
                  </Shimmer>
                </View>

                <Shimmer
                  autoRun={true}
                  visible={!loading}
                  style={productCardStyles.descriptionText}
                  key={item.name + "Shimmer4"}
                >
                  <Text
                    numberOfLines={2}
                    style={productCardStyles.descriptionText}
                    key={item.name + "Text3"}
                  >
                    {item.description}
                  </Text>
                </Shimmer>

                <View
                  style={universalStyles.row_f1_sb_c}
                  key={item.name + "View6"}
                >
                  <NumberFormat
                    value={parseInt(item.price)}
                    displayType={"text"}
                    thousandSeparator={true}
                    key={item.name + "Number"}
                    prefix={"PKR "}
                    renderText={(value) => (
                      <Shimmer
                        autoRun={true}
                        visible={!loading}
                        style={{ marginTop: 5 }}
                        key={item.name + "Shimmer11"}
                      >
                        <Text key={item.name + "Text11"}>{value}</Text>
                      </Shimmer>
                    )}
                  />
                  {admin && !loading ? (
                    <View
                      style={IconStyles.background3}
                      key={item.name + "View12"}
                    >
                      <Icon
                        name="edit"
                        color="white"
                        size={18}
                        key={item.name + "Icon1"}
                      />
                    </View>
                  ) : !loading ? (
                    makeAddToCartButton(item)
                  ) : null}
                </View>
              </View>
            </Animatable.View>
          </Pressable>
        );
      })}
    </View>
  );
}
