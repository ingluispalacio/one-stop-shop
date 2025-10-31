import { Toaster } from "react-hot-toast";
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#39b98e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#e53e3e',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}
