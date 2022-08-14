//React Components
import React, { useEffect, useRef, useReducer, useState } from "react";
import {
  Alert,
  Text,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  Pressable,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";
import CountryPicker from "react-native-country-codes-picker";
import * as Animatable from "react-native-animatable";

//Provides
import { useAuth } from "../providers/AuthProvider.js";

//Styles
import UniversalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import IconStyles from "../styles/IconStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";

const initStates = {
  name: "",
  userName: "",
  address: "",
  postalCode: "",
  phoneNumber: "",
  altPhoneNumber: "",
  city: "",
  province: "",
  country: "",

  nameError: false,
  userNameError: false,
  addressError: false,
  postalCodeError: false,
  phoneNumberError: false,
  cityError: false,
  provinceError: false,
  countryError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NAME":
      return { ...state, name: action.payload, nameError: false };
    case "NAME_ERR":
      return { ...state, nameError: true };
    case "USERNAME":
      return { ...state, userName: action.payload };
    case "ADDRESS":
      return { ...state, address: action.payload, addressError: false };
    case "ADDRESS_ERR":
      return { ...state, addressError: true };
    case "POSTALCODE":
      return { ...state, postalCode: action.payload, postalCodeError: false };
    case "POSTALCODE_ERR":
      return { ...state, postalCodeError: true };
    case "PHONE":
      return { ...state, phoneNumber: action.payload, phoneNumberError: false };
    case "PHONE_ERR":
      return { ...state, phoneNumberError: true };
    case "ALTPHONE":
      return { ...state, altPhoneNumber: action.payload };
    case "CITY":
      return { ...state, city: action.payload, cityError: false };
    case "CITY_ERR":
      return { ...state, cityError: true };
    case "PROVINCE":
      return { ...state, province: action.payload, provinceError: false };
    case "PROVINCE_ERR":
      return { ...state, provinceError: true };
    case "COUNTRY":
      return { ...state, country: action.payload, countryError: false };
    case "COUNTRY_ERR":
      return { ...state, countryError: true };

    default:
      return state;
  }
};

export default function PersonalDetails({ navigation }) {
  const { personalDetails, updateUserDetails, updateAvatar } = useAuth();

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("");

  const [state, dispatch] = useReducer(reducer, initStates);

  const animationTime = 800;

  const elementRef = useRef();

  useEffect(() => {
    dispatch({ type: "NAME", payload: personalDetails.name });
    dispatch({ type: "USERNAME", payload: personalDetails.userName });
    dispatch({ type: "ADDRESS", payload: personalDetails.address });
    dispatch({ type: "POSTALCODE", payload: personalDetails.postalCode });
    dispatch({ type: "PHONE", payload: personalDetails.phoneNumber });
    dispatch({ type: "ALTPHONE", payload: personalDetails.altPhoneNumber });
    dispatch({ type: "CITY", payload: personalDetails.city });
    dispatch({ type: "PROVINCE", payload: personalDetails.province });
    dispatch({ type: "COUNTRY", payload: personalDetails.country });
  }, []);

  const onPressUpdate = () => {
    // elementRef.updateButton.bounceIn(animationTime);
    setTimeout(() => {
      if (
        state.name === "" ||
        state.userName === "" ||
        state.phoneNumber === "" ||
        state.country === "" ||
        state.province === "" ||
        state.city === "" ||
        state.address === "" ||
        state.postalCode === ""
      ) {
        if (state.name === "") {
          dispatch({ type: "NAME_ERR" });
          console.log("Name field has zero length");
        }
        if (state.phoneNumber === "") {
          dispatch({ type: "PHONE_ERR" });
          console.log("Phone Number field has zero length");
        }
        if (state.country === "") {
          dispatch({ type: "COUNTRY_ERR" });
          console.log("Country field has zero length");
        }
        if (state.province === "") {
          dispatch({ type: "PROVINCE_ERR" });
          console.log("Province field has zero length");
        }
        if (state.address === "") {
          dispatch({ type: "ADDRESS_ERR" });
          console.log("Province field has zero length");
        }
        if (state.city === "") {
          dispatch({ type: "CITY_ERR" });
          console.log("Province field has zero length");
        }
        if (state.postalCode === "") {
          dispatch({ type: "POSTALCODE_ERR" });
          console.log("Province field has zero length");
        }
      } else {
        try {
          updateUserDetails(state);
        } catch (error) {
          Alert.alert(`error.message`);
        }
      }
    }, animationTime);
  };

  const openImagePicker = () =>
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
      includeBase64: true,
    }).then((image) => updateAvatar(image.data, image.mime));

  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={UniversalStyles.background_image}
        >
          <View style={UniversalStyles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <IonIcon name="arrow-back" size={30} color="grey" />
            </Pressable>
            <Animatable.View>
              <Pressable
                style={ButtonStyles.checkout_button}
                onPress={() => onPressUpdate()}
              >
                <Text style={ButtonStyles.checkout_button_text}>Save</Text>
              </Pressable>
            </Animatable.View>
          </View>

          <ScrollView style={{ padding: 10 }}>
            <View style={UniversalStyles.avatar_container_settings_page}>
              <Image
                source={{
                  uri: `data:${personalDetails.imageForm};base64,${personalDetails.image}`,
                }}
                style={productCardStyles.avatarImage}
              />
              <Pressable
                onPress={() => openImagePicker()}
                style={[
                  IconStyles.background3,
                  { position: "absolute", right: "35%", top: "80%" },
                ]}
              >
                <Icon name="edit" color={"#ffffff"} size={21} />
              </Pressable>
            </View>

            {state.name === "" ? null : (
              <Text style={{ marginBottom: 5 }}>Full Name</Text>
            )}
            <TextInput
              defaultValue={state.name}
              placeholder="Full Name"
              style={[
                inputStyles.textInput,
                {
                  backgroundColor: "#f6f8f9",
                  borderColor: state.nameError ? "red" : "transparent",
                },
              ]}
              onChangeText={(text) => dispatch({ type: "NAME", payload: text })}
            />

            {state.userName === "" ? null : (
              <Text style={{ marginBottom: 5 }}>User Name</Text>
            )}
            <TextInput
              defaultValue={state.userName}
              placeholder="User Name"
              style={[
                inputStyles.textInput,
                {
                  backgroundColor: "#f6f8f9",
                  borderColor: "transparent",
                },
              ]}
              onChangeText={(text) =>
                dispatch({ type: "USERNAME", payload: text })
              }
            />

            {state.phoneNumber === "" ? null : (
              <Text style={{ marginBottom: 5 }}>Phone Number</Text>
            )}
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Pressable
                onPress={() => setShow(true)}
                style={[
                  UniversalStyles.centered_container,
                  inputStyles.textInput,
                  {
                    backgroundColor: "#f6f8f9",
                    borderColor: "transparent",
                    marginRight: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                  },
                ]}
              >
                <Text>{countryCode}</Text>
              </Pressable>

              <CountryPicker
                show={show}
                // when picker button press you will get the country object with dial code
                pickerButtonOnPress={(item) => {
                  setCountryCode(item.dial_code);
                  console.log(item);
                  setShow(false);
                }}
              />

              <TextInput
                defaultValue={state.phoneNumber}
                placeholder="Phone Number"
                style={[
                  inputStyles.textInput,
                  {
                    flex: 1,
                    backgroundColor: "#f6f8f9",
                    borderColor: state.phoneNumberError ? "red" : "transparent",
                  },
                ]}
                onChangeText={(text) =>
                  dispatch({ type: "PHONE", payload: text })
                }
              />
            </View>

            {state.altPhoneNumber === "" ? null : (
              <Text style={{ marginBottom: 5 }}>Alternate Phone Number</Text>
            )}
            <TextInput
              defaultValue={state.altPhoneNumber}
              placeholder="Alternate Phone Number"
              style={[
                inputStyles.textInput,
                {
                  backgroundColor: "#f6f8f9",
                  borderColor: "transparent",
                },
              ]}
              onChangeText={(text) =>
                dispatch({ type: "ALTPHONE", payload: text })
              }
            />

            {state.province === "" ? null : (
              <Text style={{ marginBottom: 5 }}>Province/Sate</Text>
            )}
            <TextInput
              defaultValue={state.province}
              placeholder="Provice/Sate"
              style={[
                inputStyles.textInput,
                {
                  backgroundColor: "#f6f8f9",
                  borderColor: state.provinceError ? "red" : "transparent",
                },
              ]}
              onChangeText={(text) =>
                dispatch({ type: "PROVINCE", payload: text })
              }
            />

            {state.city === "" ? null : (
              <Text style={{ marginBottom: 5 }}>City</Text>
            )}
            <TextInput
              defaultValue={state.city}
              placeholder="City"
              style={[
                inputStyles.textInput,
                {
                  backgroundColor: "#f6f8f9",
                  borderColor: state.cityError ? "red" : "transparent",
                },
              ]}
              onChangeText={(text) => dispatch({ type: "CITY", payload: text })}
            />

            {state.country === "" ? null : (
              <Text style={{ marginBottom: 5 }}>Country</Text>
            )}
            <TextInput
              defaultValue={state.country}
              placeholder="Country"
              style={[
                inputStyles.textInput,
                {
                  backgroundColor: "#f6f8f9",
                  borderColor: state.countryError ? "red" : "transparent",
                },
              ]}
              onChangeText={(text) =>
                dispatch({ type: "Country", payload: text })
              }
            />
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
