import { useState } from "react";
import { ShoppingCart, Eye, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useCart();
  const isAdded = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!isAdded) addToCart(product, quantity);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 w-64"
    >
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-cover"
        />
      </div>

      <div className="p-3 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h3 className="text-gray-800 font-semibold text-sm truncate">
              {product.name}
            </h3>
            <span className="bg-gray-200 text-gray-900 text-[9px] font-semibold px-3 py-1 rounded-full shadow">
              {product.category}
            </span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-bold text-gray-900">${product.price}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="cursor-pointer px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="cursor-pointer px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-md shadow transition text-white
              ${
                isAdded
                  ? "bg-green-500"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              }`}
          >
            {isAdded ? (
              <>
                <Check size={16} /> Añadido
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> Añadir
              </>
            )}
          </button>

          <Link
            to={`/products/details/${product.id}`}
            className="cursor-pointer flex items-center gap-1 border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-md transition"
          >
            <Eye size={16} /> Ver
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
