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

import { AuthProvider } from "./providers/AuthProvider";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <AuthProvider>
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
          <Stack.Screen name="Updatepassword" component={Updatepassword} />
          <Stack.Screen name="Deleteaccount" component={Deleteaccount} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
