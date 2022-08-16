//React
import React, { useState } from "react";

//React Components
import { Text, View, Pressable, Image, FlatList, Alert } from "react-native";
import NumberFormat from "react-number-format";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Icons
import Icon from "react-native-vector-icons/AntDesign";
import MatIcon from "react-native-vector-icons/MaterialIcons";

//Providers
import { useTasks } from "../../providers/TasksProvider";
import { useOrder } from "../../providers/OrderProvider";
import { useGlobal } from "../../providers/GlobalProvider";

//Components
import Shimmer from "../Shimmer";

//Styles
import universalStyles from "../../styles/UniversalStyles";
import productCardStyles from "../../styles/ProductCardStyle";
import IconStyles from "../../styles/IconStyles";

export default function OrderItemAdmin({ elementRef }) {
  const { orders } = useOrder();

  const [loading, setLoading] = useState(true);

  if (orders.length > 0 && loading) {
    setLoading(false);
  }

  return (
    <FlatList
      data={!loading ? orders : [1, 2, 3, 4, 5]}
      showsVerticalScrollIndicator={false}
      style={{ margin: 10, borderRadius: 15 }}
      renderItem={({ item }) => (
        <Animatable.View
          animation="zoomInUp"
          duration={1500}
          style={productCardStyles.productCard}
        >
          <Text>{item.orderNumber}</Text>
        </Animatable.View>
      )}
    />
  );
}
