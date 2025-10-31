import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Star, Shield, Truck, Leaf, Heart } from "lucide-react";
import { getCategories } from "../../api/firebase/services/categoryService";
import LoadingState from "../../components/shared/LoadingState";
import ErrorState from "../../components/shared/ErrorState";
import { useFetchCollection } from "../../hooks/useFetchCollection";


export default function HomePage() {
    const {
        data: categories,
        isLoading: isLoadingCategories,
        error: errorCategories,
        refetch: refetchCategories,
      } = useFetchCollection(getCategories);
    
    return (
        <div className="bg-white text-gray-800">
            <section className="relative flex flex-col md:flex-row items-center justify-between px-[8%] py-24 overflow-hidden">
                <div className="md:w-1/2 space-y-6 z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold leading-tight text-gray-900"
                    >
                        ¡Descubre el{" "}
                        <span className="text-blue-600">Helado Estrella</span> de la Temporada!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-gray-600 text-lg"
                    >
                        Disfruta de los sabores más irresistibles, elaborados con los mejores
                        ingredientes. ¡Frescura y sabor que derriten sonrisas!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <Link
                            to="/products"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all"
                        >
                            Comprar ahora
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
                >
                    <img
                        src="/images/hero-section/image2.png"
                        alt="Producto destacado"
                        className="w-[90%] max-w-md drop-shadow-2xl rounded-2xl"
                    />
                </motion.div>
            </section>

            <section className="py-28 px-[10%] text-center bg-blue-100/30 relative overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"
                    animate={{ scale: [1.2, 1, 1.2] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl font-extrabold mb-6 text-gray-900 relative z-10"
                >
                    Descubre tu tipo de helado
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-lg text-gray-600 max-w-3xl mx-auto mb-16 relative z-10"
                >
                    Desde los sabores más <span className="text-blue-600 font-semibold">clásicos</span> hasta las
                    combinaciones más <span className="text-pink-500 font-semibold">atrevidas</span>, tenemos un helado para cada
                    estado de ánimo. ¡Encuentra el tuyo!
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                    {isLoadingCategories && <LoadingState message="Cargando categorías..." />}
                    {errorCategories && <ErrorState message={errorCategories} onRetry={refetchCategories} />}
                    {!isLoadingCategories && !errorCategories &&  categories.slice(0, 4).map((cat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="relative overflow-hidden rounded-3xl shadow-lg group cursor-pointer"
                    >
                        <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-700 flex flex-col justify-center items-center">
                        <h3 className="text-white text-2xl font-bold mb-3">{cat.name}</h3>
                        <Link to={`/products/${cat.name}`} className="cursor-pointer bg-white text-gray-800 font-semibold px-4 py-2 rounded-full shadow hover:bg-blue-100 transition">
                            Explorar
                        </Link>
                        </div>
                    </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-16 relative z-10"
                >
                    <Link
                    to="/products"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all"
                    >
                    Ver todos los productos
                    </Link>
                </motion.div>
            </section>

            <section className="relative px-[8%] py-24 from-yellow-50 via-white to-pink-50 overflow-hidden">
                <motion.div
                    className="absolute top-10 right-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-10 left-10 w-48 h-48 bg-yellow-200/30 rounded-full blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2] }}
                    transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
                />

                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl font-extrabold text-center mb-6 text-gray-900"
                >
                    ¿Por qué elegirnos?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center text-gray-600 max-w-2xl mx-auto mb-16"
                >
                    En <span className="text-pink-500 font-semibold">OneStopShop</span> transformamos el arte de hacer helado en una experiencia multisensorial.
                    Cada sabor está pensado para despertar emociones y recuerdos felices.
                </motion.p>

                {/* BENEFICIOS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
                    {[
                        {
                            icon: <ShoppingBag className="w-10 h-10 text-pink-500 mx-auto mb-3" />,
                            title: "Sabores exclusivos",
                            desc: "Fórmulas únicas desarrolladas por chefs artesanales. Ediciones limitadas que sorprenden en cada temporada.",
                        },
                        {
                            icon: <Shield className="w-10 h-10 text-pink-500 mx-auto mb-3" />,
                            title: "Calidad garantizada",
                            desc: "Usamos ingredientes 100% naturales, sin conservantes artificiales y con control de frescura en cada lote.",
                        },
                        {
                            icon: <Truck className="w-10 h-10 text-pink-500 mx-auto mb-3" />,
                            title: "Entrega ultrarrápida",
                            desc: "Nuestro sistema de entrega refrigerada mantiene tu helado perfecto hasta la puerta de tu casa.",
                        },
                        {
                            icon: <Star className="w-10 h-10 text-pink-500 mx-auto mb-3" />,
                            title: "Clientes felices",
                            desc: "Más de 10.000 sonrisas satisfechas y reseñas que avalan nuestro sabor y servicio.",
                        },
                        {
                            icon: <Leaf className="w-10 h-10 text-pink-500 mx-auto mb-3" />,
                            title: "Sostenibles",
                            desc: "Envases biodegradables y prácticas eco-friendly que cuidan nuestro planeta.",
                        },
                        {
                            icon: <Heart className="w-10 h-10 text-pink-500 mx-auto mb-3" />,
                            title: "Hecho con amor",
                            desc: "Cada helado cuenta una historia. La tuya puede ser la próxima.",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition relative group"
                        >
                            <div className="absolute inset-0 from-pink-100/10 to-yellow-100/10 opacity-0 group-hover:opacity-100 transition rounded-2xl" />
                            {item.icon}
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 flex flex-wrap justify-center gap-10 text-center">
                    {[
                        { number: "10K+", label: "Clientes felices" },
                        { number: "50+", label: "Sabores artesanales" },
                        { number: "15min", label: "Entrega promedio" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl px-8 py-6 shadow-md hover:shadow-lg transition"
                        >
                            <h4 className="text-3xl font-bold text-pink-500">{stat.number}</h4>
                            <p className="text-gray-700 text-sm font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
