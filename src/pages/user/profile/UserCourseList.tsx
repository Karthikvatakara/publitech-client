import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, RootState } from '../../../redux/store';
import { userEnrollments } from '../../../redux/actions/enrollment/enrollmentActions';
import { EnrollmentEntity } from '../../../interface/EnrollmentEntity';
import UserCourseCard from '../common/UserCourseCard';

const UserCourseList: React.FC = () => {
  const dispatch = useDispatch<AppState>();
  const { enrollments, loading, error } = useSelector((state: RootState) => state.enrollments);

  useEffect(() => {
    dispatch(userEnrollments());
  }, [dispatch]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Enrolled Courses</h1>
      {enrollments && enrollments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrollments.map((enrollment: EnrollmentEntity) => (
            <UserCourseCard key={enrollment._id} enrollment={enrollment} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No enrollments found.</div>
      )}
    </div>
  );
};

export default UserCourseList;