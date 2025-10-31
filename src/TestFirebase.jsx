import { useEffect } from "react";
import { auth } from "./firebaseConfig";

export default function TestFirebase() {
  useEffect(() => {
    console.log("Firebase conectado:", auth.app.name);
  }, []);

  return <div className="text-center text-green-600 p-4">Firebase conectado ✅</div>;
}
