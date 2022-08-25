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

//Other React Components
import Icon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";
import * as Animatable from "react-native-animatable";
import Snackbar from "react-native-snackbar";
import DropDownPicker from "react-native-dropdown-picker";

//API call library
import axios from "axios";

//Provides
import { useAuth } from "../providers/AuthProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";

//Styles
import UniversalStyles from "../styles/UniversalStyles";
import inputStyles from "../styles/InputStyles";
import IconStyles from "../styles/IconStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";
import TextStyles from "../styles/TextStyles.js";

export default function PersonalDetails({ navigation }) {
  const { personalDetails, updateUserDetails, updateAvatar } = useAuth();
  const { checkDetailsError } = useGlobal();

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
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
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
                    <View style={TextStyles.save_button_text}>
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
          <ScrollView style={UniversalStyles.padding10} listMode="SCROLLVIEW">
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
                  style={[IconStyles.background3, UniversalStyles.avatar_img]}
                >
                  <Icon
                    name="edit"
                    color={UniversalStyles.theme_white.color}
                    size={21}
                  />
                </Pressable>
              </View>
              <Text style={UniversalStyles.marginBottom5}>
                Full Name
                <Text style={TextStyles.asterik}>*</Text>
              </Text>
              <TextInput
                defaultValue={personalDetails.name}
                placeholder="Full Name"
                style={[inputStyles.textInput, TextStyles.input_box]}
                onChangeText={(text) => {
                  setName(text);
                }}
              />

              <View style={UniversalStyles.zIndexer5}>
                <Text style={UniversalStyles.marginBottom5}>UserName</Text>
                <TextInput
                  defaultValue={personalDetails.userName}
                  placeholder="UserName"
                  style={[inputStyles.textInput, TextStyles.input_box]}
                  onChangeText={(text) => {
                    setUserName(text);
                  }}
                />

                <Text style={UniversalStyles.marginBottom5}>
                  Address
                  <Text style={TextStyles.asterik}>*</Text>
                </Text>

                <TextInput
                  defaultValue={personalDetails.address}
                  placeholder="Phone Number"
                  style={[inputStyles.textInput, TextStyles.input_box]}
                  onChangeText={(text) => {
                    setAddress(text);
                  }}
                />

                <Text style={UniversalStyles.marginBottom5}>
                  Select Country
                  <Text style={TextStyles.asterik}>*</Text>
                </Text>
                <DropDownPicker
                  style={TextStyles.drop_down_style}
                  placeholder="Select your country"
                  listMode="SCROLLVIEW"
                  dropDownDirection="BOTTOM"
                  searchable={true}
                  onOpen={() => {
                    setOpenCityDropDown(false);
                    setOpenProvinceDropDown(false);
                  }}
                  dropDownContainerStyle={TextStyles.drop_down_container_style}
                  searchContainerStyle={TextStyles.drop_down_container_style}
                  searchPlaceholder={"Search Country Here..."}
                  value={countryName}
                  searchTextInputProps={UniversalStyles.auto_focuser}
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
                <View
                  style={[
                    UniversalStyles.zIndexer4,
                    { opacity: countryName ? 1 : 0.5 },
                  ]}
                >
                  <Text style={UniversalStyles.marginBottom5}>
                    Select Province/State
                    <Text style={TextStyles.asterik}>*</Text>
                  </Text>
                  <DropDownPicker
                    style={TextStyles.drop_down_style}
                    listMode="SCROLLVIEW"
                    dropDownContainerStyle={
                      TextStyles.drop_down_container_style
                    }
                    searchContainerStyle={TextStyles.drop_down_container_style}
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
                    searchTextInputProps={UniversalStyles.auto_focuser}
                    setValue={(text) => {
                      setProvinceName(text);
                      setCityName("");
                    }}
                  />
                </View>
                <View
                  style={[
                    UniversalStyles.zIndexer3,
                    {
                      opacity: countryName && provinceName ? 1 : 0.5,
                    },
                  ]}
                >
                  <Text style={UniversalStyles.marginBottom5}>
                    Select City
                    <Text style={TextStyles.asterik}>*</Text>
                  </Text>
                  <DropDownPicker
                    style={TextStyles.drop_down_style}
                    value={cityName}
                    listMode="SCROLLVIEW"
                    dropDownContainerStyle={
                      TextStyles.drop_down_container_style
                    }
                    searchContainerStyle={TextStyles.drop_down_container_style}
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
                    searchTextInputProps={UniversalStyles.auto_focuser}
                    setValue={setCityName}
                    placeholder="Select your City"
                  />
                </View>

                <View style={UniversalStyles.zIndexer2}></View>

                <Text style={UniversalStyles.marginBottom5}>
                  Phone Number
                  <Text style={TextStyles.asterik}>*</Text>
                </Text>
                <View style={UniversalStyles.row_center_container}>
                  <TextInput
                    style={[
                      inputStyles.textInput,
                      UniversalStyles.phone_code_container,
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
                      UniversalStyles.phone_number_container,
                    ]}
                    onChangeText={(text) => {
                      setPhoneNumber(text);
                    }}
                  />
                </View>

                <Text style={UniversalStyles.marginBottom5}>
                  Alternate Phone Number
                </Text>
                <View style={UniversalStyles.row_center_container}>
                  <TextInput
                    style={[
                      inputStyles.textInput,
                      UniversalStyles.phone_code_container,
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
                      UniversalStyles.phone_number_container,
                    ]}
                    onChangeText={(text) => {
                      setAltPhoneNumber(text);
                    }}
                  />
                </View>

                <Text style={UniversalStyles.marginBottom5}>
                  Postal Code
                  <Text style={TextStyles.asterik}>*</Text>
                </Text>
                <TextInput
                  keyboardType="numeric"
                  defaultValue={personalDetails.postalCode}
                  placeholder="Postal Code"
                  style={[
                    inputStyles.textInput,
                    UniversalStyles.postal_code_container,
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
