//React
import React, { useEffect, useState } from "react";
import { Text, View, Image, FlatList, Pressable } from "react-native";
import NumberFormat from "react-number-format";
// import Snackbar from "react-native-snackbar";

//Icons
import IonIcon from "react-native-vector-icons/Ionicons";

//Providers
import { useGlobal } from "../../providers/GlobalProvider";
import { useOrder } from "../../providers/OrderProvider";

//Components
import Shimmer from "../Shimmer";

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
        style={{ flexDirection: "row", marginBottom: 2, alignItems: "center" }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Order# </Text>
        <Text>{currOrder.orderNumber}</Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "green" }} />
        <View style={{ flex: 1, height: 1, backgroundColor: "green" }} />
      </View>

      <View style={{ marginBottom: 2 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Change Status</Text>
      </View>

      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text>Would you like to change order status?</Text>
      </View>

      <View //Container of Icons
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={() => {
            updateStatus(currOrder.orderNumber, "Processing");
          }}
        >
          <View
            style={{
              backgroundColor: "#BC544B",
              padding: 10,
              borderRadius: 10,
              width: 90,
              alignItems: "center",
              opacity: currOrder.orderStatus === "Processing" ? 1 : 0.4,
            }}
          >
            <IonIcon name="cog" size={32} color="white" />
            <Text style={{ fontSize: 12, color: "white" }}>Processing</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            updateStatus(currOrder.orderNumber, "Dispatched");
          }}
        >
          <View
            style={{
              backgroundColor: "#E3B104",
              padding: 10,
              borderRadius: 10,
              width: 90,
              alignItems: "center",
              opacity: currOrder.orderStatus === "Dispatched" ? 1 : 0.4,
            }}
          >
            <IonIcon name="car" size={32} color="white" />
            <Text style={{ fontSize: 12, color: "white" }}>Dispatched</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            updateStatus(currOrder.orderNumber, "Delivered");
          }}
        >
          <View
            style={{
              backgroundColor: "#87AB69",
              padding: 10,
              borderRadius: 10,
              width: 90,
              alignItems: "center",
              opacity: currOrder.orderStatus === "Delivered" ? 1 : 0.4,
            }}
          >
            <IonIcon name="checkmark-done-circle" size={32} color="white" />
            <Text style={{ fontSize: 12, color: "white" }}> Delivered </Text>
          </View>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }} //Shipping Details
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Shipping Details
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 12, fontStyle: "italic" }}>
            {currOrder.paymentMethod}
          </Text>
          <Image
            source={
              currOrder.paymentMethod === "Card"
                ? require("../../assets/credit-card.png")
                : require("../../assets/cash-on-delivery.png")
            }
            style={{ height: 15, width: 15, marginLeft: 5 }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <IonIcon name="person-outline" color={"#42C88F"} size={27} />
        <Shimmer
          autoRun={true}
          visible={!slideLoading}
          style={{ marginLeft: 7, borderRadius: 10 }}
        >
          <Text style={{ marginLeft: 7 }}>{customer?.details?.name}</Text>
        </Shimmer>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <IonIcon name="home-outline" color={"#42C88F"} size={27} />
        <Shimmer
          autoRun={true}
          visible={!slideLoading}
          style={{ marginLeft: 7, borderRadius: 10 }}
        >
          <Text style={{ marginLeft: 7, flexWrap: "wrap" }}>
            {customer?.details?.address} ({customer?.details?.postalCode})
          </Text>
        </Shimmer>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <IonIcon name="calendar-outline" color={"#42C88F"} size={27} />
        <Shimmer
          autoRun={true}
          visible={!slideLoading}
          style={{
            marginLeft: 7,
            borderRadius: 10,
          }}
        >
          <Text style={{ marginLeft: 7 }}>{currOrder.orderTime}</Text>
        </Shimmer>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <IonIcon name="location-outline" color={"#42C88F"} size={27} />
        <Shimmer
          autoRun={true}
          visible={!slideLoading}
          style={{ marginLeft: 7, borderRadius: 10 }}
        >
          <Text style={{ marginLeft: 7 }}>
            {customer?.details?.city}, {customer?.details?.province},
            {customer?.details?.country}
          </Text>
        </Shimmer>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IonIcon name="call-outline" color={"#42C88F"} size={27} />
        <Shimmer
          autoRun={true}
          visible={!slideLoading}
          style={{ marginLeft: 7, borderRadius: 10 }}
        >
          <Text style={{ marginLeft: 7 }}>
            {customer?.details?.phoneNumber},{" "}
            {customer?.details?.altPhoneNumber}
          </Text>
        </Shimmer>
      </View>

      <View //orderSummary View
        style={{
          height: 200,
          // backgroundColor: "#F9F9F9",
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            marginTop: 10,

            marginBottom: 5,
            fontWeight: "bold",
          }}
        >
          Order Summary
        </Text>
        <FlatList
          data={orderList}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 10,
            borderBottomEndRadius: 15,
            borderBottomStartRadius: 15,
            backgroundColor: "#f6f8f9",
            padding: 10,
          }}
          renderItem={({ item }) => (
            <Pressable
              style={[
                universalStyles.row_f1_sb_c,
                {
                  padding: 5,
                  backgroundColor: "white",
                  margin: 5,
                  borderRadius: 10,
                },
              ]}
            >
              <View
                style={[
                  universalStyles.centered_container,
                  { flexDirection: "row" },
                ]}
              >
                <Image
                  source={{
                    uri: `data:${item[0].imageForm};base64,${item[0].image}`,
                  }}
                  style={{ height: 40, width: 40, borderRadius: 5 }}
                />
                <View
                  style={[
                    universalStyles.centered_container,
                    {
                      backgroundColor: "#f6f8f9",
                      marginLeft: 7,
                      borderRadius: 100,
                      padding: 4,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 12,
                    }}
                  >
                    x{item[1]}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  universalStyles.row_f1_sb_c,
                  { flexWrap: "wrap", marginLeft: 7, marginRight: 7 },
                ]}
              >
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  {item[0].name}
                </Text>
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

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>Order Total</Text>

        <NumberFormat
          value={currOrder.total}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"PKR "}
          renderText={(value) => <Text style={{ fontSize: 25 }}>{value}</Text>}
        />
      </View>
    </View>
  );
}
