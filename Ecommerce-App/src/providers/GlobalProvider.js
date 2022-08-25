//React Components
import React, { useContext, useState, useEffect } from "react";
import { Keyboard } from "react-native";

//Providers
import { useAuth } from "./AuthProvider";

const GlobalContext = React.createContext(null);

const GlobalProvider = ({ children }) => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const [currOrder, setCurrOrder] = useState({
    customerid: "",
    orderNumber: "",
    orderStatus: "",
    orderTime: "",
    paymentMethod: "",
    total: 0,
    orderItems: [],
  });

  const { personalDetails } = useAuth();

  const [listType, setListType] = useState("Inventory");

  const [isNewProduct, setIsNewProduct] = useState(false);

  const [customer, setCustomer] = useState({});

  const [update, setUpdate] = useState(false);

  const [detailsError, setDetailsError] = useState(false);

  //Searchbar on Homescreen
  const [searchText, setSearchText] = useState("");

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  //Categories in homscreen
  const category = [
    ["All", "all-inclusive"],
    ["Accessories", "desktop-classic"],
    ["Casings", "bag-suitcase"],
    ["Consoles", "controller-classic"],
    ["Displays", "monitor"],
    ["Earphones", "earbuds"],
    ["Headphones", "headphones"],
    ["Keyboards", "keyboard"],
    ["Laptops", "laptop"],
    ["Mouse", "mouse"],
    ["Smartphones", "cellphone"],
    ["Webcams", "webcam"],
  ];

  //Carousel Links
  const carouselData = [
    "https://www.slashgear.com/img/gallery/watch-sonys-first-playstation-5-tv-ad-talk-dualsense-and-3d-audio/intro-import.jpg",
    "https://i.ytimg.com/vi/7pVYBaS9dpM/maxresdefault.jpg",
    "https://www.asus.com/media/Odin/Websites/global/ProductLine/20210702104734.jpg",
  ];

  //Order Status Types
  const orderTypes = [
    ["All", "all-inclusive"],
    ["Processing", "cog"],
    ["Dispatched", "car"],
    ["Delivered", "check-all"],
  ];

  const checkDetailsError = async () => {
    if (
      !personalDetails.name ||
      !personalDetails.phoneNumber ||
      !personalDetails.country ||
      !personalDetails.province ||
      !personalDetails.city ||
      !personalDetails.address ||
      !personalDetails.postalCode
    ) {
      setDetailsError(true);
    } else {
      setDetailsError(false);
    }
  };

  useEffect(() => {
    if (isNewProduct) {
      setProduct({
        name: "",
        category: "",
        price: "",
        description: "",
      });
    }
  }, [isNewProduct]);

  return (
    <GlobalContext.Provider
      value={{
        product,
        setProduct,
        currOrder,
        setCurrOrder,
        isNewProduct,
        setIsNewProduct,
        customer,
        setCustomer,
        update,
        setUpdate,
        isKeyboardVisible,
        searchText,
        setSearchText,
        category,
        orderTypes,
        checkDetailsError,
        setDetailsError,
        detailsError,
        listType,
        setListType,
        carouselData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobal = () => {
  const global = useContext(GlobalContext);
  if (global == null) {
    throw new Error("useGlobal() called outside of a GlobalProvider?");
  }
  return global;
};
export { GlobalProvider, useGlobal };
