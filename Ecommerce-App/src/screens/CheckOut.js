//React Components
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";

//React Icons
import Icon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";

//Providers
import { useAuth } from "../providers/AuthProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";

//Other Components
import CheckoutHeader from "../components/Headers/CheckoutHeader.js";
import CheckoutItem from "../components/Items/CheckoutItem.js";
import CheckoutFooter from "../components/Footers/CheckoutFooter.js";

//Styles
import UniversalStyles from "../styles/UniversalStyles.js";
import IconStyles from "../styles/IconStyles.js";
import Styles from "../styles/Styles.js";

export default function Checkout({ navigation }) {
  const { personalDetails } = useAuth();
  const { checkDetailsError } = useGlobal();
  const [payMethod, setPayMethod] = useState(false);

  const [addressError, setAddressError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  useEffect(() => {
    setAddressError(
      personalDetails.address && personalDetails.postalCode ? false : true
    );
    setLocationError(
      personalDetails.city &&
        personalDetails.province &&
        personalDetails.country
        ? false
        : true
    );
    setNumberError(personalDetails.phoneNumber ? false : true);
    checkDetailsError();
  }, [personalDetails]);
  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={UniversalStyles.background_image}
        >
          <CheckoutHeader navigation={navigation} />

          <View
            style={[
              UniversalStyles.input_fields_container_1,
              UniversalStyles.paddingBottom0,
            ]}
          >
            <View
              style={[UniversalStyles.flex_row, UniversalStyles.marginBottom10]}
            >
              <Text style={UniversalStyles.font_checkout}>
                Shipping Details
              </Text>
              <Pressable
                style={[IconStyles.background3, UniversalStyles.checkout_bg]}
                onPress={() => {
                  checkDetailsError();
                  navigation.navigate("Personaldetails");
                }}
              >
                <Icon
                  name="edit"
                  size={18}
                  color={UniversalStyles.theme_white.color}
                />
              </Pressable>
            </View>
            <View style={Styles.row_center_mb10}>
              <IonIcon
                name="home-outline"
                color={
                  addressError
                    ? UniversalStyles.theme_red.color
                    : UniversalStyles.theme_green.color
                }
                size={27}
              />
              <View
                style={[
                  UniversalStyles.flex_wrap_view,
                  UniversalStyles.flex_row,
                ]}
              >
                <Text
                  style={[
                    UniversalStyles.marginLeft7,
                    {
                      fontStyle: personalDetails.address ? "normal" : "italic",
                      color: personalDetails.address ? "black" : "gray",
                    },
                  ]}
                >
                  {personalDetails.address
                    ? personalDetails.address
                    : "(Address Missing)"}
                </Text>
                <Text
                  style={{
                    fontStyle: personalDetails.postalCode ? "normal" : "italic",
                    color: personalDetails.postalCode ? "black" : "gray",
                  }}
                >
                  {personalDetails.postalCode
                    ? " (" + personalDetails.postalCode + ")"
                    : ", (PostalCode Missing)"}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <IonIcon
                name="location-outline"
                color={
                  locationError
                    ? UniversalStyles.theme_red.color
                    : UniversalStyles.theme_green.color
                }
                size={27}
              />
              <View
                style={[
                  UniversalStyles.flex_wrap_view,
                  UniversalStyles.row_center_container,
                ]}
              >
                <Text
                  style={[
                    UniversalStyles.marginLeft7,
                    {
                      fontStyle: personalDetails.city ? "normal" : "italic",
                      color: personalDetails.city ? "black" : "gray",
                    },
                  ]}
                >
                  {personalDetails.city
                    ? personalDetails.city + ", "
                    : "(City Missing)"}
                </Text>
                <Text
                  style={{
                    fontStyle: personalDetails.province ? "normal" : "italic",
                    color: personalDetails.province ? "black" : "gray",
                  }}
                >
                  {personalDetails.province
                    ? personalDetails.province + ", "
                    : ", (Province Missing)"}
                </Text>
                <Text
                  style={{
                    fontStyle: personalDetails.country ? "normal" : "italic",
                    color: personalDetails.country ? "black" : "gray",
                  }}
                >
                  {personalDetails.country
                    ? personalDetails.country
                    : ", (Country Missing)"}
                </Text>
              </View>
            </View>
            <View
              style={[
                UniversalStyles.flex_wrap_view,
                UniversalStyles.row_center_container,
              ]}
            >
              <IonIcon
                name="call-outline"
                color={
                  numberError
                    ? UniversalStyles.theme_red.color
                    : UniversalStyles.theme_green.color
                }
                size={27}
              />

              <View
                style={[
                  UniversalStyles.flex_wrap_view,
                  UniversalStyles.flex_row,
                ]}
              >
                <Text
                  style={[
                    UniversalStyles.marginLeft7,
                    {
                      fontStyle: personalDetails.phoneNumber
                        ? "normal"
                        : "italic",
                      color: personalDetails.phoneNumber ? "black" : "gray",
                    },
                  ]}
                >
                  {personalDetails.phoneNumber
                    ? personalDetails.phoneNumber
                    : "(Phone# Missing)"}
                </Text>
                <Text
                  style={{
                    fontStyle: personalDetails.altPhoneNumber
                      ? "normal"
                      : "italic",
                    color: personalDetails.altPhoneNumber ? "black" : "gray",
                  }}
                >
                  {personalDetails.altPhoneNumber
                    ? ", " + personalDetails.altPhoneNumber
                    : ", (AltPhone# Missing)"}
                </Text>
              </View>
            </View>

            <View style={UniversalStyles.checkout_pm_container}>
              <Text style={UniversalStyles.font_checkout}>Payment Method</Text>

              <Text style={UniversalStyles.pm_method}>
                {payMethod ? "Card" : "COD"}
              </Text>
            </View>
            <View style={UniversalStyles.row_sa_container}>
              <Pressable
                style={[
                  UniversalStyles.checkout_sum,
                  {
                    backgroundColor: payMethod ? "white" : null,
                  },
                ]}
                onPress={() => setPayMethod(true)}
              >
                <Image
                  source={require("../assets/credit-card.png")}
                  style={UniversalStyles.checkout_pm_image}
                />
              </Pressable>
              <Pressable
                style={[
                  UniversalStyles.checkout_sum,
                  {
                    backgroundColor: payMethod ? null : "white",
                  },
                ]}
                onPress={() => setPayMethod(false)}
              >
                <Image
                  source={require("../assets/cash-on-delivery.png")}
                  style={UniversalStyles.checkout_pm_image}
                />
              </Pressable>
            </View>
            <Text style={UniversalStyles.checkout_pm_text}>Order Summary</Text>
          </View>
          <CheckoutItem />

          <CheckoutFooter navigation={navigation} payMethod={payMethod} />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
