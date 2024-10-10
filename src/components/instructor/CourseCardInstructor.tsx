import { useState,useEffect } from 'react';
import { FaBookBookmark, FaUser, FaTrophy, FaStarAndCrescent } from "react-icons/fa6";
import { CourseEntity } from '../../interface/courseEntity';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../common/configurations';
import { URL } from '../../common/api';

export default function CourseCardInstructor(course: CourseEntity) {
  const navigate = useNavigate();
  const [ courseData,setCourseData ] = useState<CourseEntity | null>(null);

  const showCourseDetailPage = (courseId: string) => {
    navigate(`/instructor/course/${courseId}`);
  }

  useEffect(() => {
    setCourseData(course)
  },[])
  const getStatusColor = (stage: string) => {
    switch (stage) {
      case 'requested':
        return 'bg-yellow-500';
      case 'accepted':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  const getStatusText = (stage: string) => {
    switch (stage) {
      case 'requested':
        return 'Pending';
      case 'accepted':
        return 'Published';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }

  const handleCourseStatus = async(id:string,status:string) => {
    console.log(id,status,"aaaaaaaaa")
    // const data = {status:status}
    const response = await axios.put(`${URL}/api/course/CourseStatusByinstructor/${id}`,{status},config);
    console.log(response,"aaaaaaaaaaaa")
    setCourseData(response.data.data)
  }
  return (
    <div className="mt-14 flex items-center justify-center">
      <div className="bg-gray-50 text-grey-700 w-72 min-h-[400px] flex flex-col shadow-2xl rounded-xl hover:scale-105 cursor-pointer duration-300">
        <div className="h-48 overflow-hidden rounded-t-xl">
          <img 
            src={courseData?.thumbnail} 
            className="w-full h-full object-cover"
            alt={course?.title} 
          />
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h1 className="font-semibold text-center mb-3">{course?.title}</h1>
            <div className="flex justify-between text-xs">
              <div className='flex items-center text-gray-500'>
                <FaBookBookmark className="mr-1" />
                <span className='text-black'>Lessons: {courseData?.lessons?.length}</span>
              </div>
              <div className='flex items-center text-gray-500'>
                <FaUser className="mr-1" />
                <span className='text-black'>Students: { courseData?.noOfPurchases}</span>
              </div>
              <div className='flex items-center text-gray-500'>
                <FaTrophy className="mr-1" />
                <span className='text-darkBlue font-extrabold'>Advanced</span>
              </div>
            </div>
          </div>
          {courseData?.stage === "requested" ? (
            courseData?.isBlockedInstructor ? (
                <div className="flex justify-center text-green-500 border-2 border-green-500 rounded-md font-bold p-1 hover:bg-green-500 hover:text-white hover:border-0" onClick={() => handleCourseStatus(course._id,"unblock")}>unblock</div>
            ):(
              <div className='flex justify-center text-red-500 border-2 border-red-500 rounded-md font-bold p-1 hover:bg-red-500 hover:text-white hover-border-0' onClick={() =>handleCourseStatus(course._id,"block")}>Blcock</div>
            )
          ):(
            <></>
          )}
          <div className='flex items-center justify-between mt-4'>
            <button className='border border-darkBlue p-2 text-darkBlue rounded-xl hover:bg-darkBlue hover:text-white hover:font-bold transition-all duration-300'
              onClick={() => showCourseDetailPage(course?._id.toString())}>
              View Course
            </button>
            <div className='flex items-center'>
              <div className={`w-16 flex justify-center items-center h-5 text-white text-sm rounded-xl ${getStatusColor(course?.stage || 'unknown')} mr-2`} ><h1></h1>{getStatusText(String(course?.stage))}</div>
              <div className='text-yellow-400'>
                <FaStarAndCrescent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
