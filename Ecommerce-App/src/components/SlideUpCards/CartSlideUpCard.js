//React
import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import NumberFormat from "react-number-format";

//Providers
import { useGlobal } from "../../providers/GlobalProvider";

//Styles
import UniversalStyles from "../../styles/UniversalStyles";
import TextStyles from "../../styles/TextStyles";

export default function CartSlideUpCard() {
  const { product } = useGlobal();

  return (
    <View>
      <View style={UniversalStyles.view_card_img_1}>
        <Image
          source={{
            uri: `data:${product.imageForm};base64,${product.image}`,
          }}
          style={UniversalStyles.cart_slide}
        />
      </View>
      <View>
        <View style={UniversalStyles.marginBottom2}>
          <Text style={TextStyles.bold_normal}>{product.name}</Text>
        </View>

        <View style={UniversalStyles.marginBottom10}>
          <Text style={TextStyles.category_font}>{product.category}</Text>
        </View>
      </View>
      <ScrollView>
        <View>
          <Text style={TextStyles.above_normal_font}>
            {product.description}
          </Text>
        </View>
      </ScrollView>
      <View
        style={[
          UniversalStyles.row_f1_sb_c,
          UniversalStyles.marginTop10,
          UniversalStyles.marginBottom15,
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
