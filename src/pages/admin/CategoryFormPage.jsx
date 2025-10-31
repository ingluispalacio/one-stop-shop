import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftCircle, ImagePlus, X, Loader2 } from "lucide-react";
import {
    createCategory,
    getCategoryById,
    updateCategory,
} from "../../api/firebase/services/categoryService";
import LoadingState from "../../components/shared/LoadingState";
import ErrorState from "../../components/shared/ErrorState";

const CategoryFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isLoadingCategory, setIsLoadingCategory] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const [isValidImageURL, setIsValidImageURL] = useState(false);

    const schema = Yup.object().shape({
        name: Yup.string().required("El nombre es requerido"),
        description: Yup.string().optional(),
        imageUrl: Yup.string().url("Debe ser una URL válida").required("La imagen es requerida"),
    });

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            description: "",
            imageUrl: "",
        },
    });

    const imageUrl = watch("imageUrl");

    useEffect(() => {
        if (id !== "new") {
            loadCategoryData(id);
        }
    }, [id]);

    const loadCategoryData = async (categoryId) => {
        setIsLoadingCategory(true);
        try {
            const response = await getCategoryById(categoryId);
            if (response?.data) {
                reset({
                    name: response.data.name || "",
                    description: response.data.description || "",
                    imageUrl: response.data.imageUrl || "",
                });
                setPreviewUrl(response.data.imageUrl || "");
            }
        } catch {
            toast.error("Error al cargar la categoría");
            setError("No se pudo cargar la categoría. Intenta nuevamente.");
        } finally {
            setIsLoadingCategory(false);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (id !== "new") {
                const resp = await updateCategory(id, data);
                toast.success(resp.message);
            } else {
                const resp = await createCategory(data);
                toast.success(resp.message);
            }
            navigate("/admin/categories");
        } catch (error) {
            console.error("Error al guardar categoría:", error);
            toast.error(`Error al guardar categoría: ${error?.data?.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate("/admin/categories");
    };

    const handlePreview = () => {
        const url = watch("imageUrl")?.trim();
        if (!url) {
            toast.error("Por favor ingresa una URL válida");
            return;
        }

        setIsPreviewLoading(true);
        setShowModal(false);

        const id = toast.loading("Cargando vista previa...");

        const img = new Image();
        img.onload = () => {
            setPreviewUrl(url);
            toast.dismiss(id);
            setIsPreviewLoading(false);
            toast.success("Vista previa cargada correctamente");
            setIsValidImageURL(true)
        };
        img.onerror = () => {
            toast.dismiss(id);
            setIsPreviewLoading(false);
            toast.error("Error al cargar la imagen");
        };
        img.src = url;
    };

    if (isLoadingCategory) {
        return <LoadingState message="Cargando categoría..." />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={() => loadCategoryData(id)} />;
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
                    {id === "new" ? "Crear Categoría" : "Editar Categoría"}
                </h1>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleGoBack}
                    className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-gray-300 text-gray-600 font-semibold rounded-lg shadow-md hover:bg-gray-400 hover:text-white transition duration-200"
                >
                    <ArrowLeftCircle size={20} />
                    Volver
                </motion.button>
            </motion.div>

            <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-xl bg-gray-50"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="w-full text-center mb-3">
                        <p className="font-medium text-gray-600 mb-2">Imagen de la Categoría</p>
                        <button
                            onClick={() => setShowModal(true)}
                            type="button"
                            disabled={isPreviewLoading}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow transition ${
                                isPreviewLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                            }`}
                        >
                            {isPreviewLoading ? (
                                <>
                                    <Loader2 className="animate-spin w-4 h-4" />
                                    Cargando...
                                </>
                            ) : (
                                <>
                                    <ImagePlus size={18} />
                                    {id === "new" && !isValidImageURL ? "Asignar URL" : "Cambiar URL"}
                                </>
                            )}
                        </button>
                    </div>

                    {previewUrl ? (
                        <motion.img
                            key={previewUrl}
                            src={previewUrl}
                            alt="Vista previa"
                            className="w-48 h-48 object-cover rounded-xl shadow-md border border-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />
                    ) : (
                        <div className="w-48 h-48 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400 rounded-xl">
                            <p>Sin imagen</p>
                        </div>
                    )}
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div>
                        <label className="text-sm font-medium">Nombre</label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium">Descripción</label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200 resize-none"
                                />
                            )}
                        />
                    </div>

                    <Controller
                        name="imageUrl"
                        control={control}
                        render={({ field }) => (
                            <input type="hidden" {...field} value={imageUrl} />
                        )}
                    />

                    <div className="flex justify-end">
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                            {loading
                                ? "Guardando..."
                                : id === "new"
                                ? "Crear Categoría"
                                : "Actualizar Categoría"}
                        </motion.button>
                    </div>
                </motion.form>
            </div>

            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md relative"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-lg font-semibold mb-3 text-center">Asignar URL de Imagen</h2>

                            <Controller
                                name="imageUrl"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="url"
                                        placeholder="https://example.com/imagen.jpg"
                                        className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring focus:ring-blue-200"
                                    />
                                )}
                            />
                            {errors.imageUrl && (
                                <p className="text-red-500 text-xs">{errors.imageUrl.message}</p>
                            )}

                            <div className="flex justify-between gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="w-1/2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    onClick={handlePreview}
                                    disabled={isPreviewLoading}
                                    className={`w-1/2 px-4 py-2 rounded-lg transition ${
                                        isPreviewLoading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                                    }`}
                                >
                                    {isPreviewLoading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="animate-spin w-4 h-4" />
                                            Cargando...
                                        </div>
                                    ) : (
                                        "Vista previa"
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CategoryFormPage;
