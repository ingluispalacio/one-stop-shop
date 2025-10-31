import { SearchX } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ErrorPage404() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <SearchX className="w-24 h-24 text-blue-500" />
        </div>
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <p className="text-xl mb-4 font-medium">Página no encontrada</p>
        <p className="text-gray-600 mb-8">
          La página que buscas no existe o fue movida.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
        >
          Volver al inicio
        </button>
      </motion.div>
    </div>
  );
}
