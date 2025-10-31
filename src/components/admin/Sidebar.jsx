import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ collapsed, setCollapsed }) {
  const [openSubmenu, setOpenSubmenu] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [menuItems, setMenuItems] = useState([])

  const location = useLocation()


  const menuData = [
     {
      "name": "Dashboard",
      "description": "Indicadores",
      "url": "/admin",
      "roles": ["admin"],
      "order": 1,
      "icon": "LayoutDashboard",
      "status": true,
      "deleted": false,
      "deleted_at": null
     },
    {
      "name": "Productos",
      "description": "Productos disponibles",
      "url": null,
      "roles": ["admin"],
      "order": 1,
      "icon": "Briefcase",
      "status": true,
      "deleted": false,
      "deleted_at": null,
      "children": [
        {
          "name": "Nuevo",
          "description": "Crear un nuevo registro de servicio",
          "url": "/admin/products/new",
          "roles": ["admin"],
          "order": 1,
          "icon": "CirclePlus",
          "status": true,
          "deleted": false,
          "deleted_at": null
        },
        {
          "name": "Cosulta",
          "description": "Gestiona los registros de servicios",
          "url": "/admin/products",
          "roles": ["admin"],
          "order": 2,
          "icon": "FileSearch",
          "status": true,
          "deleted": false,
          "deleted_at": null
        }
      ]
    },
    {
      name: 'Configuración',
      description: 'Opciones avanzadas del sistema',
      url: null,
      roles: ['admin'],
      order: 4,
      icon: 'Settings',
      status: true,
      deleted: false,
      children: [
        // {
        //   name: 'Menús',
        //   description: 'Gestión del menú del sistema',
        //   url: '/admin/menus',
        //   roles: ['admin'],
        //   order: 1,
        //   icon: 'MenuSquare',
        //   status: true,
        //   deleted: false,
        // },
        // {
        //   name: 'Permisos',
        //   description: 'Control de acceso y permisos por rol',
        //   url: '/admin/permissions',
        //   roles: ['admin'],
        //   order: 2,
        //   icon: 'KeyRound',
        //   status: true,
        //   deleted: false,
        // },
        {
          name: 'Categorías',
          description: 'Gestión de categorías del sistema',
          url: '/admin/categories',
          roles: ['admin'],
          order: 3,
          icon: 'LayoutList',
          status: true,
          deleted: false,
        },
        {
          name: 'Roles',
          description: 'Administración de los roles de usuario',
          url: '/admin/roles',
          roles: ['admin'],
          order: 4,
          icon: 'Shield',
          status: true,
          deleted: false,
        },
        {
          name: 'Usuarios',
          description: 'Gestión de usuarios del sistema',
          url: '/admin/users',
          roles: ['admin'],
          order: 5,
          icon: 'Users',
          status: true,
          deleted: false,
        },
      ],
    },
  ]


  useEffect(() => {
    setMenuItems(menuData)
  }, [])


  useEffect(() => {
    if (menuItems.length === 0) return

    const activeParent = menuItems.find((item) =>
      item.children?.some((child) => child.url === location.pathname)
    )
    if (activeParent) setOpenSubmenu(activeParent.name)
    else setOpenSubmenu(null)
  }, [location.pathname, menuItems])

  const toggleSubmenu = (name) => {
    setOpenSubmenu((prev) => (prev === name ? null : name))
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white shadow-md h-full flex flex-col border-r border-gray-100 relative"
    >

      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2 overflow-hidden h-7">
          <motion.img
            src="/images/isotipo.png"
            alt="isotipo logo"
            className="w-6 h-6"
          />
          <AnimatePresence>
            {!collapsed && (
              <Link to={'/'}>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg font-bold text-blue-600 whitespace-nowrap"
                >
                  <span className="text-gray-400">One</span>
                  <span className="text-gray-800">Stop</span>Shop
                </motion.span>
              </Link>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer hover:bg-gray-100 rounded-md transition"
          title={collapsed ? 'Expandir' : 'Colapsar'}
        >
          <Icons.PanelLeftClose
            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''
              }`}
          />
        </button>
      </div>

      {/* Menú */}
      <nav className="flex-1 overflow-y-visible py-4 relative">
        {menuItems
          .sort((a, b) => a.order - b.order)
          .map((item) => {
            const Icon = Icons[item.icon] || Icons.Circle
            const isParentActive = item.children?.some(
              (child) => child.url === location.pathname
            )

            if (item.children && item.children.length > 0) {
              return (
                <div
                  key={item.name}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative"
                >
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition ${collapsed ? 'justify-center' : ''
                      } ${isParentActive
                        ? 'bg-indigo-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left font-medium">
                          {item.name}
                        </span>
                        <Icons.ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${openSubmenu === item.name ? 'rotate-180' : ''
                            }`}
                        />
                      </>
                    )}
                  </button>

                  {/* Tooltip en modo colapsado */}
                  <AnimatePresence>
                    {collapsed && hoveredItem === item.name && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800/80 text-white text-sm rounded-md shadow-lg whitespace-nowrap z-50"
                      >
                        {item.name}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ✅ Submenús visibles al hacer clic */}
                  <AnimatePresence>
                    {openSubmenu === item.name && !collapsed && (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="ml-8 border-l border-gray-200"
                      >
                        {item.children
                          .sort((a, b) => a.order - b.order)
                          .map((child) => {
                            const ChildIcon = Icons[child.icon] || Icons.Circle
                            return (
                              <Link
                                key={child.name}
                                to={child.url}
                                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition ${location.pathname === child.url
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                  }`}
                              >
                                <ChildIcon className="w-4 h-4" />
                                <span>{child.name}</span>
                              </Link>
                            )
                          })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }

            // Elementos sin hijos
            return (
              <div
                key={item.name}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative"
              >
                <Link
                  to={item.url || '#'}
                  className={`flex items-center gap-3 px-4 py-2 font-medium transition rounded-md ${collapsed ? 'justify-center' : ''
                    } ${location.pathname === item.url
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </div>
            )
          })}
      </nav>
    </motion.aside>
  )
}
