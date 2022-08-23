//React
import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import NumberFormat from "react-number-format";

//Providers
import { useGlobal } from "../../providers/GlobalProvider";

//Styles
import UniversalStyles from "../../styles/UniversalStyles";

export default function CartSlideUpCard() {
  const { product } = useGlobal();

  return (
    <View>
      <View style={UniversalStyles.view_card_img_1}>
        <Image
          source={{
            uri: `data:${product.imageForm};base64,${product.image}`,
          }}
          style={{
            height: "100%",
            resizeMode: "contain",
            borderRadius: 10,
          }}
        />
      </View>
      <View>
        <View style={{ marginBottom: 2 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            {product.name}
          </Text>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 11,
              color: "grey",
            }}
          >
            {product.category}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View>
          <Text style={{ fontSize: 15 }}>{product.description}</Text>
        </View>
      </ScrollView>
      <View
        style={[
          UniversalStyles.row_f1_sb_c,
          {
            marginTop: 10,
            marginBottom: 15,
          },
        ]}
      >
        <NumberFormat
          value={parseInt(product.price)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"PKR "}
          renderText={(value) => <Text>{value}</Text>}
        />
      </View>
    </View>
  );
}
