import  { FC } from 'react'
import { GridLoader } from 'react-spinners'

const LoadingSpinner:FC = ()=> {
  return (
    <div className='min-h-screen w-full bg-white flex justify-center items-center'>
     <GridLoader
        color="#300370"
        size={20}
    />
    </div>
  )
}

export default LoadingSpinner