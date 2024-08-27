import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegPlusSquare, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { URL } from '../../../common/api';
import { config } from '../../../common/configurations';
import { assessmentEntity } from '../../../interface/assessmentEntity';

function InstructorExamHome() {
  const [examsData, setExamsData] = useState<assessmentEntity[] | null>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getExamDetails();
  }, []);

  const getExamDetails = async () => {
    const response = await axios.get(`${URL}/api/course/getexams`, config);
    setExamsData(response?.data?.data);
  }

  const handleSubmit = () => {
    navigate("/instructor/exams/create")
  }

  const handleUpdate = (examId: string) => {
    console.log("handleupdate",examId)
    navigate(`/instructor/exams/edit/${examId}`)
    // navigate("/instructor/exams/create")
  }

  return (
    <div className='p-6'>
      <div className='flex justify-between mb-6'>
        <h1 className='font-bold text-darkBlue text-2xl'>My Exams</h1>
        <button className='p-3 bg-darkBlue text-white rounded-lg font-bold flex items-center' onClick={handleSubmit}>
          <FaRegPlusSquare className='mr-2' /> Add Exam
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Score</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passing Score</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {examsData && examsData.map((exam) => (
              <tr key={exam._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">{exam.title}</td>
                <td className="px-4 py-4 whitespace-nowrap">{exam.courseId.title}</td>
                <td className="px-4 py-4 whitespace-nowrap">{exam.totalScore}</td>
                <td className="px-4 py-4 whitespace-nowrap">{exam.passingScore}</td>
                <td className="px-4 py-4 whitespace-nowrap">{new Date(exam.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleUpdate(exam._id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FaEdit size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InstructorExamHome