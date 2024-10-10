import  { useEffect, useState } from 'react'
import InstrucorDashboardCard from './InstrucorDashboardCard'
import axios from 'axios';
import { URL } from '../../../../common/api';
import { config } from '../../../../common/configurations';
import SkeletonCard from '../../admin/cardSection/SkeletonCard';

function SummaryCards() {
        const [ loading, setLoading ] = useState<boolean>(false);
        const [ cardData, setCardData ] = useState({
            courseData:0,
            studentsData:0,
            revenueData:0
        })
    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async() => {
        try{
          setLoading(true);
          const [ courseResponse, studentResponse, revenueResopnse ] = await Promise.all([
            axios.get(`${URL}/api/course/instructor/totalCourses`,config),
            axios.get(`${URL}/api/course/instructor/noOfStudentsPurchased`,config),
            axios.get(`${URL}/api/payment//instructor/totalPayment`,config)
          ]);
    
          setCardData({
            courseData: courseResponse?.data?.data,
            studentsData: studentResponse?.data?.data,
            revenueData: revenueResopnse?.data?.data,
          });
    
          setLoading(false)
        }catch(error){
          console.error("error fetching data",error);
          setLoading(false)
        }
      }
    

    
  return (
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {loading? (
                <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
                </>
            ):(
                <>
                <InstrucorDashboardCard title="Total Courses" value={cardData?.courseData} icon="📚" />
                <InstrucorDashboardCard title="Students Taught" value={cardData?.studentsData} icon="👨‍🎓" />
                <InstrucorDashboardCard title="Total Earnings" value={cardData?.revenueData} icon="💰" />  
                </>
            )}
        
          </div>

  )
}

export default SummaryCards
