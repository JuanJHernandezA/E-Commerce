import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import {HomePage, CellPhonesPage, AboutPage, BrandsPage, CategoriesPage, CellPhonePage} from "../pages";


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
        ]
    }
]);