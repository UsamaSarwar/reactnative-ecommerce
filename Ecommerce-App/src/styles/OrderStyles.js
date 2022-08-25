import { StyleSheet } from "react-native";

export default OrderStyles = StyleSheet.create({
  order_list: {
    margin: 10,
    borderRadius: 15,
  },
  status_tab: {
    borderWidth: 0.5,
    alignItems: "center",
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1.1,
    justifyContent: "center",
  },
  total_container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  payment_icon: {
    height: 15,
    width: 15,
    marginLeft: 5,
  },
  status_container: {
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    width: 80,
    height: 30,
  },
  itemView: {
    marginBottom: 10,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    backgroundColor: "#f6f8f9",
    padding: 10,
  },
  item_container: {
    padding: 5,
    backgroundColor: "white",
    margin: 5,
    borderRadius: 10,
  },
  item_image: { height: 40, width: 40, borderRadius: 5 },
  text_view: {
    backgroundColor: "#f6f8f9",
    marginLeft: 7,
    borderRadius: 100,
    padding: 4,
  },
  text_container: {
    flexWrap: "wrap",
    marginLeft: 7,
    marginRight: 7,
  },
});
