import { AuthProvider } from "@/src/hooks/AuthContext";
import Router from "@/src/Router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

export default function Index() {
  return (
    <>
      <AuthProvider>
        <GestureHandlerRootView>
          <PaperProvider>
            <Router />
          </PaperProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </>
  );
}
