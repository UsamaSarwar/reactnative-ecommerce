import React, { useContext, useState, useEffect, useRef } from "react";

const GlobalContext = React.createContext(null);

const GlobalProvider = ({ children }) => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const [isNewProduct, setIsNewProduct] = useState(false);

  const [cartUpdate, setCartUpdate] = useState(false);

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
