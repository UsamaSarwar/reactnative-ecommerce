import React, { useContext, useState, useEffect, useRef } from "react";
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

  //Categories in homscreen
  const category = [
    "All",
    "Accessories",
    "Casings",
    "Consoles",
    "Displays",
    "Earphones",
    "Headphones",
    "Keyboards",
    "Laptops",
    "Mouse",
    "Smartphones",
    "Webcams",
  ];

  //Order Status Types
  const orderTypes = ["All", "Processing", "Dispatched", "Delivered"];

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

        searchText,
        setSearchText,
        category,
        orderTypes,
        checkDetailsError,
        setDetailsError,
        detailsError,
        listType,
        setListType,
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
