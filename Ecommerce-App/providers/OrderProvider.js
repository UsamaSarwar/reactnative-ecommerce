import React, { useContext, useState, useEffect, useRef } from "react";
import { add } from "react-native-reanimated";
import Realm from "realm";
import { Order } from "../schemas";
import { useAuth } from "./AuthProvider";

const OrderContext = React.createContext(null);

const OrderProvider = ({ children, projectPartition }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);
  //   console.log(user);
  useEffect(() => {
    console.log("Task Realm Opened");
    // Enables offline-first: opens a local realm immediately without waiting
    // for the download of a synchronized realm to be completed.
    const OpenRealmBehaviorConfiguration = {
      type: "openImmediately",
    };
    const config = {
      schema: [Order.schema],
      sync: {
        user: user,
        partitionValue: projectPartition,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };
    // open a realm for this particular project
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setOrders([]);
        console.log("Closing task realm");
      }
    };
  }, [user, projectPartition]);

  const createOrder = (
    orderNumber,
    name,
    phoneNumber,
    altPhoneNumber,
    country,
    province,
    city,
    address,
    postalCode,
    orderItems
  ) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectRealm.create(
        "Order",
        new Order({
          name: name || "New Order",
          partition: user._id, //Public Partition
          orderNumber: orderNumber,
          phoneNumber: phoneNumber,
          altPhoneNumber: altPhoneNumber,
          country: country,
          province: province,
          city: city,
          address: address,
          postalCode: postalCode,
          orderItems: orderItems,
        })
      );
    });
    console.log("Order Created");
  };

  // Define the function for deleting a task.
  const deleteOrder = (order) => {
    try {
      console.log("here");
      const projectRealm = realmRef.current;
      projectRealm.write(() => {
        projectRealm.delete(order);
      });
    } catch (e) {
      console.error(e);
    }
    // setTasks([...projectRealm.objects("Task").sorted("name")]);
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <OrderContext.Provider
      value={{
        createOrder,
        deleteOrder,
        orders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useOrder = () => {
  const order = useContext(OrderContext);
  if (order == null) {
    throw new Error("useOrder() called outside of a OrderProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return order;
};

export { OrderProvider, useOrder };
