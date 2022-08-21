//React
import React, { useEffect, useRef } from "react";
import { SafeAreaView, View, ImageBackground, Image } from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";

//Providers
import { useTasks } from "../providers/TasksProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";
import { useAuth } from "../providers/AuthProvider.js";

//Components
import WishListItem from "../components/Items/WishListItem.js";
import CartSlideUpCard from "../components/SlideUpCards/CartSlideUpCard.js";
import Footer from "../components/Footers/Footer.js";

//Styles
import UniversalStyles from "../styles/UniversalStyles.js";

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
          {userWishList ? (
            <WishListItem elementRef={elementRef} />
          ) : (
            <View style={UniversalStyles.center}>
              <Image
                source={require("../assets/cartIsEmptyCrop.png")}
                style={{
                  height: 400,
                  width: 400,
                }}
              />
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
              <View style={[UniversalStyles.col_f_e, { paddingTop: 10 }]}>
                <View style={[UniversalStyles.col_wbg_p20, { paddingTop: 5 }]}>
                  <View
                    style={UniversalStyles.card_drag_container}
                    {...dragHandler}
                  >
                    <View style={UniversalStyles.card_dragger} />
                  </View>
                  <CartSlideUpCard elementRef={elementRef} />
                </View>
              </View>
            )}
          </SlidingUpPanel>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
