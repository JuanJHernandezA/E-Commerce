import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import CellPhonesPage from "../pages/CellPhonesPage";
import AboutPage from "../pages/AboutPage";
import BrandsPage from "../pages/BrandsPage";
import CategoriesPage from "../pages/CategoriesPage";

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
                path:'categorias',
                element: <CategoriesPage />
            },
             {
                path: 'sobre-nosotros',
                element: <AboutPage />
            },
        ]
    }
]);