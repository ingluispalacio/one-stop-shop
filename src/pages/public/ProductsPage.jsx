import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Filter, Search, X } from "lucide-react"
import ProductCard from "../../components/public/ProductCard"
import LoadingState from "../../components/shared/LoadingState"
import { useFetchCollection } from "../../hooks/useFetchCollection"
import { getProducts } from "../../api/firebase/services/productService"
import { getCategories } from "../../api/firebase/services/categoryService"
import ErrorState from "../../components/shared/ErrorState"
import { useParams } from "react-router-dom"

export default function ProductsPage() {
  const { seletedCategory } = useParams();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [search, setSearch] = useState("");

  const {
    data: products,
    isLoading: isLoadingProducts,
    error: errorProducts,
    refetch: refetchProducts,
  } = useFetchCollection(getProducts)

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
    refetch: refetchCategories,
  } = useFetchCollection(getCategories)

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.name : "Sin categoría"
  }

  const toggleCategory = (category_id) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(category_id)
        ? prev.filter((c) => c !== category_id)
        : [...prev, category_id]
    )
  }

  useEffect(() => {
    if (seletedCategory && categories.length > 0) {
      const category = categories.find(c => c.name === seletedCategory)
      if (category) {
        setSelectedCategoryIds([category.id])
      }
    }
  }, [seletedCategory, categories])


  const filteredProducts = products.filter(
    (p) =>
      (selectedCategoryIds.length === 0 ||
        selectedCategoryIds.includes(p.category_id)) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  )

  const clearCategory = (id) => {
    setSelectedCategoryIds((prev) => prev.filter((catId) => catId !== id))
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row min-h-screen bg-linear-to-b from-blue-50 to-white md:pr-[7%] pt-16"
    >
      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/4 bg-white shadow-md border-r border-gray-100 p-6 space-y-6 lg:pl-[7%]"
      >
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-800">Categorías</h2>
        </div>

        <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-2">
          {isLoadingCategories && <LoadingState message="Cargando categorías..." />}
          {errorCategories && (
            <ErrorState message={errorCategories} onRetry={refetchCategories} />
          )}
          {!isLoadingCategories &&
            !errorCategories &&
            categories.map((cat, i) => (
              <motion.label
                key={cat.id}
                className="flex items-center gap-3 cursor-pointer group"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <input
                  type="checkbox"
                  checked={selectedCategoryIds.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  className="accent-blue-600 w-4 h-4"
                />
                <span className="text-gray-700 group-hover:text-blue-600 transition">
                  {cat.name}
                </span>
              </motion.label>
            ))}
        </div>
      </motion.aside>

      <main className="flex-1 py-8 pl-8">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            {selectedCategoryIds.length === 0 ? (
              <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                Todos
              </span>
            ) : (
              selectedCategoryIds.map((id) => (
                <motion.span
                  key={id}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {getCategoryName(id)}
                  <button
                    onClick={() => clearCategory(id)}
                    className="hover:text-blue-900 transition"
                  >
                    <X size={14} />
                  </button>
                </motion.span>
              ))
            )}
          </div>

          <div className="relative w-62 md:w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md transition"
            />
          </div>
        </motion.div>

        {isLoadingProducts && <LoadingState message="Cargando productos..." />}
        {errorProducts && <ErrorState message={errorProducts} onRetry={refetchProducts} />}

        {!isLoadingProducts && !errorProducts && (
          filteredProducts.length > 0 ? (
            <motion.div
              layout
              transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 px-10 lg:px-14 xl:px-20"
            >
              {filteredProducts.map((product, i) => {
                const productWithCategory = {
                  ...product,
                  category: getCategoryName(product.category_id),
                }
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <ProductCard product={productWithCategory} />
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-center mt-20"
            >
              No se encontraron productos.
            </motion.p>
          )
        )}
      </main>
    </motion.section>
  )
}
