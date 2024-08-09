import React from 'react';
import { FaBookBookmark, FaUser, FaTrophy, FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { EnrollmentEntity } from '../../../interface/EnrollmentEntity';

interface UserCourseCardProps {
  enrollment: any;
}

const UserCourseCard: React.FC<UserCourseCardProps> = ({ enrollment }) => {
  const navigate = useNavigate();
  const showCourseDetailPage = (courseId: string) => {
    console.log(courseId);
    navigate(`/student/courses/${courseId}`);
    
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <img 
          src={enrollment?.courseId?.thumbnail} 
          className="w-full h-full object-cover"
          alt={enrollment?.courseId?.title} 
        />
        <div className="absolute top-2 right-2 bg-yellow-400 text-white p-1 rounded">
          <FaStar className="inline mr-1" />
          <span>4.5</span>
        </div>
      </div>
      <div className="p-6">
        <h2 className="font-bold text-xl mb-2 truncate">{enrollment?.courseId?.title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{enrollment?.courseId?.description}</p>
        <div className="flex justify-between text-sm mb-4 p-1">
          <div className='flex items-center text-gray-500'>
            <FaBookBookmark className="mr-1" />
            <span>{enrollment?.courseId?.lessons?.length} Lessons</span>
          </div>
          <div className='flex items-center text-gray-500'>
            <FaUser className="mr-1" />
            <span>{enrollment?.courseId?.noOfPurchases} </span>
          </div>
          <div className='flex items-center text-blue-600'>
            <FaTrophy className="mr-1" />
            <span className='font-semibold'>Advanced</span>
          </div>
        </div>
        <button 
          className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300'
          onClick={() => showCourseDetailPage(enrollment?.courseId?._id)}
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
}

export default UserCourseCard;