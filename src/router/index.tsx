import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import {
  HomePage,
  CellPhonesPage,
  AboutPage,
  BrandsPage,
  CategoriesPage,
  OrderUserPage,
  CellPhonePage,
  LoginPage,
  RegisterPage,
  OrdersUserPage,
  CheckoutPage,
  ThankyouPage,
  DashboardCategoriesPage,
  DashboardBrandsPage,
  DashboardProductsPage
} from "../pages";
import ClientLayout from "../layouts/ClientLayout";
import { Children } from "react";
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
        path: "celulares",
        element: <CellPhonesPage />,
      },
      {
        path: "marcas",
        element: <BrandsPage />,
      },
      {
        path: "celulares/:slug",
        element: <CellPhonePage />,
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
        }
    ]
  }
]);
