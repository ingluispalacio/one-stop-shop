import { Routes, Route } from "react-router"
import LoginPage from "../pages/public/LoginPage"
import RegisterPage from "../pages/public/RegisterPage"
import AdminLayout from "../layouts/AdminLayout"
import PublicLayout from "../layouts/PublicLayout"
import HomePage from "../pages/public/HomePage"
import ProductsPage from "../pages/public/ProductsPage"
import AboutUsPage from "../pages/public/AboutUsPage"
import ContactPage from "../pages/public/ContactPage"
import { ProtectedRoute } from "../components/ProtectedRoute" 
import ErrorPage404 from "../pages/ErrorPage404"
import ErrorPage401 from "../pages/ErrorPage401"
import ProductDetailPage from "../pages/public/ProductDetailPage"
import RolesPage from "../pages/admin/RolesPage"
import UsersPage from "../pages/admin/UsersPage"
import UserFormPage from "../pages/admin/UserFormPage"
import CategoriesPage from "../pages/admin/CategoriesPage"
import CategoryFormPage from "../pages/admin/CategoryFormPage"
import CartPage from "../pages/public/CartPage"
import ProductsAdminPage  from "../pages/admin/ProductsAdminPage"
import ProductFormPage from "../pages/admin/ProductFormPage"
import DashboardPage from "../pages/admin/DashboardPage"

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:seletedCategory" element={<ProductsPage />} />
        <Route path="/products/details/:id" element={<ProductDetailPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserFormPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:id" element={<CategoryFormPage />} />
        <Route path="products" element={<ProductsAdminPage />} />
        <Route path="products/:id" element={<ProductFormPage />} />
      </Route>


      <Route path="/unauthorized" element={<ErrorPage401 />} />


      <Route path="*" element={<ErrorPage404 />} />
    </Routes>
  )
}
