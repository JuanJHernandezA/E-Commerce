
export const AboutPage = () => {
  return (
    <div className='space-y-5 max-w-6xl mx-auto'>
      <h1 className="text-center text-4xl font-semibold tracking-tight mb-5">
        Nuestra empresa
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
        
        {/* Columna Izquierda: Imagen */}
        <img 
          src='https://www.ceupe.com/images/easyblog_articles/3089/b2ap3_amp_que-es-una-empresa-concepto-definicion.jpg' 
          alt='Imagen de fondo' 
          className='h-[400px] md:h-[500px] w-full object-cover rounded-xl shadow-sm'
        />

        {/* Columna Derecha: Bloque de Texto */}
        <div className="flex flex-col gap-4 tracking-tight leading-7 text-base font-normal text-slate-800">
          <p>
            TechFull es una tienda en línea que se dedica a la venta de dispositivos electrónicos. Nuestro objetivo es ofrecer a nuestros clientes la mejor calidad y precio en 
            dispositivos. Contamos con un equipo de profesionales que se encargan de seleccionar los mejores productos para ti.
          </p>
          
          <p>
            En TechFull podrás encontrar una amplia variedad de dispositivos de las mejores marcas.
            Además, contamos con promociones y descuentos exclusivos para que puedas comprar tu celular al mejor precio.
          </p>
          
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-4 mb-2 text-slate-900">
            ¡No esperes más y compra un dispositivo en TechFull!
          </h2>
          
          <p className='text-sm text-slate-600'>
            Para más información, no dudes en ponerte en contacto con nosotros a través de nuestro correo electrónico:{' '}
            <a href='mailto:correo@techfull.com' className=' hover:underline font-medium'>correo@techfull.com</a>{' '}
            o llamando al{' '}
            <a href='tel:3211112233' className=' hover:underline font-medium'>3211112233</a>.
          </p>
        </div>

      </div>
    </div>
  )
}


