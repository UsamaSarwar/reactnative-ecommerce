//React
import React, { useState } from "react";
import { Alert, Text, View, Pressable, Image } from "react-native";
import NumberFormat from "react-number-format";

//Providers
import { useAuth } from "../providers/AuthProvider";
import { useTasks } from "../providers/TasksProvider";

//Components
import Quantity from "./Quantity";

//Styles
import UniversalStyles from "../styles/UniversalStyles";

export default function UserSlideUpCard({ data, setAdded }) {
  const { user, addToCart } = useAuth();
  const { total, setTotal } = useTasks();

  const [quantity, setQuantity] = useState("1");

  const onPressAddtoCart = async () => {
    console.log("Add to cart pressed");

    await addToCart(data["_id"], quantity);
    await user.refreshCustomData();

    setTotal(total + data.price * quantity);
    setAdded(true);

    Alert.alert(data.name, "has been added to your shopping cart.");
  };

  return (
    <View style={UniversalStyles.col_f_e}>
      <View style={UniversalStyles.col_wbg_p20}>
        <View style={UniversalStyles.view_card_img_1}>
          <Image
            source={{
              uri: `data:${data.imageForm};base64,${data.image}`,
            }}
            style={{
              height: "100%",
              resizeMode: "contain",
              borderRadius: 10,
            }}
          />
        </View>

        <View
          style={[
            UniversalStyles.flex1,
            {
              marginBottom: 3,
            },
          ]}
        >
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>{data.name}</Text>
        </View>

        <View
          style={[
            UniversalStyles.flex1,
            {
              marginBottom: 5,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 11,
              color: "grey",
            }}
          >
            {data.category}
          </Text>
        </View>

        <Text numberOfLines={3} style={{ marginBottom: 10, fontSize: 15 }}>
          {data.description}
        </Text>
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
            value={parseInt(data.price)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"PKR "}
            renderText={(value) => <Text>{value}</Text>}
          />

          <Quantity quantity={quantity} setQuantity={setQuantity} />
        </View>

        <Pressable style={buttonStyles.p_button} onPress={onPressAddtoCart}>
          <Text style={buttonStyles.p_button_text}>Add to Cart</Text>
        </Pressable>

        <Pressable style={buttonStyles.s_button}>
          <Text style={buttonStyles.s_button_text}>Checkout Now</Text>
        </Pressable>
      </View>
    </View>
  );
}
