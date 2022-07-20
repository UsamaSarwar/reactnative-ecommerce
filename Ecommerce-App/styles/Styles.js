import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    padding: 50,
  },
  fields: {
    backgroundColor: "rgba(255, 255, 255, .5)",
    padding: 20,
    borderRadius: 20,
    // flex: 1,
    // justifyContent: "space-around",
  },
  logoView: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 125,
    height: 125,
  },
  headText: {
    paddingHorizontal: "2%",
    color: "purple",
    paddingBottom: "5%",
  },
  random_text: {
    fontSize: 15,
    color: "black",
    paddingVertical: "1%",
    paddingHorizontal: "19%",
    // margin: 36,
    borderWidth: 2,
    borderRadius: 20,
  },
  inputbox: {
    height: 45,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowRadius: 100,
    marginBottom: 24,
    paddingLeft: 10,
  },
  p_button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#40e1d1",
    marginBottom: 24,
  },
  p_button_text: {
    fontSize: 21,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  s_button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginBottom: 24,
  },
  s_button_text: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#AAAAAA",
  },
});
