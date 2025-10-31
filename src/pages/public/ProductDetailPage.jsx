import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useEffect, useState, useMemo } from "react";
import { getProductById, getProductsByCategory } from "../../api/firebase/services/productService";
import LoadingState from "../../components/shared/LoadingState";
import { useFetchCollection } from "../../hooks/useFetchCollection";
import ErrorState from "../../components/shared/ErrorState";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [errorProduct, setErrorProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProductById(id);
        if (!res?.data) throw new Error("Producto no encontrado");
        setProduct(res.data);
      } catch (err) {
        setErrorProduct(err.message || "Error al cargar el producto");
      } finally {
        setLoadingProduct(false);
      }
    })();
  }, [id]);

  const fetchRelated = useMemo(() => {
    if (!product) return null;
    return () => getProductsByCategory(product.category_id, id);
  }, [product, id]);

  const {
    data: relatedProducts,
    isLoading: loadingRelated,
    error: errorRelated,
    refetch: refetchRelated,
  } = useFetchCollection(fetchRelated ?? (() => Promise.resolve({ success: true, data: [] })), [fetchRelated]);

  if (loadingProduct) return <LoadingState message="Cargando producto..." />;
  if (errorProduct)
    return (
      <ErrorState
        message={errorProduct}
        onRetry={() => window.location.reload()}
        actionText="Volver a intentar"
      />
    );

  const isAdded = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!isAdded) addToCart(product, quantity);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-linear-to-b from-blue-50 to-white pt-24 pb-16 px-[7%]"
    >
      <div className="flex flex-col md:flex-row gap-12">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="md:w-1/2 flex flex-col items-center"
        >
          <motion.img
            key={product.id}
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-w-md h-[420px] rounded-2xl shadow-lg object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="md:w-1/2 space-y-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center cursor-pointer gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-5 h-5" /> Volver
          </button>

          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-blue-600 font-medium">{product.category}</p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>

            <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-full">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-1 hover:bg-gray-200 rounded-full transition"
              >
                <Minus size={16} />
              </button>
              <span className="font-semibold text-gray-800">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-1 hover:bg-gray-200 rounded-full transition"
              >
                <Plus size={16} />
              </button>
            </div>

            <motion.button
              whileHover={!isAdded ? { scale: 1.05 }: { scale: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={`flex items-center px-6 py-3 gap-2 text-white rounded-full ${isAdded
                  ? "bg-green-500"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                } transition`}
            >
              {isAdded ? (
                <>
                  <Check size={16} /> Añadido al carrito
                </>
              ) : (
                <>
                  <ShoppingCart size={16} /> Añadir al carrito
                </>
              )}
            </motion.button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Información adicional</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Producto artesanal elaborado con ingredientes naturales.</li>
              <li>Disponible en presentaciones de 120ml y 250ml.</li>
              <li>Conservar entre -18°C y -22°C.</li>
            </ul>
          </div>
        </motion.div>
      </div>


      {loadingRelated && <LoadingState message="Cargando productos relacionados..." />}
      {errorRelated && <ErrorState message={errorRelated} onRetry={refetchRelated} />}

      {!loadingRelated && !errorRelated && relatedProducts.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ scale: 1.05, rotate: 0.3 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-xl transition"
                onClick={() => navigate(`/products/details/${item.id}`)}
              >
                <motion.img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-blue-600 font-medium">${Number(item.price).toFixed(2)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
