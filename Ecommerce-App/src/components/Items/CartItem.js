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
import productCardStyles from "../../styles/ProductCardStyle";
import IconStyles from "../../styles/IconStyles";
import UniversalStyles from "../../styles/UniversalStyles";

//This loads the items at the cart screen such that it also loads the icons/functionality with them.

export default function CarItem({ elementRef }) {
  const { removeFromUserCart, updateQuantity } = useAuth();
  const { shoppingCart } = useTasks();
  const { setProduct, setIsNewProduct, update, setUpdate } = useGlobal();

  const animationTime = 700;

  const onPressMinus = (item) => {
    elementRef[item._id + "removeIcon"].rubberBand(animationTime);
    updateQuantity(item["_id"], false);
    setUpdate(!update);
  };

  const onPressPlus = (item) => {
    updateQuantity(item["_id"], true);
    setUpdate(!update);
  };

  const onPressDelete = (item) => {
    removeFromUserCart(item["_id"]);
    setUpdate(!update);
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
        style={[IconStyles.background2, UniversalStyles.marginLeft3]}
        onPress={() => animateDelete(item)}
      >
        <Icon name="delete" color={UniversalStyles.theme_red.color} size={18} />
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
      data={shoppingCart}
      showsVerticalScrollIndicator={false}
      style={UniversalStyles.cart_list}
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
                UniversalStyles.centered_container,
                UniversalStyles.image_cart,
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
                  UniversalStyles.row_f1_sb_c,
                  UniversalStyles.flex_start_align,
                ]}
              >
                <View
                  style={[
                    UniversalStyles.row_f1_sb_c,
                    UniversalStyles.flex_wrap_view,
                  ]}
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

              <View style={UniversalStyles.row_f1_sb_c}>
                <NumberFormat
                  value={parseInt(item[0].price)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"PKR "}
                  renderText={(value) => <Text>{value}</Text>}
                />

                <View style={UniversalStyles.flex_align_row}>
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

                  <Text style={UniversalStyles.container_view_cart}>
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
