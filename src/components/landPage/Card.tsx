import React from 'react'
import { FaBookBookmark } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";
// import { MdNavigateNext } from "react-icons/md";
import { FaStarAndCrescent } from "react-icons/fa6";
import eCourse1 from "../../assets/cards/istockphoto-1290864946-612x612 (1).jpg"



export default function Card() {
  return (
  <>
    <div className="h-fit mt-14 bg-white flex items-center justify-center">
  <div className="bg-gray-50 text-grey-700 w-72  flex flex-wrap min-h-[100px]  shadow-2xl rounded-xl  justify-center hover:scale-105 cursor-pointer duration-300">
    <img src={eCourse1} className='rounded-t-md' alt="" />
    <div className="p-3 flex-col space-y-3 text-sm">
        <div className='flex justify-center '>
        <h1 className="font-semibold">Learn figma ui/ux essential Learning</h1>
        </div>
        <div className=" flex  space-x-4 justify-between ">
            <div className='flex text-gray-500'>
            <FaBookBookmark />
              <h1 className='text-xs text-black'> Lessons:25</h1>
              </div>
            <div className='flex text-gray-500'>
                <FaUser/>
                <h1 className='text-xs text-black'>Students:122</h1>
            </div>
            <div className='flex text-gray-500'>
                <FaTrophy/>
                <h1 className='text-xs text-darkBlue font-extrabold '>Advanced</h1>
            </div>
        </div>
    </div>
    <div className='flex items-center '>
        <div className='border border-darkBlue p-2 m-4  text-darkBlue rounded-xl flex hover:bg-darkBlue hover:border-white hover:text-white hover:font-bold font-bold duration-300'> Start Course</div>
        <div className=' flex ms-24 justify-baseline text-yellow-400'><h1 className=''></h1><FaStarAndCrescent/></div>
    </div>
  </div>
</div>
  </>
  )
}
