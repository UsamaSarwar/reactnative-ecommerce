//React
import React from "react";

//React Components
import { Text, View, Pressable, Image, FlatList } from "react-native";
import NumberFormat from "react-number-format";

//Providers
import { useTasks } from "../../providers/TasksProvider";
import { useGlobal } from "../../providers/GlobalProvider";

//Styles
import universalStyles from "../../styles/UniversalStyles";

export default function CheckoutItem({ elementRef }) {
  const { shoppingCart } = useTasks();
  const { setProduct, setIsNewProduct } = useGlobal();

  const renderSlide = (item) => {
    elementRef.current.show();
    setProduct(item);
    setIsNewProduct(false);
  };

  return (
    <FlatList
      data={shoppingCart}
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
          onPress={() => renderSlide(item[0])}
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
  );
}
