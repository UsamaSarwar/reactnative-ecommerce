import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Product } from "../schemas";
import { useAuth } from "./AuthProvider";

const ProductsContext = React.createContext(null);

const ProductsProvider = ({ children, userPartition }) => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

  useEffect(() => {
    // Enables offline-first: opens a local realm immediately without waiting
    // for the download of a synchronized realm to be completed.
    const OpenRealmBehaviorConfiguration = {
      type: "openImmediately",
    };
    const config = {
      schema: [Product.schema],
      sync: {
        user: user,
        partitionValue: userPartition,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };
    // open a realm for this particular project
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;

      const syncProducts = projectRealm.objects("Task");
      let sortedProducts = syncProducts.sorted("name");
      setProducts([...sortedProducts]);
      sortedProducts.addListener(() => {
        setProducts([...sortedProducts]);
      });
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setProducts([]);
      }
    };
  }, [user, userPartition]);

  const createProduct = (newProductName) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectRealm.create(
        "Product",
        new Product({
          name: newProductName || "New Task",
          partition: userPartition,
        })
      );
    });
  };

  // const setProductstatus = (task, status) => {
  //   // One advantage of centralizing the realm functionality in this provider is
  //   // that we can check to make sure a valid status was passed in here.
  //   if (
  //     ![
  //       Task.STATUS_OPEN,
  //       Task.STATUS_IN_PROGRESS,
  //       Task.STATUS_COMPLETE,
  //     ].includes(status)
  //   ) {
  //     throw new Error(`Invalid status: ${status}`);
  //   }
  //   const projectRealm = realmRef.current;

  //   projectRealm.write(() => {
  //     task.status = status;
  //   });
  // };

  // Define the function for deleting a task.
  // const deleteTask = (task) => {
  //   const projectRealm = realmRef.current;
  //   projectRealm.write(() => {
  //     projectRealm.delete(task);
  //     setProducts([...projectRealm.objects("Task").sorted("name")]);
  //   });
  // };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <ProductsContext.Provider
      value={{
        createProduct,
        products,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useProducts = () => {
  const product = useContext(ProductsContext);
  if (product == null) {
    throw new Error("useTasks() called outside of a TasksProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return product;
};

export { ProductsProvider, useProducts };
