import { cn } from "../../lib/utils";

/**
 * Props:
 *  - label?: string
 *  - error?: string
 *  - options: [{ value, label }]
 *  - placeholder?: string
 *  - value, onChange, disabled, className, ...props
 */
export default function Select({
  label,
  error,
  options = [],
  placeholder = "Seleccionar...",
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <select
        {...props}
        className={cn(
          "w-full px-3 py-2 rounded-lg border bg-white text-gray-700 text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500",
          error ? "border-red-500" : "border-gray-300",
          props.disabled && "bg-gray-100 cursor-not-allowed opacity-75",
          className
        )}
      >
       {placeholder && <option value="">{placeholder}</option> } 
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}