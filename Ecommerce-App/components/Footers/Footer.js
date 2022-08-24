//React
import React from "react";

//React Components
import { View, Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import MatIcon from "react-native-vector-icons/MaterialIcons";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Providers
import { useAuth } from "../../providers/AuthProvider.js";
import { useGlobal } from "../../providers/GlobalProvider.js";

//Styles
import universalStyles from "../../styles/UniversalStyles.js";
import iconStyles from "../../styles/IconStyles.js";

export default function Footer({ navigation, route, elementRef }) {
  const { personalDetails, user, userCart } = useAuth();
  const { setIsNewProduct, listType } = useGlobal();

  const admin = user.customData["userType"] === "admin" ? true : false;
  const renderSlide = () => {
    elementRef.current.show();
    setIsNewProduct(true);
  };

  const adminPanel = () => {
    return (
      <Pressable
        onPress={() => {
          listType === "Orders" || route.name === "Settings"
            ? null
            : renderSlide();
        }}
        disabled={personalDetails ? false : true}
        style={{
          backgroundColor:
            listType === "Orders" || route.name === "Setting"
              ? "gray"
              : "#42C88F",
          borderRadius: 10,
        }}
      >
        <Icon name="plus" size={30} color={"white"} />
      </Pressable>
    );
  };

  const cartCount = () => {
    return (
      <View
        style={[
          iconStyles.background4,
          {
            position: "absolute",
            top: -10,
            right: -10,
          },
        ]}
      >
        <Text style={{ textAlign: "center", textAlignVertical: "center" }}>
          {userCart.length}
        </Text>
      </View>
    );
  };

  const userPanel = () => {
    return (
      <>
        <Pressable
          onPress={() => navigation.navigate("WishlistScreen")}
          disabled={personalDetails ? false : true}
        >
          <MatIcon
            name="favorite-outline"
            size={30}
            color={route.name === "WishlistScreen" ? "black" : "grey"}
          />
        </Pressable>
        <Animatable.View ref={(here) => (elementRef.cartIcon = here)}>
          <Pressable
            onPress={() => navigation.navigate("Cart")}
            disabled={personalDetails ? false : true}
          >
            {userCart.length > 0 ? cartCount() : null}
            <Icon
              name="shoppingcart"
              size={30}
              color={
                route.name === "Cart" || route.name === "Checkout"
                  ? "black"
                  : "grey"
              }
            />
          </Pressable>
        </Animatable.View>
      </>
    );
  };

  return (
    <View style={universalStyles.footer}>
      <Pressable
        onPress={() => navigation.navigate("Homescreen")}
        disabled={personalDetails ? false : true}
      >
        <Icon
          name="home"
          size={30}
          color={route.name === "Homescreen" ? "black" : "grey"}
        />
      </Pressable>

      {admin ? adminPanel() : userPanel()}

      <Pressable
        onPress={() => navigation.navigate("Setting")}
        disabled={personalDetails ? false : true}
      >
        <Icon
          name="user"
          size={30}
          color={route.name === "Setting" ? "black" : "grey"}
        />
      </Pressable>
    </View>
  );
}
