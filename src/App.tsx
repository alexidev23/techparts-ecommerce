import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { AppProviders } from "@/app/providers";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </AuthProvider>
  );
}

export default App;
