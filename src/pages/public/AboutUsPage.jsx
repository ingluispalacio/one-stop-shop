import { motion } from "framer-motion";
import { Heart, Users, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutUsPage() {
    return (
        <div className="bg-linear-to-b from-blue-50 to-white min-h-screen">

            <section className="relative overflow-hidden py-30 px-6 bg-linear-to-br from-blue-50 via-white to-orange-50">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">

                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <img
                            src="/images/about-us/family-icecream.jpg"
                            alt="Familia haciendo helado"
                            className="rounded-3xl shadow-xl object-cover w-full h-[450px] border-4 border-white"
                        />


                        <div className="absolute -bottom-6 -left-6 bg-blue-400 text-white px-6 py-3 rounded-2xl shadow-lg text-sm font-semibold tracking-wide">
                            Desde 2012
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-5"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
                            Nuestra Historia
                        </h2>

                        <div className="w-20 h-1 bg-blue-400 rounded-full mb-4"></div>

                        <p className="text-gray-600 leading-relaxed text-lg">
                            Hace más de una década, una pequeña heladería familiar nació en el corazón
                            de la ciudad. Con la receta secreta de la abuela y una gran pasión por los
                            sabores auténticos, decidimos crear una experiencia única: helados artesanales
                            hechos a mano, con ingredientes frescos, locales y 100% naturales.
                        </p>

                        <p className="text-gray-600 leading-relaxed text-lg">
                            Desde entonces, cada bola de helado cuenta una historia: la dedicación, el amor
                            por los detalles y la alegría de compartir un momento especial. Más que un postre,
                            queremos regalar sonrisas en cada cucharada.
                        </p>

                        <motion.blockquote
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="border-l-4 border-blue-400 pl-4 italic text-gray-700 mt-6"
                        >
                            “El helado no solo se disfruta con el paladar, sino también con el corazón.”
                        </motion.blockquote>
                    </motion.div>
                </div>
            </section>


            <section className="bg-blue-100 py-10 px-6">
                <div className="max-w-6xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Nuestra Esencia</h2>
                    <p className="text-gray-700 mt-2">
                        Creamos helados con propósito, pasión y respeto por la naturaleza.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {[
                        {
                            icon: <Heart size={36} className="text-pink-500" />,
                            title: "Pasión por lo que hacemos",
                            text: "Cada sabor es una historia, y cada bola de helado está hecha con amor y dedicación."
                        },
                        {
                            icon: <Leaf size={36} className="text-pink-600" />,
                            title: "Sostenibilidad",
                            text: "Cuidamos el planeta usando ingredientes locales, empaques ecológicos y procesos responsables."
                        },
                        {
                            icon: <Users size={36} className="text-pink-500" />,
                            title: "Comunidad",
                            text: "Crecemos junto a productores, clientes y colaboradores que comparten nuestros valores."
                        }
                    ].map((value, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-all"
                        >
                            <div className="flex justify-center mb-4">{value.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{value.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-12 text-center bg-linear-to-r from-blue-600 to-blue-400 text-white">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl mx-auto px-6"
                >
                    <h2 className="text-4xl font-bold mb-4">Únete a Nuestra Aventura Dulce</h2>
                    <p className="text-lg mb-6">
                        Descubre nuevos sabores, participa en nuestras experiencias y sé parte de nuestra familia heladera.
                    </p>
                    <Link to="/products" className="bg-gray-200 text-blue-600 hover:bg-white hover:text-blue-500 font-semibold px-6 py-3 rounded-full shadow hover:scale-105 transition">
                        Explorar Productos
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
