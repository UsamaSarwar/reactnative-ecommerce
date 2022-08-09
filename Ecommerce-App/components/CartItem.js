//React
import React, { useEffect, useState } from "react";

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
import Quantity from "./Quantity";

//Styles
import universalStyles from "../styles/UniversalStyles";
import productCardStyles from "../styles/ProductCardStyle";
import IconStyles from "../styles/IconStyles";

export default function CarItem() {
  const { updateQuantityCart, removeFromCart, user } = useAuth();
  const { getCart, getTotal, added, setAdded } = useTasks();

  const [loading, setLoading] = useState(true);
  const [activeItemArr, setActiveItemArr] = useState([]);

  const [cart, setCart] = useState(getCart(user.customData.memberOf));
  const [deleteItemArr, setDeleteItemArr] = useState([]);

  const refreshCart = async () => {
    await user.refreshCustomData();
    setCart(getCart(user.customData.memberOf));
  };

  useEffect(() => {
    refreshCart();
    setLoading(false);
  }, []);

  const onPressDelete = async (item) => {
    await removeFromCart(String(item[0]["_id"]));
    await user.refreshCustomData();
    setCart((prevState) => {
      prevState.splice(prevState.indexOf(item), 1);
      return [...prevState];
    });
    setDeleteItemArr((prevState) => {
      prevState.splice(prevState.indexOf(String(item[0]["_id"])), 1);
      return [...prevState];
    });
    // Alert.alert(item.name, "is removed from shopping cart.");
    // Snackbar.show({
    //   text:
    //     "(" +
    //     String(item[1]) +
    //     ") - " +
    //     item[0]["name"] +
    //     (item[1] > 1
    //       ? " were removed from your cart"
    //       : " is removed from your cart"),
    //   duration: Snackbar.LENGTH_SHORT,
    // });
  };

  const makeRemoveButton = (item) => {
    return (
      <View style={[IconStyles.background2, { marginLeft: 3 }]}>
        {deleteItemArr.includes(String(item[0]["_id"])) ? (
          <ActivityIndicator color={"#ff6c70"} />
        ) : (
          <Icon
            name="delete"
            color={"#ff6c70"}
            size={18}
            onPress={async () => {
              setDeleteItemArr(deleteItemArr.concat([String(item[0]["_id"])]));
              onPressDelete(item);
            }}
          />
        )}
      </View>
    );
  };

  return (
    <FlatList
      extraData={cart}
      data={cart}
      style={{ margin: 10, borderRadius: 15 }}
      renderItem={({ item }) => (
        <Pressable onPress={() => renderSlide(item)}>
          <View style={productCardStyles.productCard}>
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
                    uri: `data:${item[0].imageForm};base64,${item[0].image}`,
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
                    <Text style={productCardStyles.nameText}>
                      {item[0].name}
                    </Text>
                  </Shimmer>
                </View>
                {!loading ? makeRemoveButton(item) : null}
              </View>

              <View style={productCardStyles.categoryContainer}>
                <Shimmer
                  autoRun={true}
                  visible={!loading}
                  style={productCardStyles.categoryText}
                >
                  <Text style={productCardStyles.categoryText}>
                    {item[0].category}
                  </Text>
                </Shimmer>
              </View>

              <View style={universalStyles.row_f1_sb_c}>
                <NumberFormat
                  value={parseInt(item[0].price)}
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
                {/* <Quantity /> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={IconStyles.background2}>
                    <Icon
                      name="minus"
                      size={21}
                      onPress={async () => {
                        if (item[1] > 1) {
                          await updateQuantityCart(item[0]["_id"], false);
                          user.refreshCustomData();
                          setTotalPrice(totalPrice - Number(item[0].price));
                          setCart((prevState) => {
                            if (item[1] > 1) {
                              let index = prevState.indexOf(item);
                              let newVal = [
                                prevState[index][0],
                                prevState[index][1] - 1,
                              ];
                              prevState.splice(index, 1, newVal);
                              return [...prevState];
                            }
                          });
                        }
                      }}
                    />
                  </View>

                  <Text
                    style={{
                      marginLeft: 10,
                      marginRight: 10,
                      fontSize: 21,
                    }}
                  >
                    {item[1]}
                  </Text>

                  <View style={IconStyles.background2}>
                    <Icon
                      name="plus"
                      size={21}
                      onPress={async () => {
                        await updateQuantityCart(item[0]["_id"], true);
                        user.refreshCustomData();
                        setTotalPrice(totalPrice + Number(item[0].price));
                        setCart((prevState) => {
                          let index = prevState.indexOf(item);
                          let newVal = [
                            prevState[index][0],
                            prevState[index][1] + 1,
                          ];
                          prevState.splice(index, 1, newVal);
                          return [...prevState];
                        });
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      )}
    />
  );
}
