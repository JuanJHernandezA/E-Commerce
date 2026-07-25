import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import type { VariantProduct } from '../../interfaces';
import { formatPrice } from '../../helpers';
import Tag from '../shared/Tag';
import { useCartStore } from '../../store/cart.store';
import toast from 'react-hot-toast';


interface Props {
    img:string;
     name:string; price:number; slug: string; colors:{name:string, color:string}[]; variants: VariantProduct[];
}
const CardProduct = ({ img, name, price,  slug, colors, variants }: Props) => {

    const [activeColor, setActiveColor] = useState
    <{name:string, color:string}>(colors[0]);

    const addItem= useCartStore(state=>state.addItem);
    const handleAddClick =(e: React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault();

      if(selectedVariant && selectedVariant.stock>0){
        addItem({variantId:selectedVariant.id,
          productId:slug,
          name,
          image:img,
          color:activeColor.name,
          storage:selectedVariant.storage,
          price: selectedVariant.price,
          quantity: 1
        })
        toast.success('Producto añadido al carrito', {
          position:'bottom-right'
        })
      } else{
        toast.error('Producto agotado', {
          position:'bottom-right'
        })
      }
    }

    const selectedVariant = variants.find(variant=>variant.color === activeColor.color);

    const stock = selectedVariant ? selectedVariant.stock : 0;

  return (
 
    <div className="group relative flex flex-col gap-4 rounded-2xl bg-white p-3 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">

  <div className="relative overflow-hidden rounded-xl bg-slate-50">
    <Link to={`/productos/${slug}`} className="block">
      <div className="flex h-[280px] sm:h-[300px] lg:h-[240px] w-full items-center justify-center p-4">
        <img
          src={img}
          alt={name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </Link>


    {stock > 0 && (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault(); 
          handleAddClick(e);
        }}
        className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 py-2.5 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 md:translate-y-[120%] md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 cursor-pointer"
      >
        <FiPlus size={16} />
        Añadir al carrito
      </button>
    )}


    {stock === 0 && (
      <div className="absolute top-2 left-2 z-10">
        <Tag contentTag="agotado" />
      </div>
    )}
  </div>


  <div className="flex flex-col gap-2 items-center text-center px-1">

    <Link to={`/productos/${slug}`} className="hover:text-cyan-600 transition-colors line-clamp-1">
      <h3 className="text-sm font-medium text-slate-800" title={name}>
        {name}
      </h3>
    </Link>

    <p className="text-base font-bold text-slate-900">
      {formatPrice(price)}
    </p>


    {colors && colors.length > 0 && (
      <div className="flex items-center justify-center gap-2 pt-1">
        {colors.map((color) => {
          const isActive = activeColor.color === color.color;
          return (
            <button
              key={color.color}
              type="button"
              onClick={() => setActiveColor(color)}
              aria-label={`Seleccionar color ${color.name || color.color}`}
              className={`flex items-center justify-center w-5 h-5 rounded-full transition-all cursor-pointer ${
                isActive
                  ? 'ring-1 ring-slate-600 ring-offset-2 scale-110'
                  : 'hover:scale-105 border border-slate-200'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full shadow-inner"
                style={{ backgroundColor: color.color }}
              />
            </button>
          );
        })}
      </div>
    )}
  </div>
</div>
  )
}

export default CardProduct
