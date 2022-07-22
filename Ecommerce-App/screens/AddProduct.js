import React, { useState } from "react";
import { Text, View, TextInput, Pressable, Alert } from "react-native";
import styles from "../styles/Styles.js";
import ImagePicker from "react-native-image-crop-picker";

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

        {/* <Pressable
          // style={styles.inputbox}
          // placeholder="Insert Image File"
          // secureTextEntry={true}
          onChangeText={(text) =>
            ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
            }).then((image) => {
              console.log(image);
            })
          }
        /> */}
        <Pressable
          style={styles.p_button}
          onPress={() => {
            ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
            }).then((image) => {
              console.log(image);
            });
          }}
        >
          <Text style={styles.p_button_text}>Upload Image</Text>
        </Pressable>
        <Pressable style={styles.p_button}>
          <Text style={styles.p_button_text}>Add Item</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Addproduct;
