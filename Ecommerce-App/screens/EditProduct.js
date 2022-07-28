import React, { useState } from "react";
import { Text, View, TextInput, Pressable, Alert, Image } from "react-native";
import styles from "../styles/Styles.js";
import ImagePicker from "react-native-image-crop-picker";
import { TasksProvider, useTasks } from "../providers/TasksProvider.js";
import { useAuth } from "../providers/AuthProvider.js";
import { NativeBuffer } from "mongoose";
function Editproduct({ navigation, route }) {
  const { currItem } = route.params;
  const [prodName, setProdName] = useState(currItem.name);
  const [description, setDescription] = useState(currItem.description);
  const [category, setCategory] = useState(currItem.category);
  const [price, setPrice] = useState(currItem.price);
  const [imageUri, setImageUri] = useState(currItem.image);
  // const { createTask } = route.params.useTasks();
  // const { user } = useAuth();
  const { deleteTask, updateTask } = useTasks({ route });
  const [imageForm, setImageForm] = useState("");
  // console.log(currItem);
  // The onPressSignUp method calls AuthProvider.signUp with the
  // email/password in state and then signs in.

  return (
    <View style={styles.container}>
      <View style={styles.fields}>
        <Pressable
          style={styles.d_button}
          onPress={() =>
            Alert.alert("Are you sure you want to delete this product?", null, [
              {
                text: "Yes, Delete",
                style: "destructive",
                onPress: () => {
                  console.log("deleting item");
                  deleteTask(currItem);
                  navigation.navigate("Homescreen");
                },
              },
              { text: "Cancel", style: "cancel" },
            ])
          }
        >
          <Text style={styles.d_button_text}>Delete Item</Text>
        </Pressable>

        <TextInput
          style={styles.inputbox}
          placeholder="Product Name"
          defaultValue={prodName}
          onChangeText={(text) => setProdName(text)}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Category"
          defaultValue={category}
          onChangeText={(text) => setCategory(text)}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Price"
          defaultValue={price}
          onChangeText={(text) => setPrice(text)}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.inputbox}
          placeholder="Product Description"
          multiline={true}
          defaultValue={description}
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
              // console.log(image);
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
            updateTask(
              currItem,
              prodName,
              category,
              price,
              description,
              imageUri,
              imageForm
            );
            Alert.alert(prodName + " is edited from main inventory.");
            navigation.navigate("Homescreen");
          }}
        >
          <Text style={styles.p_button_text}>Finish Editing</Text>
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

export default Editproduct;
