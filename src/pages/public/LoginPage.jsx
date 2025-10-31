import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Card from "../../components/ui/Card"
import Form from "../../components/shared/Form"
import { LogIn, ArrowLeft } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import toast from "react-hot-toast"

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();


    const fields = [
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
    ]

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const result = await login(values.email, values.password)

            if (result.success) {
                toast.success("Inicio de sesión exitoso")
                if (result.data.role === "admin") {
                    navigate("/admin")
                } else {
                    navigate("/")
                }
            } else {
                toast.error(result.message || "Error al iniciar sesión")
            }
        } catch (error) {
            toast.error(`Ocurrió un error inesperado. Detalle: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        navigate("/");
    }

    return (
        <div className=" flex items-center justify-center min-h-screen bg-linear-to-b from-lightblue-100 via-lightblue-200 to-lightblue-400 p-4">

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
                    className="shadow-xl backdrop-blur-md bg-white/80 border-lightblue-200"
                >
                    <div className="flex flex-col items-center mb-6">
                        <div className="flex bg-blue-500 text-white p-3 rounded-full mb-3 shadow-md">
                            <LogIn className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Bienvenido de nuevo
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Inicia sesión para continuar
                        </p>
                    </div>

                    <Form
                        fields={fields}
                        onSubmit={handleSubmit}
                        submitText={loading ? "Entrando..." : "Entrar"}
                        loading={loading}
                        gridColumsClass={"grid-cols-1"}
                    />

                    <div className="text-center text-sm text-gray-500 mt-4">
                        ¿No tienes una cuenta?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                        >
                            Regístrate aquí
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}
