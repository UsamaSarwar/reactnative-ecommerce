import { StyleSheet } from "react-native";

export default productCardStyles = StyleSheet.create({
  productCard: {
    backgroundColor: "white",
    opacity: 0.9,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
  },

  imageContainer: {
    borderWidth: 1,
    borderColor: "#f3f3f3",
    justifyContent: "center",
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
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
