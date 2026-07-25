import { Link } from "react-router-dom"

interface Props {
    isDashboard?:boolean
}

export const Logo = ({isDashboard}:Props) =>{
    return (
   <Link
  to="/"
  className={`inline-flex items-center transition-all duration-300 ${
    isDashboard ? "hover:scale-105 active:scale-95" : ""
  }`}
>
        
        

  <p className="hidden lg:block text-2xl font-black tracking-tight select-none">

    <span className="text-slate-900">Tech</span>

    <span 
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: "linear-gradient(135deg, #38BDF8 0%, #2563EB 50%, #1E3A8A 100%)" }}
    >
      Full
    </span>
  </p>


  <div className="lg:hidden flex items-center justify-center w-10 h-10">
     <img src="/logo.svg" alt="Logo TF" className="w-10 h-10" />
    {/* <p className="flex text-2xl font-black select-none leading-none">
      <span className="-skew-x-6 text-slate-900">T</span>
      <span
        className="skew-x-6 bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(135deg, #38BDF8 0%, #2563EB 50%, #1E3A8A 100%)" }}
      >
        F
      </span>
    </p> */}
  </div>
</Link>
    
    )
}