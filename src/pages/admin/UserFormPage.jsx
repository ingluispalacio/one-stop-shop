import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getRoles } from "../../api/firebase/services/roleService";
import { createUser, getUserById, updateUser } from "../../api/firebase/services/userService";
import ErrorState from "../../components/shared/ErrorState";
import LoadingState from "../../components/shared/LoadingState";

const UserFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const [isLoadingRoles, setIsLoadingRoles] = useState(false);
    const [error, setError] = useState(null);

    const schema = Yup.object().shape({
        f_name: Yup.string().required("El primer nombre es requerido"),
        s_name: Yup.string().optional(),
        f_lastname: Yup.string().required("El primer apellido es requerido"),
        s_lastname: Yup.string().optional(),
        email: Yup.string().email("Correo inválido").required("El correo es requerido"),
        password:
            id === "new"
                ? Yup.string().required("La contraseña es requerida").min(6, "Mínimo 6 caracteres")
                : Yup.string().nullable(),
        confirmPassword:
            id === "new"
                ? Yup.string()
                    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
                    .required("Confirme la contraseña")
                : Yup.string().nullable(),
        role: Yup.string().required("El rol es requerido"),
    });

    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            f_name: "",
            s_name: "",
            f_lastname: "",
            s_lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
        },
    });

    const selectedRole = watch("role");

    useEffect(() => {
        fetchRoles();
        if (id !== "new") {
            loadUserData(id);
        }
    }, [id]);

    const fetchRoles = async () => {
        setIsLoadingRoles(true)
        try {
            const response = await getRoles();
            setRoles(response.data || []);
        } catch {
            toast.error("Error al cargar los roles");
        } finally {
            setIsLoadingRoles(false);
        }
    };


    const loadUserData = async (userId) => {
        setIsLoadingUser(true);
        try {
            const response = await getUserById(userId);
            if (response?.data) {
                reset({
                    f_name: response.data.f_name || "",
                    s_name: response.data.s_name || "",
                    f_lastname: response.data.f_lastname || "",
                    s_lastname: response.data.s_lastname || "",
                    email: response.data.email || "",
                    password: "",
                    role: response.data.role || "",
                });
            }
        } catch {
            toast.error("Error al cargar el usuario");
            setError("No se pudieron cargar el usuario. Intenta nuevamente.");
        } finally {
            setIsLoadingUser(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const { confirmPassword, ...userData } = data;

            if (id !== "new") {
                const resp = await updateUser(id, userData);
                toast.success(resp.data.message);
            } else {
                const resp = await createUser(userData);
                toast.success(resp.data.message);
            }

            navigate("/admin/users");
        } catch (error) {
            console.error("Error al guardar usuario:", error.data);
            toast.error(`Error al guardar datos del usuario: ${error?.data?.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate("/admin/users");
    };

    if (isLoadingUser || isLoadingRoles) {
        return (
            <LoadingState message="Cargando datos..." />
        );
    }

    if (error) {
        return (
            <ErrorState message={error} onRetry={fetchRoles} />
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <Toaster position="top-right" />

            <motion.div
                className="flex justify-around items-center px-20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-3xl font-semibold mb-4 text-center">
                    {id === "new" ? "Crear Usuario" : "Editar Usuario"}
                </h1>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleGoBack}
                    className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-gray-300 text-gray-500  font-semibold rounded-lg shadow-md hover:bg-gray-400 hover:text-white transition duration-200"
                >
                    <ArrowLeftCircle size={20} />
                    Volver
                </motion.button>
            </motion.div>

            <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Primer Nombre</label>
                        <Controller
                            name="f_name"
                            control={control}
                            render={({ field }) => <input {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200" />}
                        />
                        {errors.f_name && <p className="text-red-500 text-xs">{errors.f_name.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium">Segundo Nombre</label>
                        <Controller
                            name="s_name"
                            control={control}
                            render={({ field }) => <input {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200" />}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Primer Apellido</label>
                        <Controller
                            name="f_lastname"
                            control={control}
                            render={({ field }) => <input {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200" />}
                        />
                        {errors.f_lastname && <p className="text-red-500 text-xs">{errors.f_lastname.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium">Segundo Apellido</label>
                        <Controller
                            name="s_lastname"
                            control={control}
                            render={({ field }) => <input {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200" />}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-sm font-medium">Correo</label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <input type="email" {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200" />
                            )}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                    {id === "new" && (
                        <>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium">Contraseña</label>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <input type="password" {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200" />
                                    )}
                                />
                                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium">Confirmar Contraseña</label>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <input type="password" {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200" />
                                    )}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
                            </div>
                        </>

                    )}


                    <div>
                        <label className="text-sm font-medium">Rol</label>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <select {...field} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200">
                                    <option value="">Seleccione un rol</option>
                                    {roles.map((r) => (
                                        <option key={r.id} value={r.name}>
                                            {r.title}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                        {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
                    </div>



                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {loading ? "Guardando..." : id === "new" ? "Crear Usuario" : "Actualizar Usuario"}
                        </button>
                    </div>
                </form>
            </div>

        </div>

    );
};

export default UserFormPage;
