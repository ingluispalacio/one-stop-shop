import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftCircle, ImagePlus, X, Loader2 } from "lucide-react";

import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../api/firebase/services/productService";
import { getCategories } from "../../api/firebase/services/categoryService"; 
import LoadingState from "../../components/shared/LoadingState";
import ErrorState from "../../components/shared/ErrorState";

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isValidImageURL, setIsValidImageURL] = useState(false);

  // ✅ Validación del formulario
  const schema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    description: Yup.string().optional(),
    price: Yup.number()
      .typeError("Debe ser un número válido")
      .positive("Debe ser un valor positivo")
      .required("El precio es requerido"),
    stock: Yup.number()
      .typeError("Debe ser un número válido")
      .integer("Debe ser un número entero")
      .min(0, "No puede ser negativo")
      .required("El stock es requerido"),
    category_id: Yup.string().required("La categoría es requerida"),
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
      price: "",
      stock: "",
      category_id: "",
      imageUrl: "",
    },
  });

  const imageUrl = watch("imageUrl");

  useEffect(() => {
    loadCategories();

    if (id !== "new") {
      loadProductData(id);
    }
  }, [id]);

  const loadCategories = async () => {
    try {
      const resp = await getCategories(); 
      setCategories(resp?.data || []);
    } catch (err) {
      console.error("Error al cargar categorías", err);
      toast.error("Error al cargar las categorías");
    }
  };

  const loadProductData = async (productId) => {
    setIsLoadingProduct(true);
    try {
      const response = await getProductById(productId);
      if (response?.data) {
        reset({
          name: response.data.name || "",
          description: response.data.description || "",
          price: response.data.price || "",
          stock: response.data.stock || "",
          category_id: response.data.category_id || "",
          imageUrl: response.data.imageUrl || "",
        });
        setPreviewUrl(response.data.imageUrl || "");
      }
    } catch {
      toast.error("Error al cargar el producto");
      setError("No se pudo cargar el producto. Intenta nuevamente.");
    } finally {
      setIsLoadingProduct(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (id !== "new") {
        const resp = await updateProduct(id, data);
        toast.success(resp.message);
      } else {
        const resp = await createProduct(data);
        toast.success(resp.message);
      }
      navigate("/admin/products");
    } catch (error) {
      console.error("Error al guardar producto:", error);
      toast.error(`Error al guardar producto: ${error?.data?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/admin/products");
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
      setIsValidImageURL(true);
      toast.success("Vista previa cargada correctamente");
    };
    img.onerror = () => {
      toast.dismiss(id);
      setIsPreviewLoading(false);
      toast.error("Error al cargar la imagen");
    };
    img.src = url;
  };

  if (isLoadingProduct) {
    return <LoadingState message="Cargando producto..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => loadProductData(id)} />;
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
          {id === "new" ? "Crear Producto" : "Editar Producto"}
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

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* IMAGEN */}
        <motion.div
          className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-xl bg-gray-50"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full text-center mb-3">
            <p className="font-medium text-gray-600 mb-2">Imagen del Producto</p>
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
              className="w-68 h-68 object-cover rounded-xl shadow-md border border-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          ) : (
            <div className="w-68 h-68 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400 rounded-xl">
              <p>Sin imagen</p>
            </div>
          )}
        </motion.div>

        {/* FORMULARIO */}
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
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Descripción</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200 resize-none"
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Precio</label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    {...field}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
                  />
                )}
              />
              {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Stock</label>
              <Controller
                name="stock"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    {...field}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
                  />
                )}
              />
              {errors.stock && <p className="text-red-500 text-xs">{errors.stock.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Categoría</label>
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.category_id && (
              <p className="text-red-500 text-xs">{errors.category_id.message}</p>
            )}
          </div>

          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => <input type="hidden" {...field} value={imageUrl} />}
          />

          <div className="flex justify-end">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`font-medium px-4 py-2 text-white rounded-lg ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              } transition`}
            >
              {loading ? "Guardando..." : id === "new" ? "Crear Producto" : "Actualizar Producto"}
            </motion.button>
          </div>
        </motion.form>
      </div>

      {/* MODAL PARA URL */}
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

export default ProductFormPage;
