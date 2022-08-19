import React, { useContext, useState, useEffect, useRef } from "react";
import app from "../realmApp";
import Realm from "realm";
import { Order } from "../schemas";
import { useAuth } from "./AuthProvider";
import { ObjectId } from "bson";
import { useTasks } from "./TasksProvider";
import { useGlobal } from "./GlobalProvider";

const OrderContext = React.createContext(null);

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user, userCart } = useAuth();
  const [orderCategory, setOrderCategory] = useState("All");
  const { tasks } = useTasks();
  const { customer, setCustomer } = useGlobal();
  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

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
      let syncOrders = projectRealm.objects("Order");

      if (user.customData.userType === "normal") {
        syncOrders = syncOrders.filtered("customerid == $0", user.id);
      }

      setOrders([...syncOrders]);

      syncOrders.addListener(() => {
        setOrders([...syncOrders]);
      });
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setOrders([]);
        console.log("Closing Order realm");
      }
    };
  }, [user]);

  useEffect(() => {
    const projectRealm = realmRef.current;
    if (projectRealm) {
      let orders = projectRealm.objects("Order");
      if (orderCategory !== "All") {
        let filteredOrders = projectRealm.objects("Order").filter((item) => {
          return item.orderStatus === orderCategory;
        });
        console.log(filteredOrders.length);
        setOrders([...filteredOrders]);
      } else {
        orders = projectRealm.objects("Order");
        setOrders([...orders]);
      }
    }
  }, [orderCategory]);

  const createOrder = async (
    customerid,
    customerName,
    orderNumber,
    paymentMethod,
    total
  ) => {
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
    await projectRealm.write(() => {
      projectRealm.create(
        "Order",
        new Order({
          id: new ObjectId(),
          partition: "admin", //Public Partition
          customerid: customerid,
          customerName: customerName,
          orderNumber: orderNumber,
          paymentMethod: paymentMethod,
          orderItems: userCart,
          orderTime: date + " " + time,
          orderStatus: "Processing",
          total: total,
        })
      );
    });

    console.log;
    console.log("Order Created");
  };

  const updateStatus = (orderNumber, status) => {
    console.log("Updating Status");
    const orderRealm = realmRef.current;
    const order = orderRealm
      .objects("Order")
      .filtered("orderNumber == $0", orderNumber)[0];
    orderRealm.write(() => {
      order.orderStatus = status;
    });
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

  const getCustomerDetails = async (customerId) => {
    const mongo = app.currentUser.mongoClient("mongodb-atlas");
    const collection = mongo.db("tracker").collection("User");
    try {
      const getCustomer = await collection.findOne({
        _id: customerId,
      });
      setCustomer({ ...getCustomer });
      // console.log(getCustomer.name, customer.name);
      return getCustomer;
    } catch (e) {
      console.log(e);
    }
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <OrderContext.Provider
      value={{
        createOrder,
        orderDetails,
        setOrderCategory,
        getCustomerDetails,
        updateStatus,
        setCustomer,
        customer,
        orderCategory,
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
