//React
import React, { useEffect, useState } from "react";

//React Components
import {
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import NumberFormat from "react-number-format";

//Icons
import Icon from "react-native-vector-icons/AntDesign";

//Providers
import { useAuth } from "../providers/AuthProvider";
import { useTasks } from "../providers/TasksProvider";
import { useGlobal } from "../providers/GlobalProvider";

//Components
import Shimmer from "./Shimmer";

//Styles
import universalStyles from "../styles/UniversalStyles";
import productCardStyles from "../styles/ProductCardStyle";
import IconStyles from "../styles/IconStyles";

export default function CarItem() {
  const { removeFromUserCart, updateQuantity } = useAuth();
  const { shoppingCart } = useTasks();
  const { cartUpdate, setCartUpdate } = useGlobal();

  const [loading, setLoading] = useState(false);

  const [updatingCart, setUpdatingCart] = useState(false);

  const onPressMinus = (item) => {
    updateQuantity(item["_id"], false);
    setCartUpdate(!cartUpdate);
  };

  const onPressPlus = (item) => {
    updateQuantity(item["_id"], true);
    setCartUpdate(!cartUpdate);
  };

  const onPressDelete = async (item) => {
    setUpdatingCart(true);
    removeFromUserCart(item["_id"]);
    setUpdatingCart(false);
    setCartUpdate(!cartUpdate);
  };

  const makeRemoveButton = (item) => {
    return (
      <View style={[IconStyles.background2, { marginLeft: 3 }]}>
        {updatingCart ? (
          <ActivityIndicator color={"#ff6c70"} />
        ) : (
          <Icon
            name="delete"
            color={"#ff6c70"}
            size={21}
            onPress={() => onPressDelete(item[0])}
          />
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={shoppingCart}
      style={{ margin: 10, borderRadius: 15 }}
      renderItem={({ item }) => (
        <Pressable onPress={() => renderSlide(item[0])}>
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
                      onPress={() =>
                        item[1] === 1
                          ? onPressDelete(item[0])
                          : onPressMinus(item[0])
                      }
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
                      onPress={() => onPressPlus(item[0])}
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
