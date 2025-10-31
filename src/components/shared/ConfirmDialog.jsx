import { motion, AnimatePresence } from "framer-motion";

const ConfirmDialog = ({ title, description, isOpen, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-xl font-semibold mb-3">{title}</h2>
            <p className="text-gray-600 mb-6">{description}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={onCancel}
                className="cursor-pointer px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="cursor-pointer px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Confirmar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
