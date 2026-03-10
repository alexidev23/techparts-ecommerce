import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { AppProviders } from "@/app/providers";
import { AuthProvider } from "./context/AuthContext";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <AppProviders>
          <RouterProvider router={router} />
        </AppProviders>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
