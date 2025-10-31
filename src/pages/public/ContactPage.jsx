import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="bg-linear-to-br from-blue-50 via-white to-yellow-50 min-h-screen">
    
      {/* Main content */}
      <section className="max-w-6xl mx-auto pt-30 pb-20 px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Información de contacto */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Siempre estamos aquí para ti
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Nuestro equipo está disponible para atender tus consultas, resolver tus dudas
            o escuchar tus ideas. Escríbenos, llámanos o visítanos: tu satisfacción es
            nuestra prioridad.
          </p>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-600 w-5 h-5" />
              <span>contacto@onestopshop.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-blue-600 w-5 h-5" />
              <span>+57 320 456 7890</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-600 w-5 h-5" />
              <span>Cra 15 #45-23, Bogotá, Colombia</span>
            </div>
          </div>

          <div className="mt-8">
            <img
              src="/images/about-us/icecream-contact.png"
              alt="Decoración helado"
              className="rounded-2xl w-72 opacity-90"
            />
          </div>
        </motion.div>


        <motion.form
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 space-y-6"
        >
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Escríbenos un mensaje
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre completo"
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Asunto"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />

          <textarea
            placeholder="Tu mensaje..."
            rows={5}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Enviar mensaje
          </button>
        </motion.form>
      </section>
    </div>
  )
}
