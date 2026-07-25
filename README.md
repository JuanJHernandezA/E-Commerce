# TechFull — E-Commerce

**TechFull** es una aplicación web de comercio electrónico full-stack construida con React, TypeScript y Supabase. Permite a los usuarios explorar productos tecnológicos, filtrarlos por marca y categoría, gestionar un carrito de compras y realizar pedidos. Incluye un panel de administración completo para la gestión de productos, marcas, categorías y órdenes.

---

## Tecnologías Utilizadas

### Frontend

| Tecnología | Uso |
|---|---|
| **React 19** | Librería principal de UI |
| **TypeScript 6** | Tipado estático |
| **Vite 8** | Bundler y servidor de desarrollo |
| **React Router DOM 7** | Enrutamiento SPA |
| **TanStack React Query 5** | Fetching, caching y sincronización de datos del servidor |
| **Zustand 5** | Manejo de estado global (carrito, UI) |
| **React Hook Form + Zod** | Formularios con validación de schemas |
| **Tiptap 3** | Editor de texto enriquecido (descripciones de productos/marcas/categorías) |

### Backend / Base de Datos

| Tecnología | Uso |
|---|---|
| **Supabase** | Backend-as-a-Service (PostgreSQL, Auth, Storage, RLS) |
| **@supabase/supabase-js** | Cliente JavaScript para interactuar con Supabase |

### Estilos

| Tecnología | Uso |
|---|---|
| **Tailwind CSS 4** | Framework de utilidades CSS |
| **@tailwindcss/typography** | Plugin para estilos de prosa (contenido del editor) |
| **Montserrat** | Fuente principal vía Google Fonts |

### Autenticación

| Tecnología | Uso |
|---|---|
| **Supabase Auth** | Registro, login, sesiones y manejo de roles (`admin` / `customer`) |

### Herramientas de Desarrollo

| Tecnología | Uso |
|---|---|
| **ESLint** | Linting de código |
| **Prettier** | Formateo de código |
| **babel-plugin-react-compiler** | Optimización automática de React |
| **pnpm** | Gestor de paquetes |

---

## Seguridad y Row Level Security (RLS)

La base de datos está alojada en **Supabase (PostgreSQL)** y utiliza **Row Level Security (RLS)** para garantizar el acceso controlado a los datos:

- **Productos, Marcas y Categorías**: Lectura pública para todos los usuarios. Las operaciones de escritura (crear, editar, eliminar) están restringidas a usuarios con rol `admin`.
- **Órdenes (`orders`) y Artículos de Orden (`order_items`)**: Los clientes solo pueden ver sus propias órdenes. Los administradores tienen acceso completo para gestionar estados y visualizar todas las órdenes.
- **Clientes (`customers`) y Direcciones (`addresses`)**: Cada usuario solo puede acceder y modificar su propia información.
- **Roles (`user_roles`)**: Asignación de roles al momento del registro. La verificación del rol se realiza tanto en el frontend (protección de rutas) como en el backend (políticas RLS).
- **Storage (Imágenes)**: Los buckets `product-images`, `brand_images`, `category_images` y `order_images` tienen políticas que restringen la subida y eliminación de archivos a usuarios autenticados con permisos adecuados.

---

## Características Principales

- **Página de inicio** con banner, productos recientes/aleatorios y newsletter
- **Búsqueda de productos** en tiempo real por nombre
- **Filtrado avanzado** por marca y categoría con paginación
- **Detalle de producto** con galería de imágenes, variantes (color, almacenamiento), stock y descripción enriquecida
- **Carrito de compras** persistente (localStorage vía Zustand) con gestión de cantidades
- **Checkout** con selección/creación de dirección de envío y subida de comprobante de pago
- **Autenticación completa** (registro, login, cierre de sesión)
- **Historial de pedidos** del usuario con detalle por orden
- **Panel de Administración** protegido por rol:
  - CRUD completo de **Productos** (con variantes, imágenes múltiples, editor de descripciones)
  - CRUD completo de **Marcas** y **Categorías**
  - Gestión de **Órdenes** (visualización y cambio de estado)
- **Diseño responsivo** con navegación móvil dedicada
- **Optimización de rendimiento** con React Compiler y React Query caching

---

<!-- ## Estructura del Proyecto

```
src/
├── actions/            # Funciones de acceso a datos (Supabase queries)
│   ├── auth.ts         # Registro, login, sesión, roles
│   ├── brand.ts        # CRUD de marcas
│   ├── category.ts     # CRUD de categorías
│   ├── order.ts        # Creación y consulta de órdenes
│   └── product.ts      # CRUD de productos
├── components/
│   ├── checkout/       # Formulario de checkout y dirección
│   ├── dashboard/      # Panel admin (tablas, formularios, sidebar)
│   ├── home/           # Banner, grid de productos, newsletter
│   ├── one-product/    # Galería de imágenes y descripción
│   ├── orders/         # Tabla de pedidos del usuario
│   ├── products/       # Cards de productos, marcas, categorías y filtros
│   ├── shared/         # Navbar, Footer, Cart, Loader, Paginación, etc.
│   └── skeletons/      # Componentes de carga (skeleton loaders)
├── constants/          # Links de navegación
├── helpers/            # Utilidades y funciones auxiliares
├── hooks/              # Custom hooks organizados por dominio
│   ├── auth/           # useLogin, useRegister, useUser, useRoleUser
│   ├── brands/         # useBrands, useCreateBrand, useUpdateBrand, useDeleteBrand
│   ├── categories/     # useCategories, useCreateCategory, useUpdateCategory
│   ├── location/       # useColombiaLocations
│   ├── orders/         # useOrders, useCreateOrder, useChangeStatusOrder
│   └── products/       # useProducts, useFilteredProducts, useCreateProduct
├── interfaces/         # Tipos TypeScript (Product, Order, etc.)
├── layouts/            # Layouts de la app (Root, Client, Dashboard)
├── lib/                # Validadores Zod
├── pages/              # Páginas de la aplicación
│   └── dashboard/      # Páginas del panel de administración
├── router/             # Configuración de React Router
├── store/              # Stores Zustand (cart, global)
├── supabase/           # Cliente Supabase y tipos generados de la DB
├── index.css           # Estilos globales + Tailwind
└── main.tsx            # Entry point de la aplicación
```

---

## Configuración e Instalación Local

### Prerrequisitos

- **Node.js** >= 18
- **pnpm** (gestor de paquetes recomendado)
- Una cuenta en [Supabase](https://supabase.com) con un proyecto configurado

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/e-commerce.git
cd e-commerce
```

2. **Instalar dependencias**

```bash
pnpm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_SUPABASE_API_KEY=tu_supabase_anon_key
VITE_PROJECT_URL_SUPABASE=https://tu-proyecto.supabase.co
```

> Puedes obtener estas credenciales desde el panel de tu proyecto en Supabase → Settings → API.

4. **Ejecutar en modo desarrollo**

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`.

5. **Compilar para producción**

```bash
pnpm build
```

6. **Previsualizar el build de producción**

```bash
pnpm preview
```

--- -->

## Despliegue / Demo en Vivo

**Demo:** [https://tu-proyecto.vercel.app](https://tu-proyecto.vercel.app)

> Reemplaza este enlace con la URL de tu despliegue una vez realizado (Vercel, Netlify, etc.).

---

## Licencia

Este proyecto es privado y de uso personal/educativo.
