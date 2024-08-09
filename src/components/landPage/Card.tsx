import React,{ FC,useEffect } from 'react'
import { FaBookBookmark } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";
// import { MdNavigateNext } from "react-icons/md";
import { FaStarAndCrescent } from "react-icons/fa6";
import { CourseEntity } from '../../interface/courseEntity';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface cardProps {
  course:CourseEntity
}



 const Card: React.FC<cardProps> = ({course}) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  },[])
  
  const handleStartCourse = (id:string) => {
    console.log(id,"lllllllllllllllll");
    navigate(`/courses/${id}`)
}
  return (
  <>
    <div className="h-fit mt-14 bg-white flex items-center justify-center" data-aos="zoom-in">
  <div className="bg-gray-50 text-grey-700 w-72  flex flex-wrap min-h-[100px]  shadow-2xl rounded-xl  justify-center hover:scale-105 cursor-pointer duration-300">
  <img 
  src={course.thumbnail} 
  className='rounded-t-md' 
  style={{ width: '288px', height: '192px', objectFit: 'cover' }}
  alt={course.title} 
/>    <div className="p-3 flex-col space-y-3 text-sm">
        <div className='flex justify-center '>
        <h1 className="font-semibold">{course?.title}</h1>
        </div>
        <div className=" flex  space-x-4 justify-between ">
            <div className='flex text-gray-500'>
            <FaBookBookmark />
              <h1 className='text-xs text-black'> Lessons:{ course?.lessons.length }</h1>
              </div>
            <div className='flex text-gray-500'>
                <FaUser/>
                <h1 className='text-xs text-black'>Students:{course?.noOfPurchases}</h1>
            </div>
            <div className='flex text-gray-500'>
                <FaTrophy/>
                <h1 className='text-xs text-darkBlue font-extrabold '>Advanced</h1>
            </div>
        </div>
    </div>
    <div className='w-full flex items-center justify-between p-4'>
  <div className='flex-shrink-0'>
    <button className='border border-darkBlue px-4 py-2 text-darkBlue rounded-xl hover:bg-darkBlue hover:text-white font-bold transition duration-300
    ' onClick={() => handleStartCourse(course._id.toString())}>
      Start Course
    </button>
  </div>
  <div className='flex items-center space-x-2'>
    <h1 className='font-bold text-green-500'>
      {course.pricing.type === "free" ? "Free" : `₹${course.pricing.amount}`}
    </h1>
    <div className='text-yellow-400'>
      <FaStarAndCrescent />
    </div>
  </div>
</div>
  </div>
</div>
  </>
  )
}

export default Card