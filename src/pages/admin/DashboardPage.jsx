import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../api/firebase/config";
import { Users, Package, Tags } from "lucide-react";
import { motion } from "framer-motion";
import LoadingState from "../../components/shared/LoadingState";
import ErrorState from "../../components/shared/ErrorState";
import SalesChart from "../../components/SalesChart";


const DashboardPage = () => {
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        categories: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const usersSnapshot = await getDocs(collection(db, "users"));
            const productsSnapshot = await getDocs(collection(db, "products"));
            const categoriesSnapshot = await getDocs(collection(db, "categories"));

            setStats({
                users: usersSnapshot.size,
                products: productsSnapshot.size,
                categories: categoriesSnapshot.size,
            });
        } catch (err) {
            console.error(err);
            setError("Error al cargar los datos del dashboard");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <LoadingState message="Cargando dashboard..." />;
    if (error) return <ErrorState message={error} onRetry={fetchData} />;

    const salesData = [
        { category: "Helado de Crema", sales: 120 },
        { category: "Helado de Agua", sales: 90 },
        { category: "Toppings", sales: 60 },
        { category: "Conos y Vasos", sales: 30 },
        { category: "Especialidades", sales: 50 },
    ];

    const cards = [
        {
            title: "Usuarios",
            value: stats.users,
            icon: <Users className="w-10 h-10 text-blue-500" />,
            bgColor: "bg-blue-50",
        },
        {
            title: "Productos",
            value: stats.products,
            icon: <Package className="w-10 h-10 text-green-500" />,
            bgColor: "bg-green-50",
        },
        {
            title: "Categorías",
            value: stats.categories,
            icon: <Tags className="w-10 h-10 text-purple-500" />,
            bgColor: "bg-purple-50",
        },
    ];

    return (
        <motion.div
            className="p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className={`${card.bgColor} shadow rounded-lg p-6 flex items-center gap-4`}
                    >
                        {card.icon}
                        <div>
                            <h2 className="text-xl font-semibold mb-1">{card.title}</h2>
                            <p className="text-3xl font-bold">{card.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
            >
                <SalesChart data={salesData} />
            </motion.div>
        </motion.div>
    );
};

export default DashboardPage;
