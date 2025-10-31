import { motion } from "framer-motion";
import DataTable from "../../components/shared/DataTable";
import { getRoles } from "../../api/firebase/services/roleService";
import LoadingState from "../../components/shared/LoadingState";
import ErrorState from "../../components/shared/ErrorState";
import { useFetchCollection } from "../../hooks/useFetchCollection";
import { Toaster } from "react-hot-toast";

export default function RolesPage() {

  const { data: roles, isLoading, error } = useFetchCollection(getRoles);

  if (isLoading) {
    return (
      <LoadingState message="Cargando roles..." />
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
        <h1 className="text-3xl font-bold text-gray-800">Lista de Roles</h1>


      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          headers={[
            { key: "name", label: "Nombre" },
            { key: "title", label: "Titulo" },
            { key: "description", label: "Descripción" },
          ]}
          data={roles}
          pageSize={5}
        />
      </motion.div>
    </div>
  );
}
