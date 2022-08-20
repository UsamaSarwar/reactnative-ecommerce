//React
import React, { useState } from "react";

//React Components
import { Text, View, Pressable, Image, FlatList } from "react-native";
import NumberFormat from "react-number-format";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Icons
import Icon from "react-native-vector-icons/AntDesign";

//Providers
import { useAuth } from "../../providers/AuthProvider";
import { useTasks } from "../../providers/TasksProvider";
import { useGlobal } from "../../providers/GlobalProvider";

//Styles
import universalStyles from "../../styles/UniversalStyles";
import productCardStyles from "../../styles/ProductCardStyle";
import IconStyles from "../../styles/IconStyles";

export default function WishListItem({ elementRef }) {
  const { user, removeFromUserCart, updateQuantity, userWishList } = useAuth();
  const { shoppingCart, wishList } = useTasks();
  const { setProduct, setIsNewProduct, cartUpdate, setCartUpdate } =
    useGlobal();
  const [loading, setLoading] = useState(false);

  const animationTime = 700;

  const onPressMinus = (item) => {
    elementRef[item._id + "removeIcon"].rubberBand(animationTime);
    updateQuantity(item["_id"], false);
    setCartUpdate(!cartUpdate);
  };

  const onPressPlus = (item) => {
    updateQuantity(item["_id"], true);
    setCartUpdate(!cartUpdate);
  };

  const onPressDelete = (item) => {
    removeFromUserCart(item["_id"]);
    setCartUpdate(!cartUpdate);
  };

  const animateDelete = (item) => {
    elementRef[String(item[0]._id) + "deleteButton"].fadeOutLeft(animationTime);
    setTimeout(() => onPressDelete(item[0]), animationTime);
    setTimeout(
      () =>
        elementRef[String(item[0]._id) + "deleteButton"].fadeInRight(
          animationTime
        ),
      animationTime
    );
  };

  const makeRemoveButton = (item) => {
    return (
      <Pressable
        style={[IconStyles.background2, { marginLeft: 3 }]}
        onPress={() => animateDelete(item)}
      >
        <Icon name="delete" color={"#ff6c70"} size={18} />
      </Pressable>
    );
  };

  const renderSlide = (item) => {
    elementRef.current.show();
    setProduct(item);
    setIsNewProduct(false);
  };

  return (
    <FlatList
      data={wishList}
      showsVerticalScrollIndicator={false}
      style={{ margin: 10, borderRadius: 15 }}
      renderItem={({ item }) => (
        <Pressable onPress={() => renderSlide(item[0])}>
          <Animatable.View
            style={productCardStyles.productCard}
            ref={(here) => {
              elementRef[String(item[0]._id) + "deleteButton"] = here;
            }}
          >
            <View
              style={[
                universalStyles.centered_container,
                { backgroundColor: "white", padding: 10, borderRadius: 15 },
              ]}
            >
              <Image
                source={{
                  uri: `data:${item[0].imageForm};base64,${item[0].image}`,
                }}
                style={productCardStyles.product_image}
              />
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
                  <Text style={productCardStyles.nameText}>{item[0].name}</Text>
                </View>
                {makeRemoveButton(item)}
              </View>

              <View style={productCardStyles.categoryContainer}>
                <Text style={productCardStyles.categoryText}>
                  {item[0].category}
                </Text>
              </View>

              <View style={universalStyles.row_f1_sb_c}>
                <NumberFormat
                  value={parseInt(item[0].price)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"PKR "}
                  renderText={(value) => <Text>{value}</Text>}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Animatable.View
                    style={
                      item[1] === 1
                        ? IconStyles.background5
                        : IconStyles.background2
                    }
                    ref={(here) =>
                      (elementRef[item[0]._id + "removeIcon"] = here)
                    }
                  >
                    <Pressable
                      onPress={() =>
                        item[1] === 1
                          ? animateDelete(item)
                          : onPressMinus(item[0])
                      }
                    >
                      <Icon name="minus" size={18} />
                    </Pressable>
                  </Animatable.View>

                  <Text
                    style={{
                      marginLeft: 10,
                      marginRight: 10,
                      fontSize: 21,
                    }}
                  >
                    {item[1]}
                  </Text>

                  <Animatable.View
                    style={IconStyles.background2}
                    ref={(here) =>
                      (elementRef[item[0]._id + "plusIcon"] = here)
                    }
                  >
                    <Pressable
                      onPress={() => {
                        elementRef[item[0]._id + "plusIcon"].rubberBand(
                          animationTime
                        );
                        onPressPlus(item[0]);
                      }}
                    >
                      <Icon name="plus" size={18} />
                    </Pressable>
                  </Animatable.View>
                </View>
              </View>
            </View>
          </Animatable.View>
        </Pressable>
      )}
    />
  );
}
