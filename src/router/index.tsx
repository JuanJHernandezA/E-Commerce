import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import {HomePage, CellPhonesPage, AboutPage, BrandsPage, CategoriesPage, CellPhonePage} from "../pages";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ClientLayout from "../layouts/ClientLayout";
import OrdersUserPage from "../pages/OrdersUserPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'celulares',
                element: <CellPhonesPage />
            },
            {
                path:'marcas',
                element: <BrandsPage />
            },
            {
                path:'celulares/:slug',
                element: <CellPhonePage />
            },
            {
                path:'categorias',
                element: <CategoriesPage />
            },
             {
                path: 'sobre-nosotros',
                element: <AboutPage />
            },
            {
                path:'login',
                element :<LoginPage />
            },
            {
                path:'registro',
                element: <RegisterPage />
            },
            {
                path:'account',
                element: <ClientLayout />,
                children: [
                    {
                        path:'',
                        element: <Navigate to='/account/pedidos' />
                    },
                    {
                        path: 'pedidos',
                        element: <OrdersUserPage />
                    }
                ]
            }
        ]
    }
]);