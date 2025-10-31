import { cn } from "../../lib/utils";

/**
 * Props:
 *  - label?: string
 *  - error?: string
 *  - ...input props
 */
export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        {...props}
        className={cn(
          "w-full px-3 py-2 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-500",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}