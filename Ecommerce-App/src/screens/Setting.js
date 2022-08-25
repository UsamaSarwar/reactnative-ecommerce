//React Components
import React, { useEffect, useRef } from "react";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Providers
import { useAuth } from "../providers/AuthProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";
import IonIcon from "react-native-vector-icons/Ionicons";

//Icons
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import SlidingUpPanel from "rn-sliding-up-panel";

//Other Components
import Updatepassword from "./UpdatePassword.js";
import Deleteaccount from "./DeleteAccount.js";
import Footer from "../components/Footers/Footer.js";
import AdminSlideUpCard from "../components/SlideUpCards/AdminUserSlideUpCard.js";

//Styles
import styles from "../styles/Styles.js";
import UniversalStyles from "../styles/UniversalStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";
import TextStyles from "../styles/TextStyles.js";

export default function Setting({ navigation, route }) {
  const { user, signOut, personalDetails } = useAuth();
  const { checkDetailsError } = useGlobal();

  const elementRef = useRef();
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={UniversalStyles.background_image}
        >
          <View style={UniversalStyles.avatar_container}>
            <Image
              source={{
                uri: `data:${personalDetails.imageForm};base64,${personalDetails.image}`,
              }}
              style={productCardStyles.avatarImage}
            />
            <Text style={TextStyles.name_banner}>{personalDetails.name}</Text>
            <Text style={TextStyles.userName_banner}>
              {personalDetails.userName}
            </Text>
          </View>

          <View style={UniversalStyles.input_fields_container_1}>
            <Pressable
              style={ButtonStyles.p_button}
              onPress={() => {
                checkDetailsError();
                navigation.navigate("Personaldetails");
              }}
            >
              <View style={UniversalStyles.flex_row}>
                <IonIcon
                  name="person-outline"
                  size={25}
                  color="white"
                  style={UniversalStyles.marginRight15}
                />
                <Text style={ButtonStyles.p_button_text}>
                  Update Personal Detail
                </Text>
              </View>
            </Pressable>
            {user.customData.userType === "normal" ? (
              <Pressable
                style={ButtonStyles.p_button}
                onPress={() => navigation.navigate("Myorders")}
              >
                <MatIcon
                  name="truck-fast-outline"
                  size={28}
                  color="white"
                  style={UniversalStyles.marginRight15}
                />
                <Text style={ButtonStyles.p_button_text}>My Orders</Text>
              </Pressable>
            ) : null}
            <Pressable
              style={ButtonStyles.p_button}
              onPress={() => navigation.navigate(Updatepassword)}
            >
              <IonIcon
                name="key-outline"
                size={25}
                color="white"
                style={UniversalStyles.marginRight15}
              />
              <Text style={ButtonStyles.p_button_text}>Update Password</Text>
            </Pressable>

            <Pressable
              style={ButtonStyles.p_button}
              onPress={() => navigation.navigate(Deleteaccount)}
            >
              <IonIcon
                name="trash-outline"
                size={25}
                color="white"
                style={UniversalStyles.marginRight15}
              />
              <Text style={ButtonStyles.p_button_text}>Delete Account</Text>
            </Pressable>
            <Pressable
              style={[styles.s_button, UniversalStyles.marginBottom0]}
              onPress={() =>
                Alert.alert("Are you sure you want to Log Out?", null, [
                  {
                    text: "Yes, Log Out",
                    style: "destructive",
                    onPress: () => {
                      console.log("signing out");
                      signOut();
                    },
                  },
                  { text: "Cancel", style: "cancel" },
                ])
              }
            >
              <IonIcon
                name="log-out-outline"
                size={21}
                color={UniversalStyles.theme_gray2.color}
              />
              <Text style={styles.s_button_text}>Log Out</Text>
            </Pressable>
          </View>
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

                  <AdminSlideUpCard elementRef={elementRef} />
                </View>
              </View>
            )}
          </SlidingUpPanel>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
