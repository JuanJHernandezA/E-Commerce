import { FaEye } from 'react-icons/fa6';
import { Link } from 'react-router-dom';


interface Props {

    img:string;
     name_brand:string 
}

const CardBrand = ({ img,name_brand}:Props) => {
  
  return (

    <div className="group relative flex flex-col gap-4 rounded-2xl bg-white p-3 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
  <div className="relative overflow-hidden rounded-xl bg-slate-50">
    <Link to={`/productos?brand=${name_brand}`} className="block">
      <div className="flex h-[280px] sm:h-[300px] lg:h-[240px] w-full items-center justify-center p-4">
        <img
          src={img}
          alt={name_brand}
          className="h-[200px] w-[200px] object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </Link>

    <Link
      to={`/productos?brand=${name_brand}`}
      className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-2 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 py-2.5 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 md:translate-y-[120%] md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 cursor-pointer"
    >
      <FaEye size={15} />
      Ver productos
    </Link>
  </div>

  <div className="flex flex-col gap-1 items-center text-center px-1 pb-1">
    <Link 
      to={`/productos?brand=${name_brand}`} 
      className="hover:text-cyan-600 transition-colors line-clamp-1"
    >
      <h3 className="text-base font-semibold text-slate-800" title={name_brand}>
        {name_brand}
      </h3>
    </Link>
  </div>
</div>
  )
}

export default CardBrand
