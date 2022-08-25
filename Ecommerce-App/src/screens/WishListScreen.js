//React
import React, { useEffect, useRef } from "react";
import { SafeAreaView, View, ImageBackground, Image, Text } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";

//Providers
import { useTasks } from "../providers/TasksProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";
import { useAuth } from "../providers/AuthProvider.js";

//Components
import WishListItem from "../components/Items/WishListItem.js";
import UserSlideUpCard from "../components/SlideUpCards/UserSlideUpCard.js";
import Footer from "../components/Footers/Footer.js";
import HomeHeader from "../components/Headers/HomeHeader.js";

//Styles
import UniversalStyles from "../styles/UniversalStyles.js";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function WishListScreen({ navigation, route }) {
  const { userWishList } = useAuth();
  const { wishListDetails } = useTasks();
  const { update } = useGlobal();

  const elementRef = useRef();

  useEffect(() => {
    wishListDetails();
  }, [update]);

  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={UniversalStyles.background_image}
        >
          <HomeHeader navigation={navigation} />
          {userWishList.length !== 0 ? (
            <WishListItem elementRef={elementRef} />
          ) : (
            <View style={UniversalStyles.center}>
              <Image
                source={require("../assets/noFavorites.png")}
                style={UniversalStyles.img_no_favorite}
              />
              <View style={UniversalStyles.row_center_container}>
                <Text style={UniversalStyles.cartIcons}>
                  No favorites added yet
                </Text>
                <MatIcon
                  style={UniversalStyles.marginLeft3}
                  name="emoticon-sad-outline"
                  size={30}
                  color="black"
                />
              </View>
              <View style={UniversalStyles.row_center_container}>
                <Text style={UniversalStyles.tagline}>
                  Keep track of your favorite products here by clicking on the
                </Text>
                <IonIcon
                  style={UniversalStyles.margin_LR_2}
                  name="heart"
                  size={30}
                  color={UniversalStyles.theme_gray.color}
                />
                <Text style={UniversalStyles.tagline}>icon</Text>
              </View>
            </View>
          )}

          <Footer
            navigation={navigation}
            route={route}
            elementRef={elementRef}
          />

          <SlidingUpPanel
            allowDragging={true}
            allowMomentum={true}
            ref={(c) => (elementRef.current = c)}
          >
            {(dragHandler) => (
              <View
                style={[UniversalStyles.col_f_e, UniversalStyles.paddingTop10]}
              >
                <View
                  style={[
                    UniversalStyles.col_wbg_p20,
                    UniversalStyles.paddingTop5,
                  ]}
                >
                  <View
                    style={UniversalStyles.card_drag_container}
                    {...dragHandler}
                  >
                    <View style={UniversalStyles.card_dragger} />
                  </View>
                  <UserSlideUpCard elementRef={elementRef} />
                </View>
              </View>
            )}
          </SlidingUpPanel>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
