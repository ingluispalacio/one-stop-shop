import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../api/firebase/services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthChange((authUser) => {
      setUser(authUser?.data || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await authService.loginUser(email, password);

      if (result.success) {
        setUser(result.data?.user?.data || null);
        return result.data?.user;
      } else {
        setUser(null);
        throw new Error(result?.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("AuthContext login error:", error);
      throw error;
    }
  };

  const register = async (email, password, displayName) => {
    try {
      const result = await authService.registerUser(email, password, displayName);
      if (result.success) {
        setUser(result.data?.user || null);
        return result;
      } else {
        setUser(null);
        throw new Error(result?.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("AuthContext register error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const result = await authService.logoutUser();
      if (result.success) {
        localStorage.clear();
        setUser(null);
        return true;
      } else {
        throw new Error(result?.message || "Error al cerrar sesión");
      }
    } catch (error) {
      console.error(" AuthContext logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
