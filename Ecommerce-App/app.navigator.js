import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import Forgotpass from "./screens/ForgetPassword";
import Homescreen from "./screens/HomeScreen";
import Updatepassword from "./screens/UpdatePassword";
import Deleteaccount from "./screens/DeleteAccount";
import Setting from "./screens/Setting";
import Cart from "./screens/Cart";
import Checkout from "./screens/CheckOut";
import OrderDetails from "./screens/OrderDetails";

import { useAuth } from "./providers/AuthProvider";
import { TasksProvider } from "./providers/TasksProvider";
import { GlobalProvider } from "./providers/GlobalProvider";
import { OrderProvider } from "./providers/OrderProvider";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth();
  // console.log(user);
  if (user) {
    return (
      <TasksProvider user={user} projectPartition={`project=${user.id}`}>
        <OrderProvider user={user} projectPartition={`project=${user.id}`}>
          <GlobalProvider>
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
                <Stack.Screen name="Deleteaccount" component={Deleteaccount} />
                <Stack.Screen name="Orderdetails" component={OrderDetails} />
              </Stack.Navigator>
            </NavigationContainer>
          </GlobalProvider>
        </OrderProvider>
      </TasksProvider>
    );
  } else {
    return (
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
          <Stack.Screen name="Updatepassword" component={Updatepassword} />
          <Stack.Screen name="Deleteaccount" component={Deleteaccount} />
          <Stack.Screen name="Orderdetails" component={OrderDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
