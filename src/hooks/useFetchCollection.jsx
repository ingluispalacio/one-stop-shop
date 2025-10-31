import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

/**
 * Custom hook para manejar la carga de datos desde un servicio (Firebase, API, etc.)
 * 
 * @param {Function} fetchFunction - función async que realiza la petición (ej: getProducts)
 * @param {Array} deps - dependencias opcionales para recargar automáticamente
 * @param {boolean} showToast - si deseas mostrar errores automáticamente con toast
 * 
 * @returns {Object} { data, isLoading, error, refetch }
 */
export function useFetchCollection(fetchFunction, deps = [], showToast = true) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchFunction();

      if (response?.success) {
        setData(response.data || []);
      } else {
        const message = response?.message || "Error desconocido al obtener datos.";
        setError(message);
        if (showToast) toast.error(message);
      }
    } catch (err) {
      const message = err.message || "Error de conexión al obtener los datos.";
      setError(message);
      if (showToast) toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, showToast]);

  useEffect(() => {
    fetchData();
  }, deps);

  return { data, isLoading, error, refetch: fetchData };
}
