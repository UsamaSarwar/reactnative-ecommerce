import { StyleSheet } from "react-native";

export default productCardStyles = StyleSheet.create({
  productCard: {
    backgroundColor: "#f6f8f9",
    opacity: 0.9,
    padding: 10,
    borderRadius: 15,
    flexDirection: "row",
    flex: 1,
    marginBottom: 10,
  },

  product_image: {
    height: 100,
    width: 100,
    borderRadius: 15,
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
  },

  nameContainer: {
    flex: 1,
    marginBottom: 3,
  },

  nameText: { fontWeight: "bold", fontSize: 15 },

  categoryContainer: { flex: 1, marginBottom: 5 },

  categoryText: {
    fontSize: 11,
    color: "grey",
  },

  descriptionText: { marginBottom: 10, fontSize: 15 },
});
