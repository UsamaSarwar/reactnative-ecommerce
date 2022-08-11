import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  ImageBackground,
  Alert,
} from "react-native";
import universalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import { useAuth } from "../providers/AuthProvider.js";
// import { useOrder } from "../providers/OrderProvider";

import UniversalStyles from "../styles/UniversalStyles.js";

export default function OrderDetails({ navigation }) {
  const {
    user,
    updateUserDetails,
    name,
    phoneNumber,
    altPhoneNumber,
    country,
    province,
    city,
    address,
    postalCode,
    setName,
    setPhoneNumber,
    setAltPhoneNumber,
    setCountry,
    setProvince,
    setCity,
    setAddress,
    setPostalCode,
  } = useAuth();

  const [nameError, setNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [countryError, setcountryError] = useState(false);
  const [provinceError, setProvinceError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);

  const onPressUpdate = () => {
    if (
      name === "" ||
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
        setcountryError(true);
        console.log("Country field has zero length");
      } else {
        setcountryError(false);
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
          phoneNumber,
          altPhoneNumber,
          country,
          city,
          province,
          address,
          postalCode
        );
        Alert.alert("User Details updated");
        navigation.navigate("Setting");
      } catch (error) {
        Alert.alert(`error.message`);
      }
    }
  };
  return (
    <ScrollView>
      <View style={universalStyles.main}>
        <View>
          <Text style={{ marginLeft: 10, marginTop: 10 }}>
            Full Name <Text style={{ color: "orange" }}>*</Text>
          </Text>
          <TextInput
            defaultValue={user.customData.details.name}
            placeholder="Enter your Full Name"
            style={[
              inputStyles.textInput,
              { margin: 10, borderColor: nameError ? "red" : "green" },
            ]}
            onChangeText={(value) => {
              setName(value);
            }}
          ></TextInput>
        </View>
        <View>
          <Text style={{ marginLeft: 10 }}>
            Phone Number <Text style={{ color: "orange" }}>*</Text>
          </Text>
          <TextInput
            defaultValue={user.customData.details.phoneNumber}
            placeholder="Enter your Phone Number"
            onChangeText={(value) => {
              setPhoneNumber(value);
            }}
            style={[
              inputStyles.textInput,
              { margin: 10, borderColor: phoneNumberError ? "red" : "green" },
            ]}
          ></TextInput>
        </View>
        <View>
          <Text style={{ marginLeft: 10 }}>Alternate Phone Number</Text>
          <TextInput
            defaultValue={user.customData.details.altPhoneNumber}
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
            defaultValue={user.customData.details.country}
            placeholder="Enter your Country Name"
            onChangeText={(value) => {
              setCountry(value);
            }}
            style={[
              inputStyles.textInput,
              { margin: 10, borderColor: countryError ? "red" : "green" },
            ]}
          ></TextInput>
        </View>
        <View>
          <Text style={{ marginLeft: 10 }}>
            State/ Province<Text style={{ color: "orange" }}>*</Text>
          </Text>
          <TextInput
            defaultValue={user.customData.details.province}
            placeholder="Enter your State/Province Name"
            onChangeText={(value) => {
              setProvince(value);
            }}
            style={[
              inputStyles.textInput,
              { margin: 10, borderColor: provinceError ? "red" : "green" },
            ]}
          ></TextInput>
        </View>
        <View>
          <Text style={{ marginLeft: 10 }}>
            City<Text style={{ color: "orange" }}>*</Text>
          </Text>
          <TextInput
            defaultValue={user.customData.details.city}
            placeholder="Enter your City Name"
            style={[
              inputStyles.textInput,
              { margin: 10, borderColor: cityError ? "red" : "green" },
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
            defaultValue={user.customData.details.address}
            placeholder="House#/ apartment# along with Area Name"
            style={[
              inputStyles.textInput,
              { margin: 10, borderColor: addressError ? "red" : "green" },
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
            defaultValue={user.customData.details.postalCode}
            placeholder="Enter your Area's Postal Code"
            style={[
              inputStyles.textInput,
              { margin: 10, borderColor: postalCodeError ? "red" : "green" },
            ]}
            onChangeText={(value) => {
              setPostalCode(value);
            }}
          ></TextInput>
        </View>
        <View>
          <Pressable
            style={styles.s_button}
            onPress={() => {
              onPressUpdate();
            }}
          >
            <Text style={styles.s_button_text}>Update</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
