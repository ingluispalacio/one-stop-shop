import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-8 md:px-[5%]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 mb-10">
        {/* Descripción */}
        <div >
          <h4 className="text-white text-lg font-semibold mb-4">OneStopShop</h4>
          <p className="text-sm leading-relaxed mb-4">
            Tu tienda en línea confiable. Ofrecemos productos de alta calidad al mejor precio con atención personalizada.
          </p>
          <div className="flex items-center gap-3">
            <Link
              to="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              to="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              to="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Información */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Información</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/aboutus" className="hover:text-blue-400 transition">Sobre nosotros</Link></li>
            <li><Link to="/#" className="hover:text-blue-400 transition">Política de privacidad</Link></li>
            <li><Link to="/#" className="hover:text-blue-400 transition">Términos y condiciones</Link></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Contáctanos</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Brr NNRR, Cartagena - Colombia</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>+57 300 000 0000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>soporte@onestopshop.com</span>
            </li>
          </ul>
        </div>

        
        <div className="flex items-center justify-center md:justify-end">
          <motion.img
            src="/images/logo_white.png"
            alt="Logo OneStopShop"
            className="w-54 h-50 object-contain"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </div>
      </div>

     
      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-gray-400 text-center md:text-left">
          © {currentYear} <span className="text-blue-400 font-semibold">OneStopShop</span>. Todos los derechos reservados.
        </p>

        {/* Métodos de pago */}
        <div className="flex items-center gap-3 opacity-80 flex-wrap justify-center md:justify-end">
          <motion.img
            src="/images/payments/paypal.svg"
            alt="PayPal"
            className="h-6"
            whileHover={{ scale: 1.1 }}
          />
          <motion.img
            src="/images/payments/nequi.svg"
            alt="Nequi"
            className="h-6"
            whileHover={{ scale: 1.1 }}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
