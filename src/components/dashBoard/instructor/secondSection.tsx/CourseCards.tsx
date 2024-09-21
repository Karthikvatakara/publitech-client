import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URL } from '../../../../common/api';
import { config } from '../../../../common/configurations';
import { CourseEntity } from '../../../../interface/courseEntity';
import CourseCardInstructor from '../../../instructor/CourseCardInstructor';
import { Player } from '@lottiefiles/react-lottie-player';
import CourseCardSkeleton from '../../../common/skeleton/CourseCardSkeleton';

const CourseCards = () => {
    const [ courseData, setCourseData ] = useState<CourseEntity[] |null>([]);
    const [ loading,setLoading ] = useState<boolean>(false);
    useEffect(()=>{
        getData();
    },[]);

    const getData = async() => {
        try{
            setLoading(true)
            const response = await axios.get(`${URL}/api/course/instructor/instructorCourses`,config);
            console.log("🚀 ~ getData ~ response:1212221", response);
            setCourseData(response?.data?.data);
            setLoading(false)
        }catch(error){
            console.error("error in the getdata",error);
            setLoading(false);
        }   
    }
   
    if(loading) {
        return (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {[...Array(3)].map((_,index) => (
                <CourseCardSkeleton key={index}/>
            ))}
          </div>
        )
    }
  return (
    <div>
            {Array.isArray(courseData) && courseData.length > 0 ?(
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courseData.map((course)=> (
                    <CourseCardInstructor key={course._id.toString()} {...course} />

                ))}
          </div>
            ):(
                <div className='flex-col justify-center items-center h-full w-full'>
                    
                    <Player
                        autoplay
                        loop
                        src="https://lottie.host/f1f86a63-e042-4e92-8f92-8eba70f38a69/2pzqd7M4BA.json"
                        style={{ height: '300px', width: '300px' }}
                     />
                    <p className='flex justify-center items-center font-bold text-gray-600'> no courses found</p>
                </div>
            )}
    </div>
  )
}

export default CourseCards
