import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../../components/ui/Card";
import Form from "../../components/shared/Form";
import { ArrowLeft, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const fields = [
    {
      label: "Primer nombre",
      name: "f_name",
      type: "text",
      placeholder: "Ej: Juan",
      required: true,
    },
    {
      label: "Segundo nombre",
      name: "s_name",
      type: "text",
      placeholder: "Ej: Carlos",
      required: false,
    },
    {
      label: "Primer apellido",
      name: "f_lastname",
      type: "text",
      placeholder: "Ej: Pérez",
      required: true,
    },
    {
      label: "Segundo apellido",
      name: "s_lastname",
      type: "text",
      placeholder: "Ej: Gómez",
      required: false,
    },
    {
      label: "Correo electrónico",
      name: "email",
      type: "email",
      placeholder: "usuario@correo.com",
      required: true,
    },
    {
      label: "Contraseña",
      name: "password",
      type: "password",
      placeholder: "••••••••",
      required: true,
    },
    {
      label: "Confirmar contraseña",
      name: "confirmPassword",
      type: "password",
      placeholder: "••••••••",
      required: true,
    },
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    const {password, confirmPassword, email, ...rest } = values;

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const response = await register(
        email,
        password,
        rest
      );
      if (response.success) {
        toast.success(response.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen from-blue-100 via-blue-200 to-blue-400 p-4">
      <motion.button
        onClick={handleBack}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="cursor-pointer absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-blue-600 bg-white/60 backdrop-blur-md px-3 py-2 rounded-full shadow-md hover:shadow-lg transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Volver a la tienda</span>
      </motion.button>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full mx-2 max-w-xs md:max-w-md md:mx-0"
      >
        <Card
          hoverable={false}
          className="shadow-xl backdrop-blur-md bg-white/80 border-blue-200"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="flex bg-blue-500 text-white p-3 rounded-full mb-3">
              <UserPlus className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Crear una cuenta
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Regístrate para comenzar
            </p>
          </div>

          <Form
            fields={fields}
            onSubmit={handleSubmit}
            submitText={loading ? "Registrando..." : "Registrarme"}
            loading={loading}
            gridColumsClass={"grid-cols-2 gap-4"}
          />

          <div className="text-center text-sm text-gray-500 mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Inicia sesión aquí
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
