import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, RootState } from '../../../redux/store';
import { userEnrollments } from '../../../redux/actions/enrollment/enrollmentActions';
import { EnrollmentEntity } from '../../../interface/EnrollmentEntity';
import UserCourseCard from '../common/UserCourseCard';
import { Player } from '@lottiefiles/react-lottie-player';
import CourseCardSkeleton from '../../../components/common/skeleton/CourseCardSkeleton';

const UserCourseList: React.FC = () => {
  const dispatch = useDispatch<AppState>();
  const { enrollments, loading } = useSelector((state: RootState) => state.enrollments);

  useEffect(() => {
    dispatch(userEnrollments());
  }, [dispatch]);

  // if (error) {
  //   return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Enrolled Courses</h1>
      {loading ? (
        <>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
       {Array.from({ length: 6 }).map((_, index) => (
      <CourseCardSkeleton key={index} />
    ))}
        </div>
        </>
      ) : enrollments && enrollments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrollments.map((enrollment: EnrollmentEntity) => (
            <UserCourseCard key={enrollment._id} enrollment={enrollment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <Player
            autoplay
            loop
            src="https://lottie.host/f1f86a63-e042-4e92-8f92-8eba70f38a69/2pzqd7M4BA.json"
            style={{ height: '250px', width: '250px' }}
          />
          <p className="font-semibold text-gray-400 text-center">No Enrollments found</p>
        </div>
      )}
    </div>
  );
};

export default UserCourseList;
