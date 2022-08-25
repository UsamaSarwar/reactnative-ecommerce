import AppNavigator from "./app.navigator";
import { AuthProvider } from "./src/providers/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
