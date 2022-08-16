import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Order } from "../schemas";
import { useAuth } from "./AuthProvider";
import { ObjectId } from "bson";
import { useTasks } from "./TasksProvider";

const OrderContext = React.createContext(null);

const OrderProvider = ({ children, projectPartition }) => {
  const [orders, setOrders] = useState([]);
  const { user, userCart } = useAuth();
  const { tasks } = useTasks();
  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);
  //   console.log(user);
  useEffect(() => {
    console.log("Order Realm Opened");
    // Enables offline-first: opens a local realm immediately without waiting
    // for the download of a synchronized realm to be completed.
    const OpenRealmBehaviorConfiguration = {
      type: "openImmediately",
    };
    const config = {
      schema: [Order.schema, Order.Order_ItemsSchema],
      sync: {
        user: user,
        partitionValue: "admin",
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };
    // open a realm for this particular project
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;
      const syncTasks = projectRealm.objects("Order");
      setOrders([...syncTasks]);
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        // setOrders([]);
        console.log("Closing Order realm");
      }
    };
  }, [user, projectPartition]);

  const createOrder = (customerid, orderNumber, paymentMethod, total) => {
    const projectRealm = realmRef.current;
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    projectRealm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectRealm.create(
        "Order",
        new Order({
          id: new ObjectId(),
          partition: "admin", //Public Partition
          customerid: customerid,
          orderNumber: orderNumber,
          paymentMethod: paymentMethod,
          orderItems: userCart,
          orderTime: date + " " + time,
          orderStatus: "Processing",
          total: total,
        })
      );
    });
    const syncTasks = projectRealm.objects("Order");
    setOrders([...syncTasks]);
    console.log("Order Created");
  };

  const orderDetails = (orderItems) => {
    let c = [];
    for (let i = 0; i < orderItems.length; i++) {
      c.push([
        tasks.filter((item) => {
          return String(item._id) === orderItems[i].productId;
        })[0],
        orderItems[i].qty,
      ]);
    }
    return c;
  };

  const userOrders = (userId) => {
    let c = [];
    for (let order = 0; order < orders.length; order++) {
      if (orders[order].customerid === userId) {
        c.push(orders[order]);
      }
    }
    return c;
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <OrderContext.Provider
      value={{
        createOrder,
        orderDetails,
        userOrders,
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
