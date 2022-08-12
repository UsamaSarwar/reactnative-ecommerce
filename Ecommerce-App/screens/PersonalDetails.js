import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  Pressable,
  ImageBackground,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import ImagePicker from "react-native-image-crop-picker";

import universalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import IconStyles from "../styles/IconStyles.js";

import { useAuth } from "../providers/AuthProvider.js";
// import { useOrder } from "../providers/OrderProvider";

import UniversalStyles from "../styles/UniversalStyles.js";

export default function OrderDetails({ navigation: { goBack } }) {
  const { updateUserDetails, personalDetails, updateAvatar } = useAuth();

  const [nameError, setNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [provinceError, setProvinceError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);

  const [name, setName] = useState(personalDetails.name);
  const [userName, setUserName] = useState(personalDetails.userName);
  const [phoneNumber, setPhoneNumber] = useState(personalDetails.phoneNumber);
  const [altPhoneNumber, setAltPhoneNumber] = useState(
    personalDetails.altPhoneNumber
  );
  const [country, setCountry] = useState(personalDetails.country);
  const [province, setProvince] = useState(personalDetails.province);
  const [city, setCity] = useState(personalDetails.city);
  const [address, setAddress] = useState(personalDetails.address);
  const [postalCode, setPostalCode] = useState(personalDetails.postalCode);

  const onPressUpdate = () => {
    if (
      name === "" ||
      userName === "" ||
      phoneNumber === "" ||
      country === "" ||
      province === "" ||
      city === "" ||
      address === "" ||
      postalCode === ""
    ) {
      if (name === "") {
        setNameError(true);
        console.log("Name field has zero length");
      } else {
        setNameError(false);
      }
      if (phoneNumber === "") {
        setPhoneNumberError(true);
        console.log("Phone Number field has zero length");
      } else {
        setPhoneNumberError(false);
      }
      if (country === "") {
        setCountryError(true);
        console.log("Country field has zero length");
      } else {
        setCountryError(false);
      }
      if (province === "") {
        setProvinceError(true);
        console.log("Province field has zero length");
      } else {
        setProvinceError(false);
      }
      if (address === "") {
        setAddressError(true);
        console.log("Province field has zero length");
      } else {
        setAddressError(false);
      }
      if (city === "") {
        setCityError(true);
        console.log("Province field has zero length");
      } else {
        setCityError(false);
      }
      if (postalCode === "") {
        setPostalCodeError(true);
        console.log("Province field has zero length");
      } else {
        setPostalCodeError(false);
      }
    } else {
      try {
        updateUserDetails(
          name,
          userName,
          phoneNumber,
          altPhoneNumber,
          country,
          city,
          province,
          address,
          postalCode
        );
        Alert.alert("User Details updated");
        goBack();
      } catch (error) {
        Alert.alert(`error.message`);
      }
    }
  };

  const openImagePicker = () =>
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      updateAvatar(image.data, image.mime);
    });

  return (
    <View style={universalStyles.page_container}>
      <ImageBackground
        source={require("../assets/home.jpeg")}
        resizeMode="cover"
        style={universalStyles.background_image}
      >
        <View style={UniversalStyles.header}>
          <Text style={{ fontSize: 23 }}>Update Personal Details</Text>
        </View>
        <ScrollView>
          <View style={universalStyles.avatar_container_settings_page}>
            <Image
              source={{
                uri: `data:${personalDetails.imageForm};base64,${personalDetails.image}`,
              }}
              style={productCardStyles.avatarImage}
            />
            <View
              style={[
                IconStyles.background3,
                {
                  top: "90%",
                  right: "10%",
                  position: "absolute",
                  alignSelf: "flex-end",
                },
              ]}
            >
              <Icon
                name="edit"
                color={"#ffffff"}
                size={24}
                onPress={() => openImagePicker()}
              />
            </View>
          </View>
          <View style={{ marginBottom: 10, top: -20 }}>
            <View>
              <Text style={{ marginLeft: 10, marginTop: 10 }}>
                Full Name <Text style={{ color: "orange" }}>*</Text>
              </Text>
              <TextInput
                defaultValue={personalDetails.name}
                placeholder="Enter your Full Name"
                style={[
                  inputStyles.textInput,
                  { margin: 10, borderColor: nameError ? "red" : "#42C88F" },
                ]}
                onChangeText={(value) => {
                  setName(value);
                }}
              ></TextInput>
            </View>
            <View>
              <Text style={{ marginLeft: 10 }}>Username</Text>
              <TextInput
                defaultValue={
                  personalDetails.userName ? personalDetails.userName : "User"
                }
                placeholder="Enter your UserName"
                style={[inputStyles.textInput, { margin: 10 }]}
                onChangeText={(value) => {
                  setUserName(value);
                }}
              ></TextInput>
            </View>
            <View>
              <Text style={{ marginLeft: 10 }}>
                Phone Number <Text style={{ color: "orange" }}>*</Text>
              </Text>
              <TextInput
                defaultValue={personalDetails.phoneNumber}
                placeholder="Enter your Phone Number"
                onChangeText={(value) => {
                  setPhoneNumber(value);
                }}
                style={[
                  inputStyles.textInput,
                  {
                    margin: 10,
                    borderColor: phoneNumberError ? "red" : "#42C88F",
                  },
                ]}
              ></TextInput>
            </View>
            <View>
              <Text style={{ marginLeft: 10 }}>Alternate Phone Number</Text>
              <TextInput
                defaultValue={personalDetails.altPhoneNumber}
                placeholder="Enter your Phone Number"
                style={[inputStyles.textInput, { margin: 10 }]}
                onChangeText={(value) => {
                  setAltPhoneNumber(value);
                }}
              ></TextInput>
            </View>
            <View>
              <Text style={{ marginLeft: 10 }}>
                Country<Text style={{ color: "orange" }}>*</Text>
              </Text>
              <TextInput
                defaultValue={personalDetails.country}
                placeholder="Enter your Country Name"
                onChangeText={(value) => {
                  setCountry(value);
                }}
                style={[
                  inputStyles.textInput,
                  { margin: 10, borderColor: countryError ? "red" : "#42C88F" },
                ]}
              ></TextInput>
            </View>
            <View>
              <Text style={{ marginLeft: 10 }}>
                State/ Province<Text style={{ color: "orange" }}>*</Text>
              </Text>
              <TextInput
                defaultValue={personalDetails.province}
                placeholder="Enter your State/Province Name"
                onChangeText={(value) => {
                  setProvince(value);
                }}
                style={[
                  inputStyles.textInput,
                  {
                    margin: 10,
                    borderColor: provinceError ? "red" : "#42C88F",
                  },
                ]}
              ></TextInput>
            </View>
            <View>
              <Text style={{ marginLeft: 10 }}>
                City<Text style={{ color: "orange" }}>*</Text>
              </Text>
              <TextInput
                defaultValue={personalDetails.city}
                placeholder="Enter your City Name"
                style={[
                  inputStyles.textInput,
                  { margin: 10, borderColor: cityError ? "red" : "#42C88F" },
                ]}
                onChangeText={(value) => {
                  setCity(value);
                }}
              ></TextInput>
            </View>
            <View>
              <Text style={{ marginLeft: 10 }}>
                Address Details<Text style={{ color: "orange" }}>*</Text>
              </Text>
              <TextInput
                defaultValue={personalDetails.address}
                placeholder="House#/ apartment# along with Area Name"
                style={[
                  inputStyles.textInput,
                  { margin: 10, borderColor: addressError ? "red" : "#42C88F" },
                ]}
                onChangeText={(value) => {
                  setAddress(value);
                }}
              ></TextInput>
            </View>
            <View>
              <Text style={{ marginLeft: 10 }}>
                Postal Code<Text style={{ color: "orange" }}>*</Text>
              </Text>
              <TextInput
                defaultValue={personalDetails.postalCode}
                placeholder="Enter your Area's Postal Code"
                style={[
                  inputStyles.textInput,
                  {
                    margin: 10,
                    borderColor: postalCodeError ? "red" : "#42C88F",
                  },
                ]}
                onChangeText={(value) => {
                  setPostalCode(value);
                }}
              ></TextInput>
            </View>
          </View>
        </ScrollView>
        <View>
          <Pressable
            style={[
              // styles.s_button,
              {
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                backgroundColor: "#42C88F",
              },
            ]}
            onPress={() => onPressUpdate()}
          >
            <Text style={[styles.s_button_text, { color: "white" }]}>
              Update
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
