import { BiCategory } from "react-icons/bi";
import { FaBoxOpen, FaCartShopping, FaFacebookF, FaInstagram } from "react-icons/fa6"
import { TbBrandAppgallery } from "react-icons/tb";

export const navbarLinks = [
    {
        id: 1, 
        title:'Inicio',
        href: '/'
    },
    {
        id: 2, 
        title:'Productos',
        href: '/productos'
    },
    {
        id: 3,
        title:'Categorías',
        href: '/categorias'
    },
    {id:4,
        title: 'Marcas',
        href:'/marcas'

    },
    {
        id: 5,
        title:'Sobre nosotros',
        href: '/sobre-nosotros'
    }
]

export const socialLinks = [
    {
        id: 1,
        title: 'Facebook',
        href: 'https://www.facebook.com/',
        icon: <FaFacebookF size={20} />
    },
    { 
         id: 2,
        title: 'Instagram',
        href: 'https://www.instagram.com/',
        icon: <FaInstagram size={20} />
    }];

    export const dashboardLinks =[
        {id:1,
            title:'Productos',
            href:'/dashboard/productos',
            icon:<FaBoxOpen size={25}/>

        },
        {id:2,
            title:'Categorías',
            href:'/dashboard/categorias',
            icon:<BiCategory size={25}/>

        },
        {id:3,
            title:'Marcas',
            href:'/dashboard/marcas',
            icon:<TbBrandAppgallery  size={25}/>

        },
        {id:4,
            title:'Ordenes',
            href:'/dashboard/ordenes',
            icon:<FaCartShopping size={25}/>

        }
    ]