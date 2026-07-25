import { IoLogOutOutline } from "react-icons/io5";
import { MdStorefront } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "../../actions";
import { dashboardLinks } from "../../constants/links";
import { Logo } from "../shared/Logo";

export const SideBar = () => {
   const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut();
    navigate('/')
  };
 
  return (
    <div className="w-[120px] bg-stone-800 text-white text-qhite flex flex-col gap-10 items-center p-5 fixed h-screen lg:w-[250px]">
      <Logo isDashboard />
      <nav className="w-full space-y-5 flex-1">
        {dashboardLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({
              isActive,
            }) => `flex items-center justify-center gap-3 pl-0 py-3 transition-all duration-300 rounded-md ${isActive ? "text-white bg-cyan-600" : "hover:text-white hover:bg-cyan-600"}
            lg:pl-5 lg:justify-start`}
          >
            {link.icon}
            <p className="font-semibold hidden lg:block">{link.title}</p>
          </NavLink>
        ))}
      </nav>
      <div className="w-full flex flex-col gap-2 pt-4 border-t border-stone-700/60">

  <button
    type="button"
    onClick={() => navigate('/')}
    className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-stone-300 hover:text-white hover:bg-stone-700/60 active:bg-stone-700 transition-all cursor-pointer group"
  >
    <MdStorefront 
      size={20} 
      className="shrink-0 text-stone-400 group-hover:text-cyan-400 transition-colors" 
    />
    <span className="hidden lg:block truncate">Ver tienda</span>
  </button>

  <button
    type="button"
    onClick={handleLogout}
    className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 active:bg-red-500/20 transition-colors cursor-pointer group"
  >
    <IoLogOutOutline size={20} className="shrink-0 text-red-400 group-hover:text-red-300 transition-colors" />
    <span className="hidden lg:block truncate">Cerrar sesión</span>
  </button>
</div>
    </div>
  );
};
