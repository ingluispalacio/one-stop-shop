# 🛍️ One Stop Shop - Demo E-commerce

Este es un proyecto **demo e-commerce** desarrollado con **React**, utilizando **Firebase** para la autenticación de usuarios, almacenamiento de datos y despliegue de la aplicación.  
El propósito principal es mostrar una arquitectura moderna con **hooks personalizados**, **contextos globales** y una estructura modular y escalable.

---

## 🚀 Tecnologías principales

- ⚛️ **React 19** — Librería para la creación de interfaces de usuario.
- 🔥 **Firebase** — Backend as a Service (BaaS) para autenticación, base de datos y hosting.
- 🎨 **TailwindCSS** — Framework CSS para estilos rápidos y consistentes.
- 🧩 **React Hook Form + Yup** — Manejo y validación de formularios.
- 🧭 **React Router DOM 7** — Navegación y rutas protegidas.
- 📊 **Recharts** — Gráficas para análisis de ventas o estadísticas.
- 🧠 **Framer Motion** — Animaciones fluidas y declarativas.
- 📦 **Vite** — Bundler rápido para desarrollo y producción.

---

## 📁 Estructura del proyecto

```
src/
├── api/
│   └── firebase/          # Configuración y servicios de Firebase
├── components/            # Componentes reutilizables (botones, inputs, etc.)
├── contents/              # Datos estáticos, constantes o mocks
├── hooks/                 # Custom hooks (useAuth, useFetchCollection, etc.)
├── layouts/               # Estructuras de página (dashboard, público, etc.)
├── libs/                  # Utilidades o funciones auxiliares
├── pages/                 # Páginas principales (Login, Home, Products, etc.)
├── router/
│   └── AppRouter.jsx      # Rutas principales y rutas protegidas
├── App.jsx                # Componente raíz de la aplicación
└── Main.jsx               # Punto de entrada principal
```

---

## 🔥 Integración con Firebase

### 1️⃣ **Autenticación**

La aplicación usa **Firebase Authentication** para manejar el inicio y cierre de sesión con correo electrónico y contraseña.

- El contexto global `AuthContext` gestiona el estado del usuario.
- Se utiliza un **custom hook `useAuth`** para acceder fácilmente al usuario actual y funciones como `login`, `logout` y `register`.
- La autenticación se sincroniza automáticamente mediante `onAuthStateChanged`.

```js
// Ejemplo (simplificado)
import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../api/firebase/services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = authService.onAuthChange(setUser);
    return () => unsubscribe();
  }, []);
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
```

---

### 2️⃣ **Almacenamiento**

- Se usa **Firestore** para almacenar colecciones como `products`, `categories`, `orders`, etc.
- También puede utilizarse **Firebase Storage** para subir imágenes de productos.
- Los hooks personalizados como `useFetchCollection` simplifican las consultas.

Ejemplo:
```js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../api/firebase/config";

export const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, collectionName));
      setData(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, [collectionName]);
  return { data };
};
```

---

### 3️⃣ **Despliegue en Firebase Hosting**

La app puede desplegarse fácilmente en Firebase Hosting.

#### 🔧 Pasos:

1. Instala Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Inicia sesión:
   ```bash
   firebase login
   ```
3. Inicializa el proyecto:
   ```bash
   firebase init
   ```
   - Selecciona **Hosting**
   - Usa la carpeta `dist` (generada por Vite)
4. Compila la app:
   ```bash
   npm run build
   ```
5. Despliega:
   ```bash
   firebase deploy
   ```

Tu app quedará disponible en la URL proporcionada por Firebase 🚀

---

## ⚙️ Scripts disponibles

| Comando | Descripción |
|----------|--------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila la app para producción |
| `npm run preview` | Previsualiza la app compilada |
| `npm run lint` | Analiza el código con ESLint |

---

## 🧑‍💻 Buenas prácticas del proyecto

- Código modular dividido por responsabilidades.
- Uso de **Context API** para manejar estados globales.
- **Custom hooks** para encapsular lógica reutilizable.
- **Validación de formularios** con Yup.
- **Notificaciones** con `react-hot-toast`.
- **Animaciones** declarativas con `framer-motion`.

---

## 🧾 Licencia

Este proyecto se distribuye con fines educativos y de demostración.  
Puedes adaptarlo libremente para tus propios proyectos 🚀

---

**Desarrollado con ❤️ por IngLP**
