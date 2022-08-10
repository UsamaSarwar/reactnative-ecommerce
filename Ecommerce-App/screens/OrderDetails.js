import React, { useState } from "react";
import { Text, View, TextInput, ScrollView } from "react-native";
import universalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import { useAuth } from "../providers/AuthProvider.js";
// import { useOrder } from "../providers/OrderProvider";

export default function OrderDetails({ navigation, route }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [altPhoneNumber, setAltPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <ScrollView>
      <View style={universalStyles.main}>
        <View>
          <Text style={{ marginLeft: 10, marginTop: 10 }}>
            Full Name <Text style={{ color: "orange" }}>*</Text>
          </Text>
          <TextInput
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
            placeholder="House#/ apartment# along with Area Name"
            style={[inputStyles.textInput, { margin: 10 }]}
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
            placeholder="Enter your Area's Postal Code"
            style={[inputStyles.textInput, { margin: 10 }]}
            onChangeText={(value) => {
              setPostalCode(value);
            }}
          ></TextInput>
        </View>
      </View>
    </ScrollView>
  );
}
