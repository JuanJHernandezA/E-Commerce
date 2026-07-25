import { IoMdClose } from 'react-icons/io'
import { Link, NavLink } from 'react-router-dom'
import { navbarLinks } from '../../constants/links'
import { useGlobalStore } from '../../store/global.store'

const NavbarMobile = () => {
    const setActiveNavMobile = useGlobalStore(
        state=>state.setActiveNavMobile
    )
    console.log("entra")
  return (
    <div className='bg-white text-black h-screen w-full shadow-lg animate-slide-in-left fixed z-50 flex justify-center py-32'>
        <button className='absolute top-5 right-5' onClick={()=>setActiveNavMobile(false)}>
            <IoMdClose size={30} className='text-black' />
        </button>

        <div className="flex flex-col gap-20">
            <Link to='/' className='text-4xl font-bold tracking-tighter transition-all' onClick={()=>setActiveNavMobile(false)}>
            <p className=" text-3xl text-center  font-black tracking-tight select-none">
    {/* "Tech" en tono oscuro con alto contraste para fondo blanco */}
    <span className="text-slate-900">Tech</span>
    
    {/* "Full" con tu gradiente exacto */}
    <span 
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: "linear-gradient(135deg, #38BDF8 0%, #2563EB 50%, #1E3A8A 100%)" }}
    >
      Full
    </span>
  </p>
            </Link>

            <nav className="flex flex-col items-center gap-5">
                {navbarLinks.map(item=>(
                    <NavLink
                    to={item.href}
                    key={item.id}
                    className={({isActive} )=> `${isActive ? 'text-cyan-600 underline' : ''} transition-all duration-300 font-semibold text-xl
                    hover:text-cyan-600 hover:underline`}
                    onClick={()=>setActiveNavMobile(false)}
                    >{item.title}</NavLink>
                ))}
            </nav>
        </div>
      
    </div>
  )
}

export default NavbarMobile
