import { AlertCircle } from "lucide-react";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3 text-red-600">
      <AlertCircle className="w-8 h-8" />
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onRetry}
        className="mt-2 px-4 py-1 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Reintentar
      </button>
    </div>
  );
}