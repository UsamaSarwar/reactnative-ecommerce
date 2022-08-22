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
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";
import * as Animatable from "react-native-animatable";
import Snackbar from "react-native-snackbar";
import DropDownPicker from "react-native-dropdown-picker";

//Provides
import { useAuth } from "../providers/AuthProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";

//Styles
import UniversalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import IconStyles from "../styles/IconStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";

export default function PersonalDetails({ navigation }) {
  const { personalDetails, updateUserDetails, updateAvatar } = useAuth();
  const { detailsError, setDetailsError, checkDetailsError } = useGlobal();

  const animationTime = 800;
  const [savePressed, setSavePressed] = useState(false);

  const [name, setName] = useState(personalDetails.name);
  const [nameError, setNameError] = useState(false);

  const [userName, setUserName] = useState(personalDetails.userName);
  const [userNameError, setUserNameError] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(personalDetails.phoneNumber);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [altPhoneNumber, setAltPhoneNumber] = useState(
    personalDetails.altPhoneNumber
  );
  const [altPhoneNumberError, setAltPhoneNumberError] = useState(false);

  const [address, setAddress] = useState(personalDetails.address);
  const [addressError, setAddressError] = useState(false);

  const [postalCode, setPostalCode] = useState(personalDetails.postalCode);
  const [postalCodeError, setPostalCodeError] = useState(false);

  const [cityName, setCityName] = useState(personalDetails.city);
  const [cityError, setCityError] = useState(false);

  const [provinceName, setProvinceName] = useState(personalDetails.province);
  const [provinceError, setProvinceError] = useState(false);

  const [countryName, setCountryName] = useState(personalDetails.country);
  const [countryError, setCountryError] = useState(false);

  const [imageTemp, setImageTemp] = useState(personalDetails.image);
  const [imageFormTemp, setImageFormTemp] = useState(personalDetails.imageForm);

  const elementRef = useRef();

  const [countryAndProvincesData, setCountryAndProvincesData] = useState([]);
  const [countryCodeData, setCountryCodeData] = useState([]);
  const [countryPhoneCode, setCountryPhoneCode] = useState(
    personalDetails.countryCode
  );

  const [openCountryDropDown, setOpenCountryDropDown] = useState(false);
  const [openProvinceDropDown, setOpenProvinceDropDown] = useState(false);
  const [openCityDropDown, setOpenCityDropDown] = useState(false);

  useEffect(() => {
    // this api contains list of country names and their phone codes
    axios
      .get(
        "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json"
      )
      .then((res) => {
        setCountryCodeData(res.data);
      })
      .catch((err) => console.error(err));
    // this api contains list of countries their states and their cities
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => {
        setCountryAndProvincesData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getCountryCode();
  }, [countryName]);

  useEffect(() => {
    checkError();
  }, [
    name,
    userName,
    phoneNumber,
    altPhoneNumber,
    countryName,
    provinceName,
    cityName,
    address,
    postalCode,
  ]);

  const getCountryCode = () => {
    if (countryCodeData.length > 0) {
      let phoneCodeArray = countryCodeData.filter(
        (item) => item.name === countryName
      );
      let phoneCodeItem = phoneCodeArray.map((item) => item.dial_code);
      const dial_code = phoneCodeItem[0];
      setCountryPhoneCode(dial_code);
    }
  };

  let countries = [
    ...new Set(countryAndProvincesData.map((item) => item.country)),
  ];
  countries.sort().reverse();
  let countryList = [];
  for (let i = 0; i < countries.length; i++) {
    countryList.push({ label: countries[i], value: countries[i] });
  }

  let countryItems = countryAndProvincesData.filter(
    (item) => item.country === countryName
  );
  let provinces = [...new Set(countryItems.map((item) => item.subcountry))];
  provinces.sort().reverse();
  let provinceList = [];
  for (let i = 0; i < provinces.length; i++) {
    provinceList.push({ label: provinces[i], value: provinces[i] });
  }

  let provinceItems = countryAndProvincesData.filter(
    (item) => item.subcountry === provinceName && item.country === countryName
  );
  let cities = [...new Set(provinceItems.map((item) => item.name))];
  cities.sort().reverse();
  let cityList = [];
  for (let i = 0; i < cities.length; i++) {
    cityList.push({ label: cities[i], value: cities[i] });
  }

  const checkError = async () => {
    if (
      !name ||
      !phoneNumber ||
      phoneNumber?.length < 10 ||
      altPhoneNumber?.length < 10 ||
      !countryName ||
      !provinceName ||
      !cityName ||
      !address ||
      !postalCode
    ) {
      setDetailsError(true); // global
      if (!name) {
        setNameError(true);
      } else {
        setNameError(false);
      }
      if (!phoneNumber) {
        setPhoneNumberError(true);
      } else {
        setPhoneNumberError(false);
      }
      if (phoneNumber?.length < 10) {
        setPhoneNumberError(true);
      } else {
        setPhoneNumberError(false);
      }
      if (altPhoneNumber?.length < 10) {
        setAltPhoneNumberError(true);
      } else {
        setAltPhoneNumberError(false);
      }
      if (!countryName) {
        setCountryError(true);
      } else {
        setCountryError(false);
      }
      if (!provinceName) {
        setProvinceError(true);
      } else {
        setProvinceError(false);
      }
      if (!address) {
        setAddressError(true);
      } else {
        setAddressError(false);
      }
      if (!cityName) {
        setCityError(true);
      } else {
        setCityError(false);
      }
      if (!postalCode) {
        setPostalCodeError(true);
      } else {
        setPostalCodeError(false);
      }
    } else {
      setNameError(false);
      setPhoneNumberError(false);
      setAltPhoneNumberError(false);
      setCountryError(false);
      setProvinceError(false);
      setAddressError(false);
      setCityError(false);
      setPostalCodeError(false);
      setDetailsError(false);
    }
  };

  const onPressUpdate = () => {
    setTimeout(() => {
      try {
        updateUserDetails(
          name,
          userName,
          countryPhoneCode,
          phoneNumber,
          altPhoneNumber,
          countryName,
          provinceName,
          cityName,
          address,
          postalCode
        );
        updateAvatar(imageTemp, imageFormTemp);
      } catch (error) {
        Alert.alert(error.message);
      }
    }, animationTime);
  };

  const openImagePicker = () =>
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setImageTemp(image.data);
      setImageFormTemp(image.mime);
    });
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
            <View>
              <Pressable
                style={ButtonStyles.checkout_button}
                onPress={() => {
                  setSavePressed(true);
                  elementRef["saveButton"].fadeInRight(animationTime);
                  setTimeout(() => {
                    checkDetailsError();
                    onPressUpdate();
                    setSavePressed(false);
                    Snackbar.show({
                      text: "Your Personal Details have been Updated 📝",
                      duration: Snackbar.LENGTH_LONG,
                    });
                    navigation.goBack();
                  }, animationTime);
                }}
              >
                <Animatable.View
                  ref={(here) => {
                    elementRef["saveButton"] = here;
                  }}
                >
                  {!savePressed ? (
                    <Text style={ButtonStyles.checkout_button_text}>Save</Text>
                  ) : (
                    <View
                      style={{ width: 47, alignItems: "center", height: 28 }}
                    >
                      <IonIcon
                        name="checkmark-circle-outline"
                        color={"white"}
                        size={27}
                      />
                    </View>
                  )}
                </Animatable.View>
              </Pressable>
            </View>
          </View>
          <ScrollView style={{ padding: 10 }} listMode="SCROLLVIEW">
            <Pressable
              onPress={() => {
                //To close every dropdown
                setOpenCountryDropDown(false);
                setOpenCityDropDown(false);
                setOpenProvinceDropDown(false);
              }}
            >
              {/* list mode set to SCROLLVIEW to avoid nested lists error */}
              <View style={UniversalStyles.avatar_container_settings_page}>
                <Image
                  source={{
                    uri: `data:${imageFormTemp};base64,${imageTemp}`,
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
              <Text style={{ marginBottom: 5 }}>
                Full Name
                {/* asterick */}
                <Text
                  style={{
                    color: "red",
                    fontSize: 17,
                    height: 13,
                  }}
                >
                  *
                </Text>
              </Text>
              <TextInput
                defaultValue={personalDetails.name}
                placeholder="Full Name"
                style={[
                  inputStyles.textInput,
                  {
                    backgroundColor: "#f6f8f9",
                    borderColor: nameError ? "red" : "transparent",
                  },
                ]}
                onChangeText={(text) => {
                  setName(text);
                }}
              />
              <View style={{ zIndex: -1 }}>
                <Text style={{ marginBottom: 5 }}>UserName</Text>
                <TextInput
                  defaultValue={personalDetails.userName}
                  placeholder="UserName"
                  style={[
                    inputStyles.textInput,
                    {
                      backgroundColor: "#f6f8f9",
                      borderColor: userNameError ? "red" : "transparent",
                    },
                  ]}
                  onChangeText={(text) => {
                    setUserName(text);
                  }}
                />

                <Text style={{ marginBottom: 5 }}>
                  Select Country
                  {/* asterick */}
                  <Text
                    style={{
                      color: "red",
                      fontSize: 17,
                      height: 13,
                    }}
                  >
                    *
                  </Text>
                </Text>
                <DropDownPicker
                  style={{
                    marginBottom: 24,
                    borderColor: countryError ? "red" : "transparent",
                    backgroundColor: "#f6f8f9",
                  }}
                  placeholder="Select your country"
                  listMode="SCROLLVIEW"
                  dropDownDirection="BOTTOM"
                  searchable={true}
                  dropDownContainerStyle={{
                    backgroundColor: "#f6f8f9",
                    borderColor: "#6D6D6D",
                    borderRadius: 12,
                  }}
                  searchContainerStyle={{
                    backgroundColor: "#f6f8f9",
                    borderColor: "#6D6D6D",
                    borderRadius: 12,
                  }}
                  searchPlaceholder={"Search Country Here..."}
                  value={countryName}
                  open={openCountryDropDown}
                  setOpen={setOpenCountryDropDown}
                  items={countryList}
                  setValue={setCountryName}
                />
              </View>
              <View style={{ zIndex: -2 }}>
                <Text style={{ marginBottom: 5 }}>
                  Select Province/ State
                  {/* asterick */}
                  <Text
                    style={{
                      color: "red",
                      fontSize: 17,
                      height: 13,
                    }}
                  >
                    *
                  </Text>
                </Text>
                <DropDownPicker
                  style={{
                    marginBottom: 24,
                    borderColor: provinceError ? "red" : "transparent",
                    backgroundColor: "#f6f8f9",
                  }}
                  listMode="SCROLLVIEW"
                  dropDownContainerStyle={{
                    backgroundColor: "#f6f8f9",
                    borderColor: "#6D6D6D",
                    borderRadius: 12,
                  }}
                  searchContainerStyle={{
                    backgroundColor: "#f6f8f9",
                    borderColor: "#6D6D6D",
                    borderRadius: 12,
                  }}
                  searchPlaceholder={"Search Country Here..."}
                  placeholder="Select your province/ State"
                  dropDownDirection="BOTTOM"
                  searchable={true}
                  value={provinceName}
                  open={openProvinceDropDown}
                  setOpen={setOpenProvinceDropDown}
                  items={provinceList}
                  setValue={setProvinceName}
                />
                <View style={{ zIndex: 999 }}>
                  <Text style={{ marginBottom: 5 }}>
                    Select City
                    {/* asterick */}
                    <Text
                      style={{
                        color: "red",
                        fontSize: 17,
                        height: 13,
                      }}
                    >
                      *
                    </Text>
                  </Text>
                  <DropDownPicker
                    style={{
                      marginBottom: 24,
                      borderColor: cityError ? "red" : "transparent",
                      backgroundColor: "#f6f8f9",
                    }}
                    value={cityName}
                    listMode="SCROLLVIEW"
                    dropDownContainerStyle={{
                      backgroundColor: "#f6f8f9",
                      borderColor: "#6D6D6D",
                      borderRadius: 12,
                    }}
                    searchContainerStyle={{
                      backgroundColor: "#f6f8f9",
                      borderColor: "#6D6D6D",
                      borderRadius: 12,
                    }}
                    searchPlaceholder={"Search Country Here..."}
                    dropDownDirection="BOTTOM"
                    searchable={true}
                    open={openCityDropDown}
                    setOpen={setOpenCityDropDown}
                    items={cityList}
                    setValue={setCityName}
                    placeholder="Select your City"
                  />
                </View>

                <View style={{ zIndex: -5 }}></View>

                <Text style={{ marginBottom: 5 }}>
                  Phone Number
                  {/* asterick */}
                  <Text
                    style={{
                      color: "red",
                      fontSize: 17,
                      height: 13,
                    }}
                  >
                    *
                  </Text>
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    style={[
                      inputStyles.textInput,
                      {
                        borderColor: "transparent",
                        backgroundColor: "#f6f8f9",
                        flex: 0.13,
                      },
                    ]}
                    defaultValue={countryPhoneCode}
                    editable={false}
                    selectTextOnFocus={false}
                  />
                  <TextInput
                    maxLength={10}
                    keyboardType="numeric"
                    defaultValue={personalDetails.phoneNumber}
                    placeholder="Phone Number"
                    style={[
                      inputStyles.textInput,
                      {
                        backgroundColor: "#f6f8f9",
                        borderColor: phoneNumberError ? "red" : "transparent",
                        flex: 1,
                      },
                    ]}
                    onChangeText={(text) => {
                      setPhoneNumber(text);
                    }}
                  />
                </View>

                <Text style={{ marginBottom: 5 }}>Alternate Phone Number</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    style={[
                      inputStyles.textInput,
                      {
                        borderColor: "transparent",
                        backgroundColor: "#f6f8f9",
                        flex: 0.13,
                      },
                    ]}
                    defaultValue={countryPhoneCode}
                    editable={false}
                    selectTextOnFocus={false}
                  />
                  <TextInput
                    maxLength={10}
                    keyboardType="numeric"
                    defaultValue={personalDetails.altPhoneNumber}
                    placeholder="Alternate Phone Number"
                    style={[
                      inputStyles.textInput,
                      {
                        backgroundColor: "#f6f8f9",
                        borderColor: altPhoneNumberError
                          ? "red"
                          : "transparent",
                        flex: 1,
                      },
                    ]}
                    onChangeText={(text) => {
                      setAltPhoneNumber(text);
                    }}
                  />
                </View>

                <Text style={{ marginBottom: 5 }}>
                  Address
                  {/* asterick */}
                  <Text
                    style={{
                      color: "red",
                      fontSize: 17,
                      height: 13,
                    }}
                  >
                    *
                  </Text>
                </Text>
                <TextInput
                  defaultValue={personalDetails.address}
                  placeholder="Phone Number"
                  style={[
                    inputStyles.textInput,
                    {
                      backgroundColor: "#f6f8f9",
                      borderColor: addressError ? "red" : "transparent",
                    },
                  ]}
                  onChangeText={(text) => {
                    setAddress(text);
                  }}
                />
                <Text style={{ marginBottom: 5 }}>
                  Postal Code
                  {/* asterick */}
                  <Text
                    style={{
                      color: "red",
                      fontSize: 17,
                      height: 13,
                    }}
                  >
                    *
                  </Text>
                </Text>
                <TextInput
                  keyboardType="numeric"
                  defaultValue={personalDetails.postalCode}
                  placeholder="Postal Code"
                  style={[
                    inputStyles.textInput,
                    {
                      backgroundColor: "#f6f8f9",
                      borderColor: postalCodeError ? "red" : "transparent",
                    },
                  ]}
                  onChangeText={(text) => {
                    setPostalCode(text);
                  }}
                />
              </View>
            </Pressable>
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
