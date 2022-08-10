import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Task } from "../schemas";
import { useAuth } from "./AuthProvider";
import { ObjectId } from "bson";
import { set } from "react-native-reanimated";

const TasksContext = React.createContext(null);

const TasksProvider = ({ children, projectPartition }) => {
  const { user, userCart } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);
  console.log(user);
  useEffect(() => {
    console.log("Task Realm Opened");
    // Enables offline-first: opens a local realm immediately without waiting
    // for the download of a synchronized realm to be completed.
    const OpenRealmBehaviorConfiguration = {
      type: "openImmediately",
    };
    const config = {
      schema: [Task.schema],
      sync: {
        user: user,
        partitionValue: "project=62d9368379c1a7aeb844d2a2",
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };
    // open a realm for this particular project
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;

      const syncTasks = projectRealm.objects("Task");
      let sortedTasks = syncTasks.sorted("name");
      setTasks([...sortedTasks]);
      sortedTasks.addListener(() => {
        setTasks([...sortedTasks]);
      });
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setTasks([]);
        console.log("Closing task realm");
      }
    };
  }, [user, projectPartition]);

  const createTask = (
    newTaskName,
    category,
    price,
    description,
    image,
    imageForm
  ) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectRealm.create(
        "Task",
        new Task({
          name: newTaskName || "New Task",
          partition: "project=62d9368379c1a7aeb844d2a2", //Public Partition
          category: category,
          price: price,
          description: description,
          image: image,
          imageForm: imageForm,
        })
      );
    });
    console.log("Task Created");
  };

  const updateTask = (
    task,
    prodName,
    category,
    price,
    description,
    image,
    imageForm
  ) => {
    const projectRealm = realmRef.current;
    console.log(projectRealm);

    projectRealm.write(() => {
      task.name = prodName;
      task.category = category;
      task.price = price;
      task.description = description;
      task.image = image;
      task.imageForm = imageForm;
    });
  };

  // Define the function for deleting a task.
  const deleteTask = (task) => {
    try {
      console.log("here");
      const projectRealm = realmRef.current;
      projectRealm.write(() => {
        projectRealm.delete(task);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const cartDetails = () => {
    const products = realmRef.current.objects("Task");

    const c = [];
    let newTotal = 0;

    for (let i = 0; i < userCart.length; i++) {
      const id = ObjectId(userCart[i]["productId"]);
      c.push([products.filtered("_id == $0", id)[0], userCart[i]["qty"]]);
      newTotal +=
        Number(products.filtered("_id == $0", id)[0].price) *
        userCart[i]["qty"];
    }

    setShoppingCart(c);
    setCartTotal(newTotal);
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <TasksContext.Provider
      value={{
        createTask,
        deleteTask,
        updateTask,
        cartDetails,
        shoppingCart,
        cartTotal,
        tasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useTasks = () => {
  const task = useContext(TasksContext);
  if (task == null) {
    throw new Error("useTasks() called outside of a TasksProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return task;
};

export { TasksProvider, useTasks };
