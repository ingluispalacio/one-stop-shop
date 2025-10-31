import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DataTable from "../../components/shared/DataTable";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { getProducts, softDeleteProduct } from "../../api/firebase/services/productService";
import { getCategories } from "../../api/firebase/services/categoryService";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import LoadingState from "../../components/shared/LoadingState";
import ErrorState from "../../components/shared/ErrorState";
import { useFetchCollection } from "../../hooks/useFetchCollection";

export default function ProductsAdminPage() {
  const navigate = useNavigate();
  const { data: products, isLoading, error, refetch: refetchProducts } = useFetchCollection(getProducts);
  const { data: categories } = useFetchCollection(getCategories, [] , false);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [idProductToDelete, setIdProductToDelete] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Sin categoría";
  };

  const handleEdit = (id) => navigate(`/admin/products/${id}`);
  const handleCreateNew = () => navigate(`/admin/products/new`);
  const handleDeleteConfirm = (id) => {
    setIdProductToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (idProductToDelete) {
      try {
        await softDeleteProduct(idProductToDelete);
        toast.success("Producto eliminado correctamente");
        refetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Error al eliminar el producto");
      } finally {
        setConfirmDialogOpen(false);
        setIdProductToDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
    setIdProductToDelete(null);
  };

  const handleImageClick = (url) => setSelectedImage(url);
  const handleCloseModal = () => setSelectedImage(null);


  if (isLoading) return <LoadingState message="Cargando productos..." />;
  if (error) return <ErrorState message={error} onRetry={refetchProducts} />;

  return (
    <div className="flex flex-col gap-6 p-6">
      <Toaster position="top-right" />

      {/* 🔹 Encabezado */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Productos</h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCreateNew}
          className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} />
          Agregar Producto
        </motion.button>
      </motion.div>

      {/* 🔹 Tabla de productos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          headers={[
            {
              key: "imageUrl",
              label: "Imagen",
              render: (row) =>
                row.imageUrl ? (
                  <img
                    src={row.imageUrl}
                    alt={row.name}
                    className="w-14 h-14 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
                    onClick={() => handleImageClick(row.imageUrl)}
                  />
                ) : (
                  <span className="text-gray-400 italic">Sin imagen</span>
                ),
            },
            { key: "name", label: "Nombre" },
            { key: "description", label: "Descripción" },
            { key: "price", label: "Precio" },
            {
              key: "category_id",
              label: "Categoría",
              render: (row) => getCategoryName(row.category_id)
            },
            {
              key: "actions",
              label: "Acciones",
              render: (row) => (
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleEdit(row.id)}
                    className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteConfirm(row.id)}
                    className="text-red-600 hover:text-red-800 transition cursor-pointer"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ),
            },
          ]}
          data={products}
          pageSize={10}
        />
      </motion.div>

      <Modal open={!!selectedImage} onClose={handleCloseModal} title="Vista previa">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Vista previa"
            className="w-full h-auto max-h-120 rounded-lg shadow-md object-cover"
          />
        )}
      </Modal>

      <ConfirmDialog
        title="¿Estás seguro?"
        description="Confirma por favor si quieres eliminar el producto"
        isOpen={isConfirmDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
