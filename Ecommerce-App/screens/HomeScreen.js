//React
import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Alert,
  Keyboard,
  ScrollView,
  BackHandler,
  TextInput,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/AntDesign";
import SearchBar from "react-native-dynamic-search-bar";
import SlidingUpPanel from "rn-sliding-up-panel";

//Providers
import { useAuth } from "../providers/AuthProvider.js";
import { useTasks } from "../providers/TasksProvider";

//Styles
import universalStyles from "../styles/UniversalStyles.js";

//Components
import ProductItem from "../components/ProductItem.js";
import Footer from "../components/Footer.js";
import UserSlideUpCard from "../components/UserSlideUpCard.js";
import AdminSlideUpCard from "../components/AdminUserSlideUpCard.js";

export default function Homescreen({ navigation, route }) {
  const { user } = useAuth();
  const { tasks } = useTasks();
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  const admin = user.customData["userType"] === "admin" ? true : false;
  const elementRef = useRef();
  const [data, setData] = useState("");
  const [edit, setEdit] = useState(true);
  const [isClosed, setIsClosed] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const [spinnerState, setSpinnerState] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [listType, setListType] = useState("Inventory");

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
  const onPanelClose = () => {
    setData({ name: "", category: "", price: "", description: "" });
    setIsClosed(true);
  };

  const childToParent = (childData) => {
    setData(childData);
    setIsClosed(false);
  };

  const childToParent_edit = (childData) => {
    setEdit(childData);
  };

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
  // console.log("Again");
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

  const stats = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 100,
          justifyContent: "space-between",
          marginLeft: 10,
          marginRight: 10,
          // backgroundColor: "rgba(66, 200, 143, 0.6)",
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(66, 200, 143, 0.6)",
            opacity: 0.9,
            borderRadius: 15,
            flex: 1,
            padding: 10,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
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
        </View>

        <View
          style={{
            backgroundColor: "rgba(66, 200, 143, 0.6)",
            opacity: 0.9,
            borderRadius: 15,
            flex: 1,
            marginLeft: 10,
            padding: 10,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
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

  return (
    <SafeAreaView style={universalStyles.flex1}>
      <View style={universalStyles.main}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={universalStyles.image}
        >
          {searchState ? (
            <View
              style={[
                universalStyles.header,
                { backgroundColor: "rgba(66, 200, 143, 0.6)" },
              ]}
            >
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
            </View>
          ) : (
            <View
              style={[
                universalStyles.header,
                { backgroundColor: "rgba(66, 200, 143, 0.6)" },
              ]}
            >
              <Text style={{ fontSize: 23 }}>
                Welcome, {user.customData.email}
              </Text>
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
                  // style={{ transform: [{ rotateY: "180deg" }] }}
                  name="search"
                  size={32}
                  onPress={() => {
                    setSearchState(true);
                    setKeyboardVisible(true);
                  }}
                />
              </View>
            </View>
          )}

          {admin ? stats() : null}

          <ProductItem
            navigation={navigation}
            elementRef={elementRef}
            childToParent={childToParent}
            searchText={searchText}
            childToParent_edit={childToParent_edit}
            setData={setData}
          />

          <Footer
            navigation={navigation}
            childToParent={childToParent}
            childToParent_edit={childToParent_edit}
            elementRef={elementRef}
          />

          <SlidingUpPanel
            allowDragging={true}
            allowMomentum={true}
            ref={(c) => (elementRef.current = c)}
            onBottomReached={() => onPanelClose()}
          >
            {admin ? (
              <AdminSlideUpCard
                data={data}
                toEdit={edit}
                isClosed={isClosed}
                elementRef={elementRef}
              />
            ) : (
              <UserSlideUpCard data={data} isClosed={isClosed} />
            )}
          </SlidingUpPanel>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
