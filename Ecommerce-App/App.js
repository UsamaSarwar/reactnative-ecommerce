import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";

import AppNavigator from "./app.navigator";
import { AuthProvider } from "./providers/AuthProvider";

import { useState } from "react";
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
