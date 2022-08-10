//React
import React, { useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import NumberFormat from "react-number-format";
// import Snackbar from "react-native-snackbar";

//Providers
import { useAuth } from "../providers/AuthProvider";
import { useGlobal } from "../providers/GlobalProvider";

//Components
import Quantity from "./Quantity";

//Styles
import UniversalStyles from "../styles/UniversalStyles";

export default function CartSlideUpCard({ elementRef }) {
  const { product } = useGlobal();

  const [updatingCart, setUpdatingCart] = useState(false);

  const [quantity, setQuantity] = useState(1);

  // useEffect(() => setQuantity(1), [product]);

  return (
    <View style={UniversalStyles.col_f_e}>
      <View style={UniversalStyles.col_wbg_p20}>
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
        <ScrollView style={{ height: 60 }}>
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

          {/* <Quantity quantity={quantity} setQuantity={setQuantity} /> */}
        </View>
      </View>
    </View>
  );
}
