//React
import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import NumberFormat from "react-number-format";
// import Snackbar from "react-native-snackbar";

//Providers
import { useAuth } from "../providers/AuthProvider";
import { useTasks } from "../providers/TasksProvider";
import { useGlobal } from "../providers/GlobalProvider";

//Components
import Quantity from "./Quantity";

//Styles
import UniversalStyles from "../styles/UniversalStyles";

export default function UserSlideUpCard({ elementRef }) {
  const { user, addToCart } = useAuth();
  const { total, setTotal, setAdded } = useTasks();

  const { product } = useGlobal();

  const [activity, setActivity] = useState(false);

  const [quantity, setQuantity] = useState("1");

  useEffect(() => setQuantity("1"), [product]);

  const onPressAddtoCart = async () => {
    console.log("Add to cart pressed");

    await addToCart(product["_id"], quantity);
    await user.refreshCustomData();
    setActivity(false);
    setTotal(total + product.price * quantity);
    setAdded(true);
    elementRef.current.hide();
    // Snackbar.show({
    //   text:
    //     "(" +
    //     String(quantity) +
    //     ") - " +
    //     data["name"] +
    //     (quantity > 1 ? " are added to your cart" : " is added to your cart"),
    //   duration: Snackbar.LENGTH_SHORT,
    // });
    // Alert.alert(data.name, "has been added to your shopping cart.");
  };

  return (
    <View style={UniversalStyles.col_f_e}>
      <View style={UniversalStyles.col_wbg_p20}>
        <View style={UniversalStyles.view_card_img_1}>
          <Image
            source={{
              uri: `data:${product.imageForm};base64,${product.image}`,
            }}
            style={{
              height: "100%",
              resizeMode: "contain",
              borderRadius: 10,
            }}
          />
        </View>
        <View>
          <View style={{ marginBottom: 2 }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {product.name}
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 11,
                color: "grey",
              }}
            >
              {product.category}
            </Text>
          </View>
        </View>
        <ScrollView style={{ height: 60 }}>
          <View>
            <Text style={{ fontSize: 15 }}>{product.description}</Text>
          </View>
        </ScrollView>
        <View
          style={[
            UniversalStyles.row_f1_sb_c,
            {
              marginTop: 10,
              marginBottom: 15,
            },
          ]}
        >
          <NumberFormat
            value={parseInt(product.price)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"PKR "}
            renderText={(value) => <Text>{value}</Text>}
          />

          <Quantity quantity={quantity} setQuantity={setQuantity} />
        </View>
        {activity ? (
          <Pressable style={buttonStyles.p_button_login}>
            <ActivityIndicator size="large" color={"white"} />
          </Pressable>
        ) : (
          <Pressable
            style={buttonStyles.p_button_login}
            onPress={() => {
              setActivity(true);
              onPressAddtoCart();
            }}
          >
            <Text style={buttonStyles.p_button_text}>Add to Cart</Text>
          </Pressable>
        )}

        <Pressable style={buttonStyles.s_button}>
          <Text style={buttonStyles.s_button_text}>Checkout Now</Text>
        </Pressable>
      </View>
    </View>
  );
}
