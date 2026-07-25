import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import {
  HomePage,
  AboutPage,
  BrandsPage,
  CategoriesPage,
  OrderUserPage,
  LoginPage,
  RegisterPage,
  OrdersUserPage,
  CheckoutPage,
  ThankyouPage,
  DashboardCategoriesPage,
  DashboardBrandsPage,
  DashboardProductsPage,
  ProductPage,
  ProductsPage,
  DashboardBrandIdPage,
  DashboardOrdersPage,
  DashboardOrderPage,
  DashboardNewProductPage,
  DashboardNewBrandPage,
  DashboardNewCategoryPage,
  DashboardProductSlugPage,
  DashboardCategoryIdPage
} from "../pages";
import ClientLayout from "../layouts/ClientLayout";
import  { DashboardLayout } from "../layouts/DashboardLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "productos",
        element: <ProductsPage />,
      },
      {
        path: "marcas",
        element: <BrandsPage />,
      },
      {
        path: "productos/:slug",
        element: <ProductPage />,
      },
      {
        path: "categorias",
        element: <CategoriesPage />,
      },
      {
        path: "sobre-nosotros",
        element: <AboutPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "registro",
        element: <RegisterPage />,
      },
      {
        path: "account",
        element: <ClientLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="/account/pedidos" />,
          },
          {
            path: "pedidos",
            element: <OrdersUserPage />,
          },
          {
            path: "pedidos/:id",
            element: <OrderUserPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/checkout/:id/thank-you",
    element: <ThankyouPage />,
  },
  {
    path:'/dashboard',
    element:<DashboardLayout />,
    children:[
        {
            index:true,
            element: <Navigate to='/dashboard/productos' />
        },
        {
            path:'productos',
            element: <DashboardProductsPage />
        },
         {
            path:'categorias',
            element: <DashboardCategoriesPage />
        },
         {
            path:'marcas',
            element: <DashboardBrandsPage />
        },
        {
          path:'productos/new',
          element: <DashboardNewProductPage />
        },
        {
          path:'categorias/new',
          element: <DashboardNewCategoryPage />
        },
        {
          path:'marcas/new',
          element: <DashboardNewBrandPage />
        },
        {
          path:'productos/editar/:slug',
          element: <DashboardProductSlugPage />
        },
        {
          path:'categorias/editar/:id_category',
          element: <DashboardCategoryIdPage />
        },
        {
          path:'marcas/editar/:id_brand',
          element: <DashboardBrandIdPage />
        },
        {
          path:'ordenes',
          element:<DashboardOrdersPage />
        },
        {
          path:'ordenes/:id',
          element:<DashboardOrderPage />
        }
    ]
  }
]);
