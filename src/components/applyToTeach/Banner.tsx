import React from 'react'
import discussion from "../../assets/applyToTeach/discussion.png"
import TypeWriterAnimation from '../common/TypeWriterAnimati/TypeWriterAnimation'

function Banner() {
  return (
   <>
        <div className=' bg-darkBlue  flex  mt-16 ml-24 me-24 rounded-2xl items-center justify-evenly p-4 '>
        <div className='gap-x-8'>
        <h1 className='font-bold text-white  md:text-4xl text-sm'>Join PubliTech</h1>
        <h1 className='font-bold text-white md:text-4xl text-sm p-3'><TypeWriterAnimation text=' As a mentor' delay={300}/></h1>
        </div>
        <div><img src={discussion} className='' alt="" /></div>
    </div>
   </>
  )
}

export default Banner
