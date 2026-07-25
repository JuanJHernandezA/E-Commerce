import { useState } from 'react';
interface Props {
    images: string[];
}
const GridImages = ({images}:Props) => {
    const [activeImage, setActiveImage] = useState(images?.[0] || '');
    const handleImageClick=(image:string)=>{
        setActiveImage(image);
    }
  return (
    <div className='flex-1 flex flex-col gap-3 relative w-full max-w-[500px]'>
        <div className='bg-[f2f2f2] h-[500px] w-full p-4 rounded-xl flex items-center justify-center overflow-hidden'>
            <img src={activeImage} alt='Imagen del Producto'
            className='h-full w-full object-contain pointer-events-none' />
        </div>

        <div className="flex mt-4 gap-2">
            {images.map((image,index) =>(
                <button key={index} onClick={()=>handleImageClick(image)} className={`shrink-0 w-16 h-16 p-1 border-2 rounded-lg transition-all cursor-pointer focus:outline-none ${
              activeImage === image ? 'border-black' : 'border-transparent'
            } hover:border-gray-400`}>
                    <img src={image} alt={`Thumbnail ${index+1}`} className='w-full h-full object-cover rounded-md'/>
                </button>
            ))}
        </div>
    </div>
  )
}

export default GridImages
