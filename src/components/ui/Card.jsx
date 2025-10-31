import { cn } from "../../lib/utils";

/**
 * Card genérico reutilizable
 *
 * Props:
 * - title?: string → título del card
 * - description?: string → texto corto debajo del título
 * - children: contenido del card
 * - footer?: ReactNode → contenido opcional al final (botones, enlaces, etc.)
 * - className?: string → estilos adicionales
 * - hoverable?: boolean → si debe tener animación hover
 */

export default function Card({
  title,
  description,
  children,
  footer,
  className = "",
  hoverable = true,
}) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-gray-200 shadow-sm p-5 transition-all duration-300",
        hoverable && "hover:shadow-md hover:border-blue-300 hover:-translate-y-1",
        className
      )}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-500 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="text-gray-700">{children}</div>

      {footer && (
        <div className="pt-4 mt-4 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
}
