import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import Forgotpass from "./screens/ForgetPassword";
import Homescreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen
          name="Login"
          component={Login}
          initialParams={{ paramKey: { admin: "admin" } }}
        />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Forgotpass" component={Forgotpass} />
        <Stack.Screen name="Homescreen" component={Homescreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
