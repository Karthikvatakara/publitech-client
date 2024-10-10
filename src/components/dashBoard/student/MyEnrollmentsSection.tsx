import axios from 'axios';
import  { useEffect, useState } from 'react'
import { URL } from '../../../common/api';
import { config } from '../../../common/configurations';
import StudentCourseCard from './StudentCourseCard';
import { Player } from '@lottiefiles/react-lottie-player';
import SkeletonStudentDashboardCards from './SkeletonStudentDashboardCards';

function MyEnrollmentsSection() {
    const [ course, setCourse ] = useState<any[]>([])
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        getData();
    },[]);

    const getData = async() => {
       try{
        setLoading(true);
        const response = await axios.get(`${URL}/api/course/student/enrolledCourses`, config);
        setCourse(response?.data?.data)
        setLoading(false);
       }catch(error){
        console.error("Error occurred in the My Enrollments section");
        setLoading(false);
       }
    }
    if (loading) {
        return (
            <>
                {[...Array(3)].map((_, index) => (
                    <SkeletonStudentDashboardCards key={index} />
                ))}
            </>
        );
    }
    
  return (
    <div>
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">My Enrollments</h2>
        
        {Array.isArray(course) && course.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.map((courseItem, index) => (
              <StudentCourseCard 
                key={index}
                title={courseItem?.courseId?.title}
                enrollDate={courseItem?.enrolledAt}
                completion={Number(courseItem?.completionPercentage)}
                image={courseItem?.courseId?.thumbnail}
              />
            ))}
          </div>
        ) : (
          <div className='flex-col justify-center items-center w-full'>
            <Player
              autoplay
              loop
              src="https://lottie.host/f1f86a63-e042-4e92-8f92-8eba70f38a69/2pzqd7M4BA.json"
              style={{ height: '300px', width: '300px' }}
            />
            <p className=' flex justify-center items-center font-bold text-gray-600'>No Enrollments Found</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default MyEnrollmentsSection;
