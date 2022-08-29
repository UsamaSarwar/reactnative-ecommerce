//React
import React, { useState } from "react";

//React Components
import { View, Text, Image, Pressable } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";

//Components
import Shimmer from "../Shimmer";

//Providers
import { useAuth } from "../../providers/AuthProvider.js";
import { useGlobal } from "../../providers/GlobalProvider.js";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";

//Styles
import universalStyles from "../../styles/UniversalStyles.js";
import TextStyles from "../../styles/TextStyles";

//Homescreen header so that the user can see it's name and avatar for aesthetics alongside the searchbar
// for certain operations

export default function HomeHeader({ navigation }) {
  const { personalDetails } = useAuth();
  const { searchText, setSearchText } = useGlobal();

  const [searchState, setSearchState] = useState(false);
  const [spinnerState, setSpinnerState] = useState(true);

  const renderSearchBar = () => {
    return (
      <SearchBar
        style={universalStyles.page_container}
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
          <Pressable onPress={() => navigation.navigate("Personaldetails")}>
            <Shimmer
              autoRun={true}
              visible={personalDetails ? true : false}
              style={productCardStyles.homeImage}
            >
              <Image
                source={{
                  uri: `data:${personalDetails?.imageForm};base64,${personalDetails?.image}`,
                }}
                style={productCardStyles.homeImage}
              />
            </Shimmer>
          </Pressable>
          <Text style={TextStyles.text_format_1}>
            {personalDetails?.userName ? personalDetails?.userName : "User"}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {searchText !== "" ? (
            <IonIcon
              style={universalStyles.marginRight8}
              color="gray"
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
