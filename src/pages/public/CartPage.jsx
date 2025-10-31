import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, addToCart } = useCart();

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      addToCart(item, -1);
    } else {
      removeFromCart(item.id);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="pt-24 pb-10 px-[5%] min-h-screen bg-gray-50"
    >
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between border-b border-gray-400 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            Tu Carrito
          </h1>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="cursor-pointer text-sm text-red-500 hover:text-red-600 transition flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" /> Vaciar carrito
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-6">
              Tu carrito está vacío. Empieza a agregar productos 🛍️
            </p>
            <Link
              to="/products"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Ir a Productos
            </Link>
          </div>
        ) : (
          <>
            {/* Lista de productos */}
            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                    />
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-blue-600 font-semibold">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Cantidad y acciones */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-full">
                      <button
                        onClick={() => handleDecrease(item)}
                        className="p-1 hover:bg-gray-200 rounded-full transition cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="p-1 hover:bg-gray-200 rounded-full transition cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 transition cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-gray-400 mt-8 pt-6 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Total:{" "}
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </h3>

              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                Proceder al pago
              </button>
            </div>
          </>
        )}
      </div>
    </motion.section>
  );
}
