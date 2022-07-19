import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
// import Realm from "realm";
import AppNavigator from "./app.navigator";
import { AuthProvider } from "./providers/AuthProvider";
// const app = new Realm.App({ id: "<your Realm app ID here>" });

import { useState } from "react";
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
