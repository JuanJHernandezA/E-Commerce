
import { FaEye } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface Props {
    id_category: number;
    img:string;
     name_category:string; description: string | null;
}

const CardCategory = ({id_category, img,name_category, description}:Props) => {
  return (
   <div className="flex flex-col gap-6 relative">
      <Link to={`/celulares?category=${name_category}`} className='group relative flex overflow-hidden'>
        <div className="flex h-[350px] w-full items-center justify-center py-2 lg:h-[250px] " >
            <img src={img} alt={name_category} className="object-contain rounded-3xl h-[200px] w-[200px] " />
            
        </div>
        <button className='bg-white border border-slate-200 absolute w-full bottom-0 py-3 rounded-3xl flex items-center justify-center 
        gap-1 text-sm font-medium hover:bg-stone-100 translate-y-[100%] transition-all duration-300 group-hover:translate-y-0'>
            <FaEye />
            Ver productos
        </button>
      </Link>

      <div className="flex flex-col gap-1 items-center">
        <p className='text-[15px] font-medium'>
            {name_category}
        </p>
        

      </div>

      
    </div>
  )
}

export default CardCategory
