import { Loader2 } from "lucide-react";

export default function LoadingState({ message, classNameContainer="flex flex-col items-center justify-center h-64 gap-3 text-gray-600" }) {
  return (
    <div className={classNameContainer}>
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}