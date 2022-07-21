import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider.js";
// import { launchImageLibrary } from "react-native-image-picker";
import { TasksProvider } from "../providers/TasksProvider.js";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
  Button,
  ImageBackground,
  Pressable,
  Image,
  Alert,
} from "react-native";
import styles from "../styles/Styles.js";
import { useTasks } from "../providers/TasksProvider.js";

function Addproduct({ navigation, route }) {
  const [prodName, setProdName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  //   const { createTask } = useTasks();

  // The onPressSignUp method calls AuthProvider.signUp with the
  // email/password in state and then signs in.

  return (
    <View style={styles.container}>
      <View style={styles.fields}>
        <TextInput
          style={styles.inputbox}
          placeholder="Product Name"
          onChangeText={(text) => setProdName(text)}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Category"
          onChangeText={(text) => setCategory(text)}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Price"
          onChangeText={(text) => setPrice(text)}
        />

        <TextInput
          style={styles.inputbox}
          placeholder="Product Description"
          secureTextEntry={true}
          onChangeText={(text) => setDescription(text)}
        />

        <TextInput
          style={styles.inputbox}
          placeholder="Insert Image File"
          secureTextEntry={true}
          onChangeText={(text) => setImage(text)}
        />
        <Pressable style={styles.p_button}>
          <Text style={styles.p_button_text}>Add Item</Text>
        </Pressable>
      </View>
    </View>
  );
}

// const addUserAccount = (
//   userName,
//   password,
//   confirmpass,
//   accounts,
//   emailAddr,
//   navigation
// ) => {
//   if (password !== confirmpass) {
//     return Alert.alert("Password not matching.");
//   }
//   if (!(emailAddr.includes("@") || emailAddr.includes(".com"))) {
//     return Alert.alert("Invalid email address entered.");
//   }
//   if (Object.keys(accounts).includes(userName)) {
//     return Alert.alert("User already exists.");
//   }

//   // accounts[userName] = password;
//   Alert.alert("Success", userName + " has been added successfully.", [
//     {
//       text: "OK",
//       onPress: () => navigation.navigate("Login", { paramKey: accounts }),
//     },
//   ]);
//   return;
// };

export default Addproduct;
