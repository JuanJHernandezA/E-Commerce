import { FaFacebookF, FaInstagram } from "react-icons/fa6"

export const navbarLinks = [
    {
        id: 1, 
        title:'Inicio',
        href: '/'
    },
    {
        id: 2, 
        title:'Celulares',
        href: '/celulares'
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
    }]