import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./src/screens/Login";
import Signup from "./src/screens/SignUp";
import Forgotpass from "./src/screens/ForgetPassword";
import Homescreen from "./src/screens/HomeScreen";
import Updatepassword from "./src/screens/UpdatePassword";
import Deleteaccount from "./src/screens/DeleteAccount";
import Setting from "./src/screens/Setting";
import Cart from "./src/screens/Cart";
import Checkout from "./src/screens/CheckOut";
import PersonalDetails from "./src/screens/PersonalDetails";
import MyOrders from "./src/screens/MyOrders";
import WishListScreen from "./src/screens/WishListScreen";

import { useAuth } from "./src/providers/AuthProvider";
import { TasksProvider } from "./src/providers/TasksProvider";
import { GlobalProvider } from "./src/providers/GlobalProvider";
import { OrderProvider } from "./src/providers/OrderProvider";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth();

  if (user) {
    return (
      <TasksProvider user={user} projectPartition={`project=${user.id}`}>
        <GlobalProvider>
          <OrderProvider user={user}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Login"
              >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Forgotpass" component={Forgotpass} />
                <Stack.Screen name="Homescreen" component={Homescreen} />
                <Stack.Screen name="Setting" component={Setting} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen
                  name="Updatepassword"
                  component={Updatepassword}
                />
                <Stack.Screen name="Checkout" component={Checkout} />
                <Stack.Screen name="Myorders" component={MyOrders} />
                <Stack.Screen name="Deleteaccount" component={Deleteaccount} />
                <Stack.Screen
                  name="WishlistScreen"
                  component={WishListScreen}
                />
                <Stack.Screen
                  name="Personaldetails"
                  component={PersonalDetails}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </OrderProvider>
        </GlobalProvider>
      </TasksProvider>
    );
  } else {
    return (
      <NavigationContainer>
        <GlobalProvider>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Login"
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Forgotpass" component={Forgotpass} />
            <Stack.Screen name="Homescreen" component={Homescreen} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Updatepassword" component={Updatepassword} />
            <Stack.Screen name="Deleteaccount" component={Deleteaccount} />
            <Stack.Screen name="Myorders" component={MyOrders} />
            <Stack.Screen name="Personaldetails" component={PersonalDetails} />
            <Stack.Screen name="WishlistScreen" component={WishListScreen} />
          </Stack.Navigator>
        </GlobalProvider>
      </NavigationContainer>
    );
  }
}
