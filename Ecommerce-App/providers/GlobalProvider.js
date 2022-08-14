import React, { useContext, useState, useEffect, useRef } from "react";

const GlobalContext = React.createContext(null);

const GlobalProvider = ({ children }) => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const [listType, setListType] = useState("Inventory");

  const [isNewProduct, setIsNewProduct] = useState(false);

  const [cartUpdate, setCartUpdate] = useState(false);

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
        isNewProduct,
        setIsNewProduct,
        cartUpdate,
        setCartUpdate,
        searchText,
        setSearchText,
        category,
        setDetailsError,
        detailsError,
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
