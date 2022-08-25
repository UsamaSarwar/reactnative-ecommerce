//React

//React Components
import React, { useState, useEffect } from "react";
import { Text, View, Pressable, Image, ScrollView } from "react-native";
import NumberFormat from "react-number-format";
import { Icon } from "react-native-elements";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Providers
import { useAuth } from "../../providers/AuthProvider";
import { useGlobal } from "../../providers/GlobalProvider";

//Components
import Quantity from "../Quantity";

//Styles
import UniversalStyles from "../../styles/UniversalStyles";
import ProductCardStyle from "../../styles/ProductCardStyle";
import TextStyles from "../../styles/TextStyles";

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
          style={ProductCardStyle.prod_image_card}
        />
      </View>

      <View>
        <View style={UniversalStyles.marginBottom2}>
          <Text style={ProductCardStyle.nameText}>{product.name}</Text>
        </View>

        <View style={UniversalStyles.marginBottom10}>
          <Text style={ProductCardStyle.categoryText}>{product.category}</Text>
        </View>
      </View>

      <ScrollView>
        <Text style={TextStyles.above_normal_font}>{product.description}</Text>
      </ScrollView>

      <View style={ProductCardStyle.user_prod_card}>
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
            <Icon
              name="check"
              size={28}
              color={UniversalStyles.theme_white.color}
            />
          ) : (
            <Text style={buttonStyles.p_button_text}>Add to Cart</Text>
          )}
        </Animatable.View>
      </Pressable>
    </View>
  );
}
