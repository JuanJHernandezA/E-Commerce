import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/shared/Navbar"
import Footer from "../components/shared/Footer";
import Banner from "../components/home/Banner";
import Newsletter from "../components/home/Newsletter";

export const RootLayout = () =>{

    const {pathname} = useLocation();



    return (<div className=' h-screen flex flex-col font-montserrat'>
    <Navbar/>

    { 
        pathname === '/' && <Banner />
    }

    <main className="w-full max-w-[85%] md:max-w-[80%] mx-auto my-8 flex-1">
        <Outlet/>
    </main>

    { pathname === '/' && <Newsletter />
    }
    
    <Footer />
    </div>

    )
};