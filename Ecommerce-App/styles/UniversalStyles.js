import { StyleSheet } from "react-native";

export default universalStyles = StyleSheet.create({
  //General
  row_sb_conatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  col_sb_conatiner: {
    flexDirection: "column",
    justifyContent: "space-between",
  },

  centered_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar_container: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar_container_settings_page: {
    marginTop: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  page_container: {
    flex: 1,
  },

  background_image: {
    flex: 1,
    justifyContent: "space-between",
  },

  logo_container: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
    padding: 10,
  },

  logo: {
    width: 125,
    height: 125,
    borderRadius: 100,
  },

  centered_container: {
    justifyContent: "center",
    alignItems: "center",
  },

  input_fields_container_1: {
    flexDirection: "column",
    backgroundColor: "#f6f8f9",
    padding: 20,
    borderRadius: 20,
  },

  pressable_1: {
    backgroundColor: "#f6f8f9",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#AAAAAA",
    shadowRadius: 100,
    shadowOffset: { height: 100, width: 100 },
    elevation: 100,
  },

  header: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    opacity: 0.9,
    padding: 20,
    alignItems: "center",
  },
  footer: {
    backgroundColor: "white",
    opacity: 0.9,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
  },

  flex1: { flex: 1 },

  col_f_e: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },

  col_wbg_p20: {
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },

  card_drag_container: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: 20,
  },

  card_dragger: {
    height: 4,
    backgroundColor: "#AAAAAA",
    borderRadius: 20,
    width: "60%",
  },

  row_f1_sb_c: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  view_card_img_1: {
    borderWidth: 1,
    borderColor: "#f3f3f3",
    justifyContent: "center",
    height: "40%",
    marginBottom: 20,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "space-between",
  },
  fields: {
    backgroundColor: "rgba(66, 200, 143, 0.3)",
    padding: 20,
    borderRadius: 20,
  },
  logoView: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
    padding: 10,
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

  inputContainer: {
    padding: 5,
  },
  inputStyle: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
  },
  manageTeamWrapper: {
    width: 350,
  },
  manageTeamTitle: {
    marginBottom: 10,
  },
  addTeamMemberInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 5,
    fontSize: 18,
  },
  manageTeamButtonContainer: {
    textAlign: "left",
    borderTopColor: "grey",
    borderTopWidth: 1,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  plusButton: {
    fontSize: 28,
    fontWeight: "400",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  cartButtons: {
    // borderRadius: "50%",
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 15,
  },
  cartIcons: {
    fontSize: 20,
  },
});
