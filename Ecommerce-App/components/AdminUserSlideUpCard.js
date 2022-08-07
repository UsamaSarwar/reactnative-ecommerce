import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Pressable, Alert, Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";

import ImagePicker from "react-native-image-crop-picker";

import { useTasks } from "../providers/TasksProvider.js";

import UniversalStyles from "../styles/UniversalStyles.js";
import ButtonStyles from "../styles/ButtonStyles.js";
import InputStyles from "../styles/InputStyles.js";
import IconStyles from "../styles/IconStyles.js";

export default function AdminSlideUpCard({
  data,
  toEdit,
  isClosed,
  elementRef,
}) {
  const { createTask, updateTask } = useTasks();

  const [prodName, setProdName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [imageForm, setImageForm] = useState("");

  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.name && !loading) {
      setProdName(data.name);
      setCategory(data.category);
      setDescription(data.description);
      setPrice(data.price);
      setImageUri(data.image);
      setImageForm(data.imageForm);
      setLoading(true);
    }

    if (isClosed) {
      setProdName("");
      setCategory("");
      setPrice("");
      setDescription("");
      setImageUri("");
      setImageForm("");

      setNameError(false);
      setCategoryError(false);
      setDescriptionError(false);
      setPriceError(false);

      setLoading(false);

      // elementRef.current.hide();
    }
  });

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
    }
    if (category === "") {
      setCategoryError(true);
    }
    if (price === "") {
      setPriceError(true);
    }
    if (description === "") {
      setDescriptionError(true);
    } else {
      // if (imageForm === "") {
      //   setImageError(true);
      // }
      createTask(prodName, category, price, description, imageUri, imageForm);
      Alert.alert(prodName + " added to the main inventory.");
      elementRef.current.hide();
    }
  };

  const onPressEditItem = () => {
    updateTask(
      data,
      prodName,
      category,
      price,
      description,
      imageUri,
      imageForm
    );

    Alert.alert(prodName + " is edited from main inventory.", null, [
      {
        text: "Ok",
        onPress: () => {
          setLoading(false);
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
            InputStyles.muktilineInput,
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
                {
                  alignSelf: "flex-end",
                  marginRight: 100,
                  backgroundColor: "rgba(66, 200, 143, 0.8)",
                },
              ]}
            >
              <Icon name="edit" size={21} onPress={() => openImagePicker()} />
            </View>
          </View>
        ) : (
          <Pressable
            style={ButtonStyles.p_button_login}
            onPress={() => openImagePicker()}
          >
            <IonIcon name="image" size={23} color="white" />
            {/* <Text style={ButtonStyles.p_button_text}>Upload Image</Text> */}
          </Pressable>
        )}

        {toEdit ? (
          <Pressable
            style={ButtonStyles.p_button_login}
            onPress={() => onPressEditItem()}
          >
            <Text style={ButtonStyles.p_button_text}>Done Editing</Text>
          </Pressable>
        ) : (
          <View>
            <Pressable
              style={ButtonStyles.p_button_login}
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
