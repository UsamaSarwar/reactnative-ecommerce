//React
import React, { useRef, useState, useEffect } from "react";

//React Components
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Alert,
  Keyboard,
  BackHandler,
  Pressable,
  Image,
} from "react-native";

import SearchBar from "react-native-dynamic-search-bar";
import SlidingUpPanel from "rn-sliding-up-panel";

//Providers
import { useAuth } from "../providers/AuthProvider.js";
import { useTasks } from "../providers/TasksProvider";

//Components
import ProductItem from "../components/ProductItem.js";
import Footer from "../components/Footer.js";
import UserSlideUpCard from "../components/UserSlideUpCard.js";
import AdminSlideUpCard from "../components/AdminUserSlideUpCard.js";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";

//Styles
import universalStyles from "../styles/UniversalStyles.js";

export default function Homescreen({ navigation }) {
  const { user, image, imageForm } = useAuth();
  const { tasks } = useTasks();

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  useEffect(() => {
    if (!isKeyboardVisible) {
      setSearchState(false);
    }
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const admin = user.customData["userType"] === "admin" ? true : false;

  const elementRef = useRef();

  const [searchText, setSearchText] = useState("");

  const [searchState, setSearchState] = useState(false);
  const [spinnerState, setSpinnerState] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [listType, setListType] = useState("Inventory");

  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    }
  };

  const stats = () => {
    return (
      <View
        style={[
          universalStyles.row_sb_conatiner,
          {
            height: 100,
            margin: 10,
          },
        ]}
      >
        <Pressable
          style={[
            universalStyles.col_sb_conatiner,
            universalStyles.pressable_1,
            { flex: 1 },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IonIcon name="boat-outline" size={23} />
            <Text
              style={{
                fontSize: 23,
                fontWeight: listType === "Orders" ? "bold" : "normal",
                marginLeft: 5,
              }}
            >
              Orders
            </Text>
          </View>
        </Pressable>

        <View
          style={[
            universalStyles.col_sb_conatiner,
            universalStyles.pressable_1,
            { flex: 1, marginLeft: 10 },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IonIcon name="cube-outline" size={23} />
            <Text
              style={{
                fontSize: 23,
                fontWeight: listType === "Inventory" ? "bold" : "normal",
                marginLeft: 5,
              }}
            >
              Inventory
            </Text>
          </View>
          <Text
            style={{
              fontSize: 21,
            }}
          >
            {tasks.length} Products
          </Text>
        </View>
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <SearchBar
        style={{ flex: 1 }}
        placeholder="Search for Products here..."
        defaultValue={searchText}
        onChangeText={(text) => {
          setSearchText(text);
        }}
        spinnerVisibility={!spinnerState}
        onSearchPress={() => {
          setSearchState(false);
        }}
        onClearPress={() => {
          setSearchText("");
        }}
        onBlur={() => {
          setSearchState(false);
        }}
      />
    );
  };

  const renderWelcome = () => {
    return (
      <>
        <View style={productCardStyles.homeImageView}>
          <Image
            source={{
              uri: `data:${imageForm};base64,${image}`,
            }}
            style={productCardStyles.homeImage}
          />
          <Text style={{ fontSize: 23, marginLeft: 10 }}>
            {user.customData.email}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {searchText !== "" ? (
            <IonIcon
              style={{ marginRight: 8 }}
              color="red"
              name="close-circle-outline"
              size={32}
              onPress={() => {
                setSearchText("");
              }}
            />
          ) : (
            void 0
          )}
          <IonIcon
            name="search"
            size={30}
            onPress={() => {
              setSearchState(true);
              setKeyboardVisible(true);
            }}
          />
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={universalStyles.page_container}>
      <View style={universalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={universalStyles.background_image}
        >
          <View style={[universalStyles.header]}>
            {searchState ? renderSearchBar() : renderWelcome()}
          </View>

          {admin ? stats() : null}

          <ProductItem
            navigation={navigation}
            elementRef={elementRef}
            searchText={searchText}
          />

          <Footer navigation={navigation} elementRef={elementRef} />

          <SlidingUpPanel
            allowDragging={true}
            allowMomentum={true}
            ref={(c) => (elementRef.current = c)}
          >
            {admin ? (
              <AdminSlideUpCard elementRef={elementRef} />
            ) : (
              <UserSlideUpCard elementRef={elementRef} />
            )}
          </SlidingUpPanel>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
