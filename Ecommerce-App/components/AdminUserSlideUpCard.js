import React, { useState } from "react";
import { Text, View, TextInput, Pressable, Alert, Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import ImagePicker from "react-native-image-crop-picker";

import { useTasks } from "../providers/TasksProvider.js";

import UniversalStyles from "../styles/UniversalStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";
import InputStyles from "../styles/InputStyles.js";
import IconStyles from "../styles/IconStyles.js";

export default function AdminSlideUpCard({ data, toEdit }) {
  const { createTask, updateTask } = useTasks();

  const [prodName, setProdName] = useState(data.name);
  const [category, setCategory] = useState(data.category);
  const [description, setDescription] = useState(data.description);
  const [price, setPrice] = useState(data.price);
  const [imageUri, setImageUri] = useState(data.image);
  const [imageForm, setImageForm] = useState("");

  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imageError, setImageError] = useState(false);

  console.log(data.name);

  const onCancel = () => {
    setProdName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setImageUri("");
    setImageForm("");
  };

  const openImagePicker = () =>
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setImageUri(image.data);
      setImageForm(image.mime);
    });

  const onPressAddItem = () => {
    if (prodName === "") {
      setNameError(true);
    } else if (category === "") {
      setCategoryError(true);
    } else if (price === "") {
      setPriceError(true);
    } else if (description === "") {
      setDescriptionError(true);
    } else if (imageForm === "") {
      setImageError(true);
    } else {
      createTask(prodName, category, price, description, imageUri, imageForm);
      Alert.alert(prodName + " added to the main inventory.");
      navigation.navigate("Homescreen");
    }
  };

  const onPressEditItem = () => {
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
  };

  const onPressDeleteItem = () => {
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
    ]);
  };

  return (
    <View style={UniversalStyles.col_f_e}>
      <View style={UniversalStyles.col_wbg_p20}>
        {prodName === "" ? null : (
          <Text style={{ marginBottom: 5 }}>Product Name</Text>
        )}
        <TextInput
          defaultValue={prodName}
          placeholder="Product Name"
          style={[
            InputStyles.textInput,
            {
              backgroundColor: "#f6f8f9",
              borderColor: nameError ? "red" : "transparent",
            },
          ]}
          onChangeText={(text) => setProdName(text)}
        />

        {category === "" ? null : (
          <Text style={{ marginBottom: 5 }}>Category</Text>
        )}
        <TextInput
          defaultValue={category}
          placeholder="Category"
          style={[
            InputStyles.textInput,
            {
              backgroundColor: "#f6f8f9",
              borderColor: categoryError ? "red" : "transparent",
            },
          ]}
          onChangeText={(text) => setCategory(text)}
        />

        {price === "" ? null : <Text style={{ marginBottom: 5 }}>Price</Text>}
        <TextInput
          defaultValue={price}
          placeholder="Price"
          keyboardType="numeric"
          style={[
            InputStyles.textInput,
            {
              backgroundColor: "#f6f8f9",
              borderColor: priceError ? "red" : "transparent",
            },
          ]}
          onChangeText={(text) => setPrice(text)}
        />

        {description === "" ? null : (
          <Text style={{ marginBottom: 5 }}>Product Description</Text>
        )}
        <TextInput
          defaultValue={description}
          placeholder="Product Description"
          multiline={true}
          style={[
            InputStyles.textInput,
            {
              backgroundColor: "#f6f8f9",
              borderColor: descriptionError ? "red" : "transparent",
            },
          ]}
          onChangeText={(text) => setDescription(text)}
        />

        {imageUri ? (
          <View
            style={[
              UniversalStyles.center,
              {
                marginBottom: 20,
              },
            ]}
          >
            <Image
              source={{ uri: `data:${imageForm};base64,${imageUri}` }}
              style={{
                width: 100,
                height: 100,
              }}
            />
            <View
              style={[
                IconStyles.background2,
                { alignSelf: "flex-end", marginRight: 100 },
              ]}
            >
              <Icon name="edit" size={21} onPress={() => openImagePicker()} />
            </View>
          </View>
        ) : (
          <Pressable
            style={ButtonStyles.p_button}
            onPress={() => openImagePicker()}
          >
            <Text style={ButtonStyles.p_button_text}>Upload Image</Text>
          </Pressable>
        )}

        {toEdit ? (
          <View>
            <Pressable
              style={ButtonStyles.p_button}
              onPress={() => onPressEditItem()}
            >
              <Text style={ButtonStyles.p_button_text}>Edit Item</Text>
            </Pressable>

            <Pressable
              style={ButtonStyles.d_button}
              onPress={() => onPressDeleteItem()}
            >
              <Text style={ButtonStyles.d_button_text}>Delete Item</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <Pressable
              style={ButtonStyles.p_button}
              onPress={() => onPressAddItem()}
            >
              <Text style={ButtonStyles.p_button_text}>Add Item</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
