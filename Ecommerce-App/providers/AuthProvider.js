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
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
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
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };

    // Open a realm with the logged in user's partition value in order
    // to get the projects that the logged in user is a member of
    Realm.open(config).then((userRealm) => {
      realmRef.current = userRealm;
      const users = userRealm.objects("User");
      users.addListener(() => {
        // The user custom data object may not have been loaded on
        // the server side yet when a user is first registered.
        if (users.length === 0) {
          setProjectData([myProject]);
        } else {
          // console.log("hello");
          const { memberOf } = users[0];
          setProjectData([...memberOf]);
        }
      });
    });
    // TODO: Return a cleanup function that closes the user realm.
    // console.log("Is this the error?");
    return () => {
      // cleanup function
      const userRealm = realmRef.current;
      if (userRealm) {
        userRealm.close();
        realmRef.current = null;
        setProductData([]);
        setProjectData([]); // set project data to an empty array (this prevents the array from staying in state on logout)
      }
      // Realm.close();
    };
  }, [user]);

  // The signIn function takes an email and password and uses the
  // emailPassword authentication provider to log in.
  const signIn = async (email, password) => {
    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds);
    setUser(newUser);
    return newUser;
  };
  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
  const signUp = async (email, password) => {
    await app.emailPasswordAuth.registerUser({ email, password });
  };

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
  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        resetPass,
        deleteUser,
        passResetEmail,
        user,
        productData,
        projectData, // list of projects the user is a memberOf
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
