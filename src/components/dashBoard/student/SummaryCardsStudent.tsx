import { useEffect, useState } from 'react'
import InstrucorDashboardCard from '../instructor/cardSection/InstrucorDashboardCard'
import axios from 'axios';
import { URL } from '../../../common/api';
import { config } from '../../../common/configurations';
import SkeletonCard from '../admin/cardSection/SkeletonCard';

const  SummaryCardsStudent = () => {
  const [ loading, setLoading ] = useState<boolean>(false);

  const [ courseData, setCourseData ] = useState({
    totalCourses:0,
    completedCourses:0,
    onGoingCourses:0
  })

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async() => {
      try{
        setLoading(true);
          const [ totalCourseResponse, completedResponse, onGoingCourseResponse ] = await Promise.all([
             axios.get(`${URL}/api/course/student/noOfEnrolledCourses`,config),
             axios.get(`${URL}/api/course/student/noOfCompletedEnrollments`,config),
             axios.get(`${URL}/api/course/student/onGoingCourses`,config)
          ])
          console.log("🚀 ~ fetchData ~ courseResonse:", totalCourseResponse)
          console.log("🚀 ~ fetchData ~ revenueResponse:", completedResponse)
          console.log("🚀 ~ fetchData ~ studentResponse:", onGoingCourseResponse)
    
          setCourseData({
            totalCourses: totalCourseResponse?.data?.data,
            completedCourses: completedResponse?.data?.data,
            onGoingCourses: onGoingCourseResponse?.data?.data,
          });
    
          setLoading(false)
      }catch(error){
        console.error("error occured in the fetchdata",error);
        setLoading(false);
      }
    
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-4 mb-6">
      { loading? (
        [...Array(3)].map((_,index)=>(
          <SkeletonCard key={index}/>
        ))
      ):(
        <>
        <InstrucorDashboardCard title="Total Enrollments" value={courseData?.totalCourses} icon="🎓" />
       <InstrucorDashboardCard title="completed Courses" value={courseData?.completedCourses} icon="📚"  />
       <InstrucorDashboardCard title="Ongoing courses" value={courseData?.onGoingCourses} icon="📊" />  
        </>
      )}
    </div>
  )
}

export default SummaryCardsStudent
