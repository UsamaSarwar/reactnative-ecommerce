//React
import React, { useEffect, useState } from "react";

//React Componenets
import {
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";
import DropDownPicker from "react-native-dropdown-picker";

//Providers
import { useTasks } from "../../providers/TasksProvider.js";
import { useGlobal } from "../../providers/GlobalProvider.js";

//Styles
import UniversalStyles from "../../styles/UniversalStyles.js";
import ButtonStyles from "../../styles/ButtonStyles.js";
import InputStyles from "../../styles/InputStyles.js";
import IconStyles from "../../styles/IconStyles.js";

export default function AdminSlideUpCard({ elementRef }) {
  const { createTask, updateTask } = useTasks();
  const { product, isNewProduct } = useGlobal();

  const [prodName, setProdName] = useState("");
  const [category, setCategory] = useState(null);
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

  //Dropdown
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Accessory", value: "accessory" },
    { label: "Casing", value: "casing" },
    { label: "Camera", value: "camera" },
    { label: "Console", value: "console" },
    { label: "Display", value: "display" },
    { label: "Earphones", value: "earphone" },
    { label: "Headphone", value: "headphone" },
    { label: "Keyboard", value: "Keyboard" },
    { label: "Laptop", value: "laptop" },
    { label: "Mouse", value: "mouse" },
    { label: "Smartphone", value: "smartphone" },
    { label: "Webcam", value: "webacam" },
  ]);

  useEffect(() => {
    setProdName(product.name);
    setCategory(product.category);
    setDescription(product.description);
    setPrice(product.price);
    setImageUri(product.image);
    setImageForm(product.imageForm);

    setNameError(false);
    setCategoryError(false);
    setPriceError(false);
    setDescriptionError(false);
  }, [product]);

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

  const onPressAddItem = async () => {
    if (prodName === "") {
      setNameError(true);
    } else if (category === "") {
      setCategoryError(true);
    } else if (price === "") {
      setPriceError(true);
    } else if (description === "") {
      setDescriptionError(true);
    } else {
      setLoading(true);
      await createTask(
        prodName,
        category,
        price,
        description,
        imageUri,
        imageForm
      );
      setLoading(false);
      // Alert.alert(prodName + " added to the main inventory.");
      elementRef.current.hide();
    }
  };

  const onPressEditItem = async () => {
    setLoading(true);

    await updateTask(
      product,
      prodName,
      category,
      price,
      description,
      imageUri,
      imageForm
    );

    setLoading(false);
    elementRef.current.hide();
  };

  return (
    <View>
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

      <DropDownPicker
        open={open}
        value={category}
        items={items}
        setOpen={setOpen}
        setValue={setCategory}
        setItems={setItems}
        listMode="SCROLLVIEW"
        placeholder={"Select a Category"}
        placeholderStyle={{
          color: "#C7C7CD",
        }}
        dropDownContainerStyle={{
          backgroundColor: "#ffffff",
          borderRadius: 15,
          borderColor: "#f6f8f9",
        }}
        style={[
          InputStyles.textInput,
          {
            backgroundColor: "#f6f8f9",
            borderColor: categoryError ? "red" : "transparent",
          },
        ]}
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
              IconStyles.background3,
              {
                alignSelf: "flex-end",
                marginRight: 100,
              },
            ]}
          >
            <Icon
              name="edit"
              color={"#ffffff"}
              size={21}
              onPress={() => openImagePicker()}
            />
          </View>
        </View>
      ) : (
        <Pressable
          style={ButtonStyles.p_button_login}
          onPress={() => openImagePicker()}
        >
          <IonIcon name="image" size={23} color="white" />
        </Pressable>
      )}

      {isNewProduct ? (
        <Pressable
          style={ButtonStyles.p_button_login}
          onPress={() => onPressAddItem()}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" size={24} />
          ) : (
            <Text style={ButtonStyles.p_button_text}>Add Item</Text>
          )}
        </Pressable>
      ) : (
        <Pressable
          style={ButtonStyles.p_button_login}
          onPress={() => onPressEditItem()}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" size={24} />
          ) : (
            <Text style={ButtonStyles.p_button_text}>Done Editing</Text>
          )}
        </Pressable>
      )}
    </View>
  );
}
