import React, { useState, useEffect } from 'react'
import { CourseEntity } from '../../../../interface/courseEntity';
import axios from 'axios';
import { URL } from '../../../../common/api';
import { config } from '../../../../common/configurations';
import { Player } from '@lottiefiles/react-lottie-player';


const  EnrollmentTable = () => {
  const [ courseData, setCourseData ] = useState<CourseEntity[] | null>([]);
  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(()=>{
    getData();
  },[])

  const getData = async() => {
    try{
    setLoading(true);
    const response = await axios.get(`${URL}/api/course/admin/topEnrollments`,config);
    console.log("🚀 ~ getData ~ response:table", response)
    setCourseData(response?.data?.data);
    setLoading(false);
    }catch(error){
      console.error("error occured in the table data fetching");
      setLoading(false);
    }
  }
  
    
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Top 5 Enrollments</h3>
          { loading? (
             <Player
             autoplay
             loop
             src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
             style={{ height: '125px', width: '120px' }}
         />
          ):(
            <>
               <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">Course Name</th>
                <th className="text-left p-2">Total Enrollments</th>
                <th className="text-left p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {courseData && courseData.length >0 ?(
                courseData?.map((course) => (
                  <tr key={course._id} className="border-b">
                    <td className="p-2">{course?.title}</td>
                    <td className="p-2">{course?.noOfPurchases}</td>
                    <td className="p-2">{course?.pricing?.type === "free" ? course?.pricing?.type : `₹${course?.pricing?.amount}`}</td>
                  </tr>
                ))
              ):(
                <tr>
                  <td colSpan={3} className="text-center p-2">No data available</td>
                </tr>
              )
              }
            </tbody>
          </table>
            </>
          )}
         
        </div>
      );
}

export default EnrollmentTable
