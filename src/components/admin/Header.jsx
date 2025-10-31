import { useState } from "react";
import { Bell, MessageCircle, ChevronDown, LogOut, UserPen } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <header className="w-full flex justify-between items-center bg-white shadow-sm px-8 py-3">
        <div className="flex items-center gap-8"></div>

        <div className="flex items-center gap-4 relative">

          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2  rounded-full px-3 py-1 cursor-pointer">
               <span className="hidden md:inline text-sm text-gray-700">
                  Bienvenido,{" "}
                  <span className="font-semibold text-blue-600">
                    {user.displayName || user.email}
                  </span>
                </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <ul className="text-sm text-gray-700">
                  <li
                    className="flex gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer items-center"
                    onClick={() =>  setUserMenuOpen(false) }
                  >
                    <UserPen  className="w-4 h-4" />
                    Actualizar Perfil
                  </li>
                  <li className="flex gap-2 items-center px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer" onClick={logout} >
                     <LogOut className="w-4 h-4" /> Cerrar sesión
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
