import RevenueCard from './RevenueCard';
import StudentsCard from './StudentsCard';
import InstructorCard from './InstructorCard';
import  { useEffect, useState } from 'react'
import { config } from '../../../../common/configurations';
import axios from 'axios'
import { URL } from '../../../../common/api';
import SkeletonCard from './SkeletonCard';

function SummaryCards() {
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ cardData, setCardData ] = useState({ revenue: 0,
    studentsData:0,
    instructorData:0
  })

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async() => {
    try{
      setLoading(true);
      const [ revenueResponse, studentResponse, instructorResopnse ] = await Promise.all([
        axios.get(`${URL}/api/payment/admin/totalPayments`, config),
        axios.get(`${URL}/api/auth/admin/studentCount`, config),
        axios.get(`${URL}/api/auth/admin/instructorCount`, config)
      ]);
      console.log("🚀 ~ fetchData ~ instructorResopnse:", instructorResopnse)
      console.log("🚀 ~ fetchData ~ revenueResponse:", revenueResponse)
      console.log("🚀 ~ fetchData ~ studentResponse:", studentResponse)

      setCardData({
        revenue: revenueResponse?.data?.data,
        studentsData: studentResponse?.data?.data,
        instructorData: instructorResopnse?.data?.data
      });

      setLoading(false)
    }catch(error){
      console.error("error fetching data",error);
      setLoading(false)
    }
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    {loading ? (
      <>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </>
    ) : (
      <>
        <RevenueCard data={cardData.revenue} />
        <StudentsCard data={cardData.studentsData} />
        <InstructorCard data={cardData.instructorData} />
      </>
    )}
  </div>
  )
}

export default SummaryCards
