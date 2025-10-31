import { cn } from "../../lib/utils";

/**
 * Props:
 *  - variant: "primary" | "secondary" | "danger"
 *  - isLoading: boolean
 *  - children, className, ...props
 */
export default function Button({ variant = "primary", isLoading = false, className = "", children, ...props }) {
  const base = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  return (
    <button
      {...props}
      className={ `${cn(base, variants[variant], className)} cursor-pointer`}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Cargando...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
