import React, { useState } from "react";
import { Text, View, TextInput, Pressable, Alert, Image } from "react-native";
import styles from "../styles/Styles.js";
import ImagePicker from "react-native-image-crop-picker";
import { TasksProvider, useTasks } from "../providers/TasksProvider.js";
import { useAuth } from "../providers/AuthProvider.js";
import { NativeBuffer } from "mongoose";
function Addproduct({ navigation, route }) {
  const [prodName, setProdName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [imageForm, setImageForm] = useState("");
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
          keyboardType="numeric"
        />

        <TextInput
          style={styles.inputbox}
          placeholder="Product Description"
          multiline={true}
          onChangeText={(text) => setDescription(text)}
        />
        <Pressable
          style={styles.p_button}
          onPress={() => {
            ImagePicker.openPicker({
              width: 300,
              height: 300,
              cropping: true,
              includeBase64: true,
            }).then((image) => {
              setImageUri(image.data);
              setImageForm(image.mime);
            });
          }}
        >
          <Text style={styles.p_button_text}>Upload Image</Text>
        </Pressable>

        <Pressable
          style={styles.p_button}
          onPress={() => {
            createTask(
              prodName,
              category,
              price,
              description,
              imageUri,
              imageForm
            );
            Alert.alert(prodName + " added to the main inventory.");
            navigation.navigate("Homescreen");
          }}
        >
          <Text style={styles.p_button_text}>Add Item</Text>
        </Pressable>
        {imageUri ? (
          <View style={{ marginBottom: 20, alignItems: "center" }}>
            <Image
              source={{ uri: `data:${imageForm};base64,${imageUri}` }}
              style={{
                width: 200,
                height: 200,
              }}
            />
          </View>
        ) : (
          void 0
        )}
        <Pressable
          style={styles.s_button}
          onPress={() => navigation.navigate("Homescreen")}
        >
          <Text style={styles.s_button_text}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Addproduct;
