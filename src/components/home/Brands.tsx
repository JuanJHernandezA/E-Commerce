import React from 'react'


const brands = [
    {
        image: '/img/brands/Apple-Logo.webp',
        alt: 'Apple',
    },
    {
        image: '/img/brands/Samsung_Logo.webp',
        alt: 'Samsung',
    },
    {
        image: '/img/brands/xiaomi-logo.webp',
        alt: 'Xiaomi',
    },
    {
        image: '/img/brands/huawei-logo.png',
        alt: 'Huawei',
    },
    {
        image: '/img/brands/honor-logo.png',
        alt: 'Honor',
    },
    {
        image: '/img/brands/realme-logo.webp',
        alt: 'Realme',
    }
]
const Brands = () => {
  return (
    <div className='flex flex-col items-center gap-3 pt-16 pb-12'>
      <h2 className="font-bold text-2xl">
        Marcas que disponemos
      </h2>
      <p className="w-2/3 text-center text-sm md:text-base">
      Tenemos lo más moderno en tecnología y los últimos modelos de celulares disponibles</p>

      <div className="grid grid-cols-3 gap-6 mt-8 items-center md:grid-cols-6">
        {brands.map((brand, index) => (
            <div key={index} className="flex items-center justify-center">
                <img src={brand.image} alt={brand.alt} className='w-20 h-20 object-contain' />
            </div>
        ))}
      </div>
    </div>
  )
}

export default Brands
