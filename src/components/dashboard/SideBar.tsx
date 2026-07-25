import { useState } from "react";
import { IoCloseOutline, IoLogOutOutline, IoMenuOutline } from "react-icons/io5";
import { MdStorefront } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "../../actions";
import { dashboardLinks } from "../../constants/links";
import { Logo } from "../shared/Logo";

export const SideBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-stone-800 text-white p-2 rounded-md cursor-pointer"
      >
        <IoMenuOutline size={24} />
      </button>

    
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      
      <div
        className={`fixed top-0 left-0 h-screen bg-stone-800 text-white flex flex-col gap-10 items-center p-5 z-50 transition-transform duration-300
        w-[250px]
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:w-[120px] lg:w-[250px]`}
      >
        
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 md:hidden text-white cursor-pointer"
        >
          <IoCloseOutline size={24} />
        </button>

        <Logo isDashboard />
        <nav className="w-full space-y-5 flex-1">
          {dashboardLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={({
                isActive,
              }) =>
                `flex items-center gap-3 py-3 pl-5 transition-all duration-300 rounded-md ${isActive ? "text-white bg-cyan-600" : "hover:text-white hover:bg-cyan-600"}
              md:pl-0 md:justify-center lg:pl-5 lg:justify-start`
              }
            >
              {link.icon}
              <p className="font-semibold md:hidden lg:block">{link.title}</p>
            </NavLink>
          ))}
        </nav>
        <div className="w-full flex flex-col gap-2 pt-4 border-t border-stone-700/60">
          <button
            type="button"
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-stone-300 hover:text-white hover:bg-stone-700/60 active:bg-stone-700 transition-all cursor-pointer group justify-start md:justify-center lg:justify-start"
          >
            <MdStorefront
              size={20}
              className="shrink-0 text-stone-400 group-hover:text-cyan-400 transition-colors"
            />
            <span className="truncate md:hidden lg:block">Ver tienda</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 active:bg-red-500/20 transition-colors cursor-pointer group justify-start md:justify-center lg:justify-start"
          >
            <IoLogOutOutline
              size={20}
              className="shrink-0 text-red-400 group-hover:text-red-300 transition-colors"
            />
            <span className="truncate md:hidden lg:block">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </>
  );
};
