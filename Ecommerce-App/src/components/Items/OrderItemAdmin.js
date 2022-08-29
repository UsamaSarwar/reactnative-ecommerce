//React
import React, { useState, useEffect } from "react";

//React Components
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import NumberFormat from "react-number-format";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";

//Providers
import { useOrder } from "../../providers/OrderProvider";
import { useGlobal } from "../../providers/GlobalProvider";

//Styles
import productCardStyles from "../../styles/ProductCardStyle";
import UniversalStyles from "../../styles/UniversalStyles.js";
import OrderStyles from "../../styles/OrderStyles";
import TextStyles from "../../styles/TextStyles";

//This load the items at the my orders screen from the admin side such that the admin
//is able to see all the orders that were placed by the users

export default function OrderItemAdmin({ elementRef, setSlideLoading }) {
  const { orders, getCustomerDetails } = useOrder();
  const { currOrder, setCurrOrder, setCustomer, searchText, listType } =
    useGlobal();

  const animationTime = 1000;

  const [loading, setLoading] = useState(true);

  if (orders.length > 0 && loading) {
    setLoading(false);
  }

  const renderOrderSlide = (item) => {
    if (item.customerid !== "") {
      elementRef.current.show();
      setCurrOrder(item);
    }
  };

  useEffect(() => {
    setSlideLoading(true);
  }, [currOrder]);

  useEffect(() => {
    setNewCustomer();
  }, [currOrder]);

  const setNewCustomer = async () => {
    const acquiredCustomer = await getCustomerDetails(currOrder.customerid);
    setCustomer(acquiredCustomer);
    setSlideLoading(false);
  };

  const searchOrders =
    listType === "Orders"
      ? orders
          .slice()
          .reverse()
          .filter((item) => {
            return (
              item.orderNumber
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              searchText === "" ||
              item.customerName.toLowerCase().includes(searchText.toLowerCase())
            );
          })
      : orders;

  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <FlatList
          data={searchOrders}
          showsVerticalScrollIndicator={false}
          style={OrderStyles.order_list}
          renderItem={({ item }) => (
            <Pressable onPress={() => renderOrderSlide(item)}>
              <Animatable.View
                ref={(here) => (elementRef[item.orderNumber] = here)}
                animation="fadeInLeft"
                duration={animationTime}
                style={[
                  productCardStyles.productCard,
                  UniversalStyles.flex_column,
                ]}
              >
                <View style={UniversalStyles.row_sb_conatiner}>
                  <View style={UniversalStyles.page_container}>
                    <Text style={TextStyles.bold_normal_marginR}>
                      Order# {item.orderNumber}
                    </Text>

                    <View //Container of name and processing tab
                      style={[
                        UniversalStyles.row_sb_conatiner,
                        UniversalStyles.page_container,
                      ]}
                    >
                      <View
                        style={UniversalStyles.page_container_3} //Container of name, item and calender components
                      >
                        <View style={UniversalStyles.row_sb_center_container}>
                          <View style={UniversalStyles.row_center_container}>
                            <IonIcon
                              name="person"
                              size={20}
                              color={UniversalStyles.theme_green.color}
                              style={UniversalStyles.marginRight2}
                            />
                            <Text numberOfLines={1} style={TextStyles.username}>
                              {item.customerName}
                            </Text>
                          </View>
                        </View>

                        <View style={UniversalStyles.row_sb_center_container}>
                          <View style={UniversalStyles.flex_row}>
                            <IonIcon
                              name="cart"
                              size={20}
                              color={UniversalStyles.theme_green.color}
                              style={UniversalStyles.marginRight2}
                            />
                            <Text>Items: </Text>

                            <Text style={TextStyles.bold_text}>
                              {item.orderItems.length}
                            </Text>
                          </View>
                        </View>
                        <View style={UniversalStyles.flex_row}>
                          <IonIcon
                            name="calendar-outline"
                            size={18}
                            color={UniversalStyles.theme_green.color}
                            style={UniversalStyles.marginRight2}
                          />
                          <Text>Placed On: </Text>
                          <Text style={TextStyles.bold_text}>
                            {item.orderTime}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          OrderStyles.status_tab,
                          {
                            backgroundColor:
                              item.orderStatus === "Processing"
                                ? "#BC544B"
                                : item.orderStatus === "Dispatched"
                                ? "#E3B104"
                                : "#87AB69",
                          },
                        ]}
                      >
                        <Text style={TextStyles.bold_normal}>
                          {item.orderStatus}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={UniversalStyles.row_sb_center_container}>
                  <View>
                    <View style={OrderStyles.total_container}>
                      <Text style={TextStyles.small_italic}>
                        {item.paymentMethod}
                      </Text>
                      <Image
                        source={
                          item.paymentMethod === "Card"
                            ? require("../../assets/credit-card.png")
                            : require("../../assets/cash-on-delivery.png")
                        }
                        style={OrderStyles.payment_icon}
                      />
                    </View>
                  </View>
                  <View style={UniversalStyles.width30}></View>
                </View>
                <View style={UniversalStyles.flex_row}>
                  <View style={UniversalStyles.page_container}></View>
                </View>
                <View style={UniversalStyles.row_sb_center_container}>
                  <View style={UniversalStyles.flex_row}>
                    <IonIcon
                      name="cash-outline"
                      size={28}
                      color="green"
                      style={UniversalStyles.marginRight5}
                    />
                    <Text style={TextStyles.large_bold}>Total</Text>
                  </View>
                  <NumberFormat
                    value={item.total}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"PKR "}
                    renderText={(value) => (
                      <Text style={TextStyles.large_font}>{value}</Text>
                    )}
                  />
                </View>
              </Animatable.View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
