import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ErrorPage401() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <Lock className="w-24 h-24 text-red-500" />
        </div>
        <h1 className="text-5xl font-bold mb-2">401</h1>
        <p className="text-xl mb-4 font-medium">Acceso no autorizado</p>
        <p className="text-gray-600 mb-8">
          No tienes permisos para acceder a esta página.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-2xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
        >
          Volver al inicio
        </button>
      </motion.div>
    </div>
  );
}
