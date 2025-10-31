import { Link, NavLink } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart(); 

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: "Productos", path: "/products" },
    { name: "Nosotros", path: "/aboutus" },
    { name: "Contáctenos", path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md fixed top-0 z-50 px-[5%] w-full">
      <div className="flex items-center justify-between p-4">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 flex items-center gap-2"
        >
          <motion.img
            src="/images/isotipo.png"
            alt="isotipo logo"
            className="w-6 h-6"
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-lg font-bold text-blue-600 whitespace-nowrap"
          >
            <span className="text-gray-400">One</span>
            <span className="text-gray-800">Stop</span>Shop
          </motion.span>
        </Link>

        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2 w-1/3">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="bg-transparent outline-none w-full ml-2 text-sm"
          />
        </div>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors relative group ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "hover:text-blue-600 text-gray-700"
                  }`
                }
              >
                {link.name}
                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 w-0 group-hover:w-full"
                />
              </NavLink>
            ))}
          </nav>

          <div className="flex justify-center items-center gap-4">
            <Link
              to="/cart"
              className="relative hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-blue-600 hover:text-blue-700 font-bold transition outline-none cursor-pointer"
                >
                  <UserCheck className="w-6 h-6 transition" />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-48 border border-gray-100"
                    >
                      <div className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700">
                        Hola,
                        <span className="font-semibold text-blue-600">
                          {user.displayName || user.email}
                        </span>
                      </div>
                      <div className="border-t border-gray-100 my-2"></div>
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                          <LayoutDashboard className="w-4 h-4" /> Panel
                          administrativo
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" /> Cerrar sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-gray-700 hover:text-blue-600 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-sm"
          >
            <ul className="flex flex-col items-center py-3 gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
