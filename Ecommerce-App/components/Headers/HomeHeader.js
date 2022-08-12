//React
import React, { useState, useEffect } from "react";

//React Components
import { View, Text, Image, Keyboard } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";

//Providers
import { useAuth } from "../../providers/AuthProvider.js";
import { useGlobal } from "../../providers/GlobalProvider.js";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";

//Styles
import universalStyles from "../../styles/UniversalStyles.js";

export default function HomeHeader() {
  const { user, image, imageForm } = useAuth();
  const { searchText, setSearchText } = useGlobal();

  const [searchState, setSearchState] = useState(false);
  const [spinnerState, setSpinnerState] = useState(true);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  const renderSearchBar = () => {
    return (
      <SearchBar
        style={{ flex: 1 }}
        placeholder="Search for Products here..."
        defaultValue={searchText}
        onChangeText={(text) => setSearchText(text)}
        spinnerVisibility={!spinnerState}
        onSearchPress={() => setSearchState(false)}
        onClearPress={() => setSearchText("")}
        onBlur={() => setSearchState(false)}
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
            {user.customData.details.name}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {searchText !== "" ? (
            <IonIcon
              style={{ marginRight: 8 }}
              color="red"
              name="close-circle-outline"
              size={32}
              onPress={() => setSearchText("")}
            />
          ) : null}
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
    <View style={[universalStyles.header]}>
      {searchState ? renderSearchBar() : renderWelcome()}
    </View>
  );
}
