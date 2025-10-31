import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import LoadingState from "./shared/LoadingState";

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()

  if (loading)  return <LoadingState message="Verificando acceso..." classNameContainer="flex items-center justify-center min-h-screen bg-gray-50 text-gray-600 w-full" />
  
  if (!user) return <Navigate to="/login" replace />

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}
