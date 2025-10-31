import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";

/**
 * Form genérico reutilizable
 *
 * Props:
 * - title?: string → título del formulario
 * - fields: [
 *     {
 *       name: string,           // nombre del campo (clave)
 *       label: string,          // etiqueta visible
 *       type?: "text" | "email" | "password" | "number" | "select" | "file",
 *       placeholder?: string,
 *       options?: [{ label, value }]  // solo si type = "select"
 *       required?: boolean,
 *       defaultValue?: any
 *     }
 *   ]
 * - onSubmit: (formData) => void  // función callback al enviar
 * - submitText?: string → texto del botón (por defecto: "Guardar")
 * - loading?: boolean
 */

export default function Form({
  title,
  fields = [],
  onSubmit,
  submitText = "Guardar",
  loading = false,
  gridColumsClass = "grid-cols-1 md:grid-cols-2 gap-4",
}) {
  const initialState = fields.reduce((acc, f) => {
    acc[f.name] = f.defaultValue || "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach((f) => {
      if (f.required && !formData[f.name]) {
        newErrors[f.name] = "Este campo es obligatorio";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-w-100 space-y-5 p-4"
    >
      {title && (
        <h2 className="text-xl text-center font-semibold text-gray-800  pb-2 mb-4">
          {title}
        </h2>
      )}

      <div className={`grid ${gridColumsClass}`}>
        {fields.map((f) => (
          <div key={f.name} className="flex flex-col">
            {f.type === "select" ? (
              <Select
                label={f.label}
                value={formData[f.name]}
                onChange={(e) => handleChange(f.name, e.target.value)}
                options={f.options || []}
                error={errors[f.name]}
              />
            ) : (
              <Input
                type={f.type || "text"}
                label={f.label}
                placeholder={f.placeholder || ""}
                value={formData[f.name]}
                onChange={(e) => handleChange(f.name, e.target.value)}
                error={errors[f.name]}
              />
            )}
          </div>
        ))}
      </div>

      <div className="pt-4  flex justify-end">
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="px-6 cursor-pointer"
        >
          {loading ? "Guardando..." : submitText}
        </Button>
      </div>
    </form>
  );
}
