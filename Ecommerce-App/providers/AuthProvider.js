import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import app from "../realmApp";
// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthContext = React.createContext(null);
// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(app.currentUser);
  const realmRef = useRef(null);
  const [projectData, setProjectData] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartSize, SetCartSize] = useState(
    user ? user.customData.cart.length : 0
  );
  // console.log(cartSize);
  useEffect(() => {
    if (!user) {
      return;
    }
    console.log("User Realm Openned");
    // The current user always has their own project, so we don't need
    // to wait for the user object to load before displaying that project.
    // const myProduct = { name: "My Product", partition: `user=${user.id}` };
    // setProductData([myProduct]);

    // const myProject = { name: "My Project", partition: `project=${user.id}` };
    // setProjectData([myProject]);
    const OpenRealmBehaviorConfiguration = {
      type: "openImmediately",
    };
    // TODO: Open the user realm, which contains at most one user custom data object
    // for the logged-in user.
    const config = {
      sync: {
        user,
        partitionValue: `user=${user.id}`,
        // partitionValue: null,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };

    // Open a realm with the logged in user's partition value in order
    // to get the projects that the logged in user is a member of
    Realm.open(config).then((userRealm) => {
      realmRef.current = userRealm;
      const users = userRealm.objects("User");
      console.log(users);
      users.addListener(() => {
        // The user custom data object may not have been loaded on
        // the server side yet when a user is first registered.
        if (users.length === 0) {
          setProjectData([myProject]);
        } else {
          // console.log("hello");
          const { cart } = users[0];
          setProjectData([...cart]);
        }
      });
    });
    // TODO: Return a cleanup function that closes the user realm.
    // console.log("Is this the error?");
    return () => {
      console.log("Closing User realm");
      // cleanup function
      const userRealm = realmRef.current;
      if (userRealm) {
        userRealm.close();
        realmRef.current = null;
        // setProductData([]);
        setProjectData([]); // set project data to an empty array (this prevents the array from staying in state on logout)

        console.log("Closing User realm");
      }
      // Realm.close();
    };
  }, [user, cartSize]);

  useEffect(() => {
    SetCartSize(user ? user.customData.cart.length : 0);
  }, [user]);

  // The signIn function takes an email and password and uses the
  // emailPassword authentication provider to log in.

  const resetPass = async (email, password) => {
    try {
      await app.emailPasswordAuth.callResetPasswordFunction({
        email,
        password,
      });
      // await app.emailPasswordAuth.resetPassword(token, tokenId);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (email) => {
    await app.deleteUser(email);
  };

  const passResetEmail = async (emailAddress) => {
    await app.emailPasswordAuth.sendResetPasswordEmail(emailAddress);
  };

  // The signOut function calls the logOut function on the currently
  // logged in user
  const signOut = () => {
    if (user == null) {
      console.log("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    setUser(null);
  };

  const signIn = async (email, password) => {
    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds);
    setUser(newUser);
    return newUser;
  };

  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
  const signUp = async (email, password) => {
    await app.emailPasswordAuth.registerUser({
      email,
      password,
    });
    console.log("user signed up");
    // signIn(email, password);
  };

  const setUsername = async (name) => {
    const userRealm = realmRef.current;
    const user = userRealm.objects("User")[0];

    await userRealm.write(() => (user.name = name));
  };

  const addToCart = async (productID, quantity) => {
    const userRealm = realmRef.current;
    const users = userRealm.objects("User");
    let indexOfItem = -1;
    const productList = users[0].cart;
    for (let x = 0; x < productList.length; x++) {
      if (productList[x]["productId"] === String(productID)) {
        indexOfItem = x;
      }
    }
    if (indexOfItem > -1) {
      await userRealm.write(() => {
        users[0].cart[indexOfItem]["qty"] =
          users[0].cart[indexOfItem]["qty"] + parseInt(quantity);
      });
    } else {
      SetCartSize(cartSize + 1);
      await userRealm.write(() => {
        users[0].cart.push({
          productId: String(productID),
          qty: parseInt(quantity),
        });
      });
    }
    // user.refreshCustomData();
  };

  const removeFromCart = async (product) => {
    const userRealm = realmRef.current;
    const user = userRealm.objects("User")[0];
    SetCartSize(cartSize - 1);
    await userRealm.write(() => {
      for (let products = 0; products < user.cart.length; products++) {
        if (user.cart[products]["productId"] === product) {
          user.cart.splice(products, 1);
          break;
        }
      }
    });
  };

  const undoAddCart = async (product) => {
    const userRealm = realmRef.current;
    const user = userRealm.objects("User")[0];
    await userRealm.write(() => {
      for (let products = 0; products < user.cart.length; products++) {
        if (user.cart[products]["productId"] === product) {
          user.cart.splice(products, 1);
          break;
        }
      }
    });
  };

  const updateQuantityCart = async (productID, operation, price) => {
    const userRealm = realmRef.current;
    const user = userRealm.objects("User")[0];
    let newQuantity = 0;
    let isValid = true;
    // console.log("Preseed");
    for (var items = 0; items < user.cart.length; items++) {
      if (user.cart[items]["productId"] === String(productID)) {
        newQuantity = operation
          ? user.cart[items]["qty"] + 1
          : user.cart[items]["qty"] > 1
          ? user.cart[items]["qty"] - 1
          : (isValid = false);
        break;
      }
    }
    if (isValid) {
      operation ? setTotal(total + price) : setTotal(total - price);
      // await userRealm.write(() => {
      //   user.cart.splice(items, 1);
      //   user.cart.push({
      //     productId: String(productID),
      //     qty: parseInt(newQuantity),
      //   });
      // });
      let newCart = user.cart.reduce((acc, curr, index) => {
        if (index !== items) {
          acc.push(curr);
        }
        return acc;
      }, []);
      newCart.splice(items, 0, {
        productId: String(productID),
        qty: parseInt(newQuantity),
      });

      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongo.db("tracker").collection("User");
      // console.log(collection);
      await collection.updateOne(
        { _id: app.currentUser.id }, // Query for the user object of the logged in user
        { $set: { cart: newCart } } // Set the logged in user's cart with new one
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        resetPass,
        deleteUser,
        passResetEmail,
        addToCart,
        removeFromCart,
        updateQuantityCart,
        SetCartSize,
        undoAddCart,
        setTotal,
        user,
        total,
        projectData, // list of projects the user is a cart
        cartSize,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};
export { AuthProvider, useAuth };
