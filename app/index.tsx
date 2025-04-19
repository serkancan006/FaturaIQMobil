import { AuthProvider } from "@/src/hooks/AuthContext";
import Router from "@/src/Router";

export default function Index() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}
