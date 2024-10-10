import axios from 'axios';
import  { useEffect, useState } from 'react';
import { FaRegPlusSquare, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { URL } from '../../../common/api';
import { config } from '../../../common/configurations';
import { Player } from '@lottiefiles/react-lottie-player';
import { PopulatedAssessmentEntity } from '../../../interface/populatedAssessmentEntity';

function InstructorExamHome() {
  const [examsData, setExamsData] = useState<PopulatedAssessmentEntity[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    getExamDetails();
  }, []);

  const getExamDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/api/course/getexams`, config);
      setExamsData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exam details:", error);
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    navigate("/instructor/exams/create");
  };

  const handleUpdate = (examId: string) => {
    navigate(`/instructor/exams/edit/${examId}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="font-bold text-darkBlue text-2xl">My Exams</h1>
        <button
          className="p-3 bg-darkBlue text-white rounded-lg font-bold flex items-center"
          onClick={handleSubmit}
        >
          <FaRegPlusSquare className="mr-2" /> Add Exam
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Score
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Passing Score
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  <Player
                    autoplay
                    loop
                    src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
                    style={{ height: '100px', width: '100px' }}
                  />
                </td>
              </tr>
            ) : examsData && examsData.length > 0 ? (
              examsData.map((exam) => (
                <tr key={exam._id.toString()} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">{exam.title}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{exam.courseId.title}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{exam.totalScore}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{exam.passingScore}</td>
                  <td className="px-4 py-4 whitespace-nowrap">      {exam.createdAt ? new Date(exam.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleUpdate((exam._id).toString())}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FaEdit size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  <p className='text-gray-700 font-bold'>No Exams Found.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InstructorExamHome;
