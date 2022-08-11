import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import universalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import { useAuth } from "../providers/AuthProvider.js";
// import { useOrder } from "../providers/OrderProvider";

import UniversalStyles from "../styles/UniversalStyles.js";

export default function OrderDetails({ navigation }) {
  const { user, updateUserDetails } = useAuth();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [altPhoneNumber, setAltPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const log_address = () => {
    console.log(address);
  };
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
          <View style={universalStyles.main}>
            <View>
              <Text style={{ marginLeft: 10, marginTop: 10 }}>
                Full Name <Text style={{ color: "orange" }}>*</Text>
              </Text>
              <TextInput
                defaultValue={user.customData.details.name}
                placeholder="Enter your Full Name"
                style={[inputStyles.textInput, { margin: 10 }]}
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
                style={[inputStyles.textInput, { margin: 10 }]}
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
                style={[inputStyles.textInput, { margin: 10 }]}
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
                style={[inputStyles.textInput, { margin: 10 }]}
              ></TextInput>
            </View>
            <View>
              <Text style={{ marginLeft: 10 }}>
                City<Text style={{ color: "orange" }}>*</Text>
              </Text>
              <TextInput
                defaultValue={user.customData.details.city}
                placeholder="Enter your City Name"
                style={[inputStyles.textInput, { margin: 10 }]}
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
                style={[inputStyles.textInput, { margin: 10 }]}
                onChangeText={(value) => {
                  setAddress(value);
                  log_address();
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
                style={[inputStyles.textInput, { margin: 10 }]}
                onChangeText={(value) => {
                  setPostalCode(value);
                }}
              ></TextInput>
            </View>
            <View>
              <Pressable
                style={[styles.s_button]}
                onPress={() => {
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
                }}
              >
                <Text style={styles.s_button_text}>Update</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
