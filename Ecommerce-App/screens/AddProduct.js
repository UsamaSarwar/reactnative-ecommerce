import React, { useState } from "react";
import { Text, View, TextInput, Pressable, Alert, Image } from "react-native";
import styles from "../styles/Styles.js";
import ImagePicker from "react-native-image-crop-picker";
import { TasksProvider, useTasks } from "../providers/TasksProvider.js";
import { useAuth } from "../providers/AuthProvider.js";
function Addproduct({ navigation, route }) {
  const [prodName, setProdName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState("");
  // const { createTask } = route.params.useTasks();
  const { user } = useAuth();
  const { createTask } = useTasks();

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
        <Pressable
          style={styles.p_button}
          onPress={() => {
            ImagePicker.openPicker({
              width: 1000,
              height: 1000,
              cropping: true,
            }).then((image) => {
              setImageUri(image.path);
            });
          }}
        >
          <Text style={styles.p_button_text}>Upload Image</Text>
        </Pressable>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          void 0
        )}

        <Pressable
          style={styles.p_button}
          onPress={() => {
            createTask(prodName);
          }}
        >
          <Text style={styles.p_button_text}>Add Item</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Addproduct;
