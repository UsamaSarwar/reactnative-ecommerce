//React

//React Components
import React, { useState, useEffect } from "react";
import { Text, View, Pressable, Image, ScrollView } from "react-native";
import NumberFormat from "react-number-format";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Providers
import { useAuth } from "../../providers/AuthProvider";
import { useGlobal } from "../../providers/GlobalProvider";

//Components
import Quantity from "../Quantity";

//Styles
import UniversalStyles from "../../styles/UniversalStyles";
import { Icon } from "react-native-elements";

export default function UserSlideUpCard({ elementRef }) {
  const { addToUserCart } = useAuth();

  const { product } = useGlobal();

  const [addToCartPressed, setAddToCartPressed] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const animationTime = 800;

  useEffect(() => setQuantity(1), [product]);

  const onPressAddtoCart = () => {
    addToUserCart(product["_id"], quantity);
    elementRef[String(product._id) + "addToCartButton"].bounce(animationTime);
    setTimeout(() => {
      elementRef.current.hide();
      setAddToCartPressed(false);
    }, animationTime);
  };

  return (
    <View>
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

      <View>
        <Text style={{ fontSize: 15 }}>{product.description}</Text>
      </View>

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

        <Quantity
          quantity={quantity}
          setQuantity={setQuantity}
          elementRef={elementRef}
        />
      </View>

      <Pressable
        style={buttonStyles.p_button_login}
        onPress={() => {
          setAddToCartPressed(true);
          onPressAddtoCart();
        }}
      >
        <Animatable.View
          ref={(here) => {
            elementRef[String(product._id) + "addToCartButton"] = here;
          }}
        >
          {addToCartPressed ? (
            <Icon name="check" size={28} color="white" />
          ) : (
            <Text style={buttonStyles.p_button_text}>Add to Cart</Text>
          )}
        </Animatable.View>
      </Pressable>

      <Pressable style={buttonStyles.s_button}>
        <Text style={buttonStyles.s_button_text}>Checkout Now</Text>
      </Pressable>
    </View>
  );
}
