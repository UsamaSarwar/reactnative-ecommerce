//React
import React, { useEffect, useState } from "react";
import { Text, View, Image, FlatList, Pressable } from "react-native";
import NumberFormat from "react-number-format";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";

//Providers
import { useGlobal } from "../../providers/GlobalProvider";
import { useOrder } from "../../providers/OrderProvider";

//Components
import Shimmer from "../Shimmer";

//Styles
import UniversalStyles from "../../styles/UniversalStyles";
import TextStyles from "../../styles/TextStyles";

export default function OrderSettingSlideUpCard({
  setSlideLoading,
  slideLoading,
}) {
  const { currOrder, customer } = useGlobal();
  const { orderDetails, updateStatus } = useOrder();
  useEffect(() => {
    setSlideLoading(false);
  }, [customer]);
  const orderList = orderDetails(currOrder.orderItems);
  return (
    <View>
      <View
        style={[
          UniversalStyles.marginBottom2,
          UniversalStyles.flex_row,
          UniversalStyles.align_c,
        ]}
      >
        <Text style={TextStyles.medlar_bold_font}>Order# </Text>
        <Text>{currOrder.orderNumber}</Text>
      </View>
      <View
        style={[
          UniversalStyles.flex_row,
          UniversalStyles.align_c,
          UniversalStyles.marginBottom10,
        ]}
      >
        <View style={UniversalStyles.divider} />
        <View style={UniversalStyles.divider} />
      </View>

      <View style={UniversalStyles.marginBottom2}>
        <Text style={TextStyles.medlar_bold_font}>Change Status</Text>
      </View>

      <View style={[UniversalStyles.marginTop10, UniversalStyles.align_c]}>
        <Text>Would you like to change order status?</Text>
      </View>

      <View //Container of Icons
        style={UniversalStyles.container_pad_r_sb}
      >
        <Pressable
          onPress={() => {
            updateStatus(currOrder.orderNumber, "Processing");
          }}
        >
          <View
            style={[
              UniversalStyles.container_process,
              { opacity: currOrder.orderStatus === "Processing" ? 1 : 0.4 },
            ]}
          >
            <IonIcon name="cog" size={32} color="white" />
            <Text style={TextStyles.font_change_status}>Processing</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            updateStatus(currOrder.orderNumber, "Dispatched");
          }}
        >
          <View
            style={[
              UniversalStyles.container_dispatched,
              { opacity: currOrder.orderStatus === "Dispatched" ? 1 : 0.4 },
            ]}
          >
            <IonIcon name="car" size={32} color="white" />
            <Text style={TextStyles.font_change_status}>Dispatched</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            updateStatus(currOrder.orderNumber, "Delivered");
          }}
        >
          <View
            style={[
              UniversalStyles.container_delivered,
              { opacity: currOrder.orderStatus === "Delivered" ? 1 : 0.4 },
            ]}
          >
            <IonIcon name="checkmark-done-circle" size={32} color="white" />
            <Text style={TextStyles.font_change_status}> Delivered </Text>
          </View>
        </Pressable>
      </View>

      <View
        style={UniversalStyles.container_details} //Shipping Details
      >
        <Text style={TextStyles.medlar_bold_font}>Shipping Details</Text>

        <View style={UniversalStyles.container_row_details}>
          <Text style={TextStyles.small_italic}>{currOrder.paymentMethod}</Text>
          <Image
            source={
              currOrder.paymentMethod === "Card"
                ? require("../../assets/credit-card.png")
                : require("../../assets/cash-on-delivery.png")
            }
            style={UniversalStyles.item_image}
          />
        </View>
      </View>
      <View
        style={[
          UniversalStyles.flex_row,
          UniversalStyles.align_c,
          UniversalStyles.marginBottom10,
        ]}
      >
        <IonIcon
          name="person-outline"
          color={UniversalStyles.theme_green.color}
          size={27}
        />
        <Shimmer
          autoRun={true}
          visible={!slideLoading}
          style={UniversalStyles.container_shimmer}
        >
          <Text style={UniversalStyles.marginLeft7}>
            {customer?.details?.name}
          </Text>
        </Shimmer>
      </View>
      <View
        style={[
          UniversalStyles.flex_row,
          UniversalStyles.align_c,
          UniversalStyles.marginBottom10,
        ]}
      >
        <IonIcon
          name="home-outline"
          color={UniversalStyles.theme_green.color}
          size={27}
        />
        <Shimmer
          autoRun={true}
          visible={!slideLoading}
          style={UniversalStyles.container_shimmer}
        >
          <Text
            style={[
              UniversalStyles.flex_wrap_view,
              UniversalStyles.marginLeft7,
            ]}
          >
            {customer?.details?.address} ({customer?.details?.postalCode})
          </Text>
        </Shimmer>
      </View>

      <View
        style={[
          UniversalStyles.flex_row,
          UniversalStyles.align_c,
          UniversalStyles.marginBottom10,
        ]}
      >
        <IonIcon
          name="calendar-outline"
          color={UniversalStyles.theme_green.color}
          size={27}
        />
        <Shimmer
          autoRun={true}
          visible={!slideLoading}
          style={UniversalStyles.container_shimmer}
        >
          <Text style={UniversalStyles.marginLeft7}>{currOrder.orderTime}</Text>
        </Shimmer>
      </View>

      <View
        style={[
          UniversalStyles.flex_row,
          UniversalStyles.align_c,
          UniversalStyles.marginBottom10,
        ]}
      >
        <IonIcon
          name="location-outline"
          color={UniversalStyles.theme_green.color}
          size={27}
        />
        <Shimmer
          autoRun={true}
          visible={!slideLoading}
          style={UniversalStyles.container_shimmer}
        >
          <Text style={UniversalStyles.marginLeft7}>
            {customer?.details?.city}, {customer?.details?.province},
            {customer?.details?.country}
          </Text>
        </Shimmer>
      </View>
      <View style={[UniversalStyles.align_c, UniversalStyles.flex_row]}>
        <IonIcon
          name="call-outline"
          color={UniversalStyles.theme_green.color}
          size={27}
        />
        <Shimmer
          autoRun={true}
          visible={!slideLoading}
          style={UniversalStyles.container_shimmer}
        >
          <Text style={UniversalStyles.marginLeft7}>
            {customer?.details?.phoneNumber},{" "}
            {customer?.details?.altPhoneNumber}
          </Text>
        </Shimmer>
      </View>

      <View //orderSummary View
        style={UniversalStyles.order_sum_container}
      >
        <Text style={UniversalStyles.order_sum_text}>Order Summary</Text>
        <FlatList
          data={orderList}
          showsVerticalScrollIndicator={false}
          style={UniversalStyles.order_sum_items}
          renderItem={({ item }) => (
            <Pressable
              style={[
                UniversalStyles.row_f1_sb_c,
                UniversalStyles.order_sum_list,
              ]}
            >
              <View
                style={[
                  UniversalStyles.centered_container,
                  UniversalStyles.flex_row,
                ]}
              >
                <Image
                  source={{
                    uri: `data:${item[0].imageForm};base64,${item[0].image}`,
                  }}
                  style={UniversalStyles.item_image_list}
                />
                <View
                  style={[
                    UniversalStyles.centered_container,
                    UniversalStyles.item_container,
                  ]}
                >
                  <Text style={TextStyles.normal_font}>x{item[1]}</Text>
                </View>
              </View>

              <View
                style={[
                  UniversalStyles.row_f1_sb_c,
                  UniversalStyles.list_text_view,
                ]}
              >
                <Text style={TextStyles.normal_font}>{item[0].name}</Text>
              </View>

              <NumberFormat
                value={parseInt(item[0].price) * item[1]}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"PKR "}
                renderText={(value) => <Text>{value}</Text>}
              />
            </Pressable>
          )}
        />
      </View>

      <View style={UniversalStyles.row_sb_center_container}>
        <Text style={TextStyles.large_bold}>Order Total</Text>

        <NumberFormat
          value={currOrder.total}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"PKR "}
          renderText={(value) => (
            <Text style={TextStyles.large_font}>{value}</Text>
          )}
        />
      </View>
    </View>
  );
}
