import React from 'react'
import fourthGrid from "../../assets/grids/fourth.png"
import LandPageStudent from "../../assets/landPagestudent.png"

function Banner() {
  return (
    <div>
        <div className='lg:grid lg:grid-cols-2 flex flex-col-reverse bg-darkBlue'>
                <div className='col-span-1 relative'>
                    <div className='absolute'>
                        <img src={fourthGrid} alt="" className='mt-2 filter grayscale blur-2xl contrast-200'/>
                    </div>
                    <div className='flex flex-col mt-36 gap-2 ms-24'>
                    <h1 className='text-white font-semibold text-xl'>Learn without Limits</h1>
                    <h1 className='text-white font-bold text-6xl'>crack your Goal </h1>
                    <h1 className='text-white font-bold text-6xl'>with india's top</h1>
                    <h1 className='text-white font-bold text-6xl'>educators</h1>
                    </div>
                </div>
                <div className='col-span-1 relative'>
                    <img src={fourthGrid} alt="" className='absolute  mt-[280px] filter grayscale blur-2xl contrast-200' />
                    <img src={LandPageStudent} alt="" className='w-[550px]'/>
                </div>
            </div>
    </div>
  )
}

export default Banner
