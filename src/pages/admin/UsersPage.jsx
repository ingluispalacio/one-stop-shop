import { useState } from "react";
import { motion } from "framer-motion";
import DataTable from "../../components/shared/DataTable";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { getUsers, softDeleteUser } from "../../api/firebase/services/userService";
import { getRoles } from "../../api/firebase/services/roleService";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import LoadingState from "../../components/shared/LoadingState";
import ErrorState from "../../components/shared/ErrorState";
import { useFetchCollection } from "../../hooks/useFetchCollection";

export default function UsersPage() {
  const navigate = useNavigate();
  const { data: users, isLoading, error, refetch: refetchUsers } = useFetchCollection(getUsers);
  const { data: roles } = useFetchCollection(getRoles, [], false);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [idUserToDelete, setIdUserToDelete] = useState(null);

  const getRoleTitle = (roleName) => {
    const role = roles.find((r) => r.name === roleName);
    return role ? role.title : "Sin Rol";
  };

  const handleEdit = (id) => {
    navigate(`/admin/users/${id}`);
  };

  const handleCreateNew = (id) => {
    navigate(`/admin/users/new`);
  };

  const handleDeleteConfirm = (id) => {
    setIdUserToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (idUserToDelete) {
      await handleDelete();
      setConfirmDialogOpen(false);
      setIdUserToDelete(null);
    }
  };

  const handleDelete = async () => {
    try {
      await softDeleteUser(idUserToDelete);
      toast.success("Usuario eliminado correctamente");
      refetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error al eliminar el usuario");
    }
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
    setIdUserToDelete(null);
  };


  if (isLoading) {
    return (
      <LoadingState message="Cargando usuarios..." />
    );
  }

  if (error) {
    return (
      <ErrorState message={error} onRetry={fetchRoles} />
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <Toaster position="top-right" />

      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCreateNew}
          className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} />
          Agregar Usuario
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          headers={[
            { key: "displayName", label: "Nombre Completo" },
            {
             key: "role", 
             label: "Rol",
              render: (row) => getRoleTitle(row.role)   
            },
            { key: "email", label: "Correo" },
            {
              key: "actions",
              aling: "center",
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
          data={users}
          pageSize={10}
        />
      </motion.div>

      <ConfirmDialog
        title="¿Estás seguro?"
        description="Comfirma por favor si quieres eliminar el usuario"
        isOpen={isConfirmDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
