import { ImSpinner9 } from 'react-icons/im';
const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <ImSpinner9 className='animate-spin' size={70} />
    </div>
  )
}

export default Loader
