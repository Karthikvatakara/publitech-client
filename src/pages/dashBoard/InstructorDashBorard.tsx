import SummaryCards from '../../components/dashBoard/instructor/cardSection/SummaryCards';
import CourseCards from '../../components/dashBoard/instructor/secondSection.tsx/CourseCards';
import { useNavigate } from 'react-router-dom';
import InstructorTable from '../../components/dashBoard/instructor/tableSection/InstructorTable';



const InstructorDashBoard = () => {
    const navigate = useNavigate();


    const handleViewCourse = () => {
        navigate("/instructor/course")
    }
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold">Instructor Panel</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <SummaryCards/>
          
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">My Recent Courses</h2>
            <button className="text-darkBlue font-bold bg-gray-300 rounded-lg p-2 hover:text-blue-800" onClick={handleViewCourse}>View All Courses</button>
          </div>
          <CourseCards/>
        </div>
        <InstructorTable/>
      
      </main>
    </div>
  );
};

export default InstructorDashBoard;