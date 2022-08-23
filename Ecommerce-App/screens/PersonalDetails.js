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
  const { setDetailsError, checkDetailsError } = useGlobal();

  const animationTime = 800;
  const [savePressed, setSavePressed] = useState(false);

  const [name, setName] = useState(personalDetails.name);

  const [userName, setUserName] = useState(personalDetails.userName);

  const [phoneNumber, setPhoneNumber] = useState(personalDetails.phoneNumber);

  const [altPhoneNumber, setAltPhoneNumber] = useState(
    personalDetails.altPhoneNumber
  );

  const [address, setAddress] = useState(personalDetails.address);

  const [postalCode, setPostalCode] = useState(personalDetails.postalCode);
  const [postalCodeError, setPostalCodeError] = useState(false);

  const [cityName, setCityName] = useState(personalDetails.city);

  const [provinceName, setProvinceName] = useState(personalDetails.province);

  const [countryName, setCountryName] = useState(personalDetails.country);

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
  console.log(countryName, provinceName, cityName);
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
  countries.sort();
  let countryList = [];
  for (let i = 0; i < countries.length; i++) {
    countryList.push({ label: countries[i], value: countries[i] });
  }

  let countryItems = countryAndProvincesData.filter(
    (item) => item.country === countryName
  );
  let provinces = [...new Set(countryItems.map((item) => item.subcountry))];
  provinces.sort();
  let provinceList = [];
  for (let i = 0; i < provinces.length; i++) {
    provinceList.push({ label: provinces[i], value: provinces[i] });
  }

  let provinceItems = countryAndProvincesData.filter(
    (item) => item.subcountry === provinceName && item.country === countryName
  );
  let cities = [...new Set(provinceItems.map((item) => item.name))];
  cities.sort();
  let cityList = [];
  for (let i = 0; i < cities.length; i++) {
    cityList.push({ label: cities[i], value: cities[i] });
  }

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
      <View style={[UniversalStyles.page_container]}>
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
                setOpenCountryDropDown(false);
                setOpenCityDropDown(false);
                setOpenProvinceDropDown(false);
              }}
            >
              {/* list mode set to SCROLLVIEW to avoid nested lists error */}
              <View style={[UniversalStyles.avatar_container_settings_page]}>
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
                    borderColor: "transparent",
                  },
                ]}
                onChangeText={(text) => {
                  setName(text);
                }}
              />

              <View style={{ zIndex: 5 }}>
                <Text style={{ marginBottom: 5 }}>UserName</Text>
                <TextInput
                  defaultValue={personalDetails.userName}
                  placeholder="UserName"
                  style={[
                    inputStyles.textInput,
                    {
                      backgroundColor: "#f6f8f9",
                      borderColor: "transparent",
                    },
                  ]}
                  onChangeText={(text) => {
                    setUserName(text);
                  }}
                />

                <Text style={{ marginBottom: 5 }}>
                  Address
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
                    borderColor: "transparent",
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
                />
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
                    borderColor: "transparent",
                    backgroundColor: "#f6f8f9",
                  }}
                  placeholder="Select your country"
                  listMode="SCROLLVIEW"
                  dropDownDirection="BOTTOM"
                  searchable={true}
                  onOpen={() => {
                    setOpenCityDropDown(false);
                    setOpenProvinceDropDown(false);
                  }}
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
                  searchTextInputProps={{ autoFocus: true }}
                  open={openCountryDropDown}
                  setOpen={setOpenCountryDropDown}
                  items={countryList}
                  setValue={(text) => {
                    setCountryName(text);
                    setProvinceName("");
                    setCityName("");
                  }}
                />
              </View>
              <View>
                <View style={{ zIndex: 4, opacity: countryName ? 1 : 0.5 }}>
                  <Text style={{ marginBottom: 5 }}>
                    Select Province/State
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
                      borderColor: "transparent",
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
                    searchPlaceholder={"Search Province/State Here..."}
                    placeholder="Select your province/ State"
                    dropDownDirection="BOTTOM"
                    searchable={true}
                    onOpen={() => {
                      setOpenCountryDropDown(false);
                      setOpenCityDropDown(false);
                    }}
                    value={provinceName}
                    open={openProvinceDropDown}
                    setOpen={setOpenProvinceDropDown}
                    items={provinceList}
                    disabled={countryName ? false : true}
                    searchTextInputProps={{ autoFocus: true }}
                    setValue={(text) => {
                      setProvinceName(text);
                      setCityName("");
                    }}
                  />
                </View>
                <View
                  style={{
                    zIndex: 3,
                    opacity: countryName && provinceName ? 1 : 0.5,
                  }}
                >
                  <Text style={{ marginBottom: 5 }}>
                    Select City
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
                      borderColor: "transparent",
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
                    searchPlaceholder={"Search City Here..."}
                    dropDownDirection="BOTTOM"
                    searchable={true}
                    open={openCityDropDown}
                    onOpen={() => {
                      setOpenCountryDropDown(false);
                      setOpenProvinceDropDown(false);
                    }}
                    setOpen={setOpenCityDropDown}
                    items={cityList}
                    disabled={countryName && provinceName ? false : true}
                    searchTextInputProps={{ autoFocus: true }}
                    setValue={setCityName}
                    placeholder="Select your City"
                  />
                </View>

                <View style={{ zIndex: 2 }}></View>

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
                        borderColor: "transparent",
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
                        borderColor: "transparent",
                        flex: 1,
                      },
                    ]}
                    onChangeText={(text) => {
                      setAltPhoneNumber(text);
                    }}
                  />
                </View>

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
                      borderColor: "transparent",
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
