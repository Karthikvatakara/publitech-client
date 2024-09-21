import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInstructorCourse } from '../../../redux/actions/course/courseActons';
import CourseCardInstructor from '../../../components/instructor/CourseCardInstructor';
import { CourseEntity } from '../../../interface/courseEntity';
import { AppState, RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { SerializedError } from '@reduxjs/toolkit';
import { Player } from '@lottiefiles/react-lottie-player';


const CourseListPage = () => {
    const { courses, loading, error, totalPages, currentPage } = useSelector((state: RootState) => state.courses);
    const dispatch = useDispatch<AppState>();
    const navigate = useNavigate();
    
    const [search, setSearch] = useState<string>();
    const [stage, setStage] = useState('');
    const [ isLoading,setIsLoading ] = useState<boolean>(false)
    
    // useEffect(() => {
    //     fetchCourses(); 
    // }, [currentPage, stage, search]);

    useEffect(() => {
        setIsLoading(true)
        fetchCourses();
    }, [currentPage, stage, search]);

   
    const fetchCourses = () => {
        dispatch(getAllInstructorCourse({ page: currentPage, limit: 6, search, stage }));
        setIsLoading(false);
    };

    const handleAddCourse = () => {
        navigate("/instructor/createcourse");
    };

    const handlePageChange = (newPage: number) => {
        dispatch(getAllInstructorCourse({ page: newPage, limit: 6, search, stage }));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStage(e.target.value);
    };

    if (loading) {
        return <div className="text-center py-10">
           <Player
          autoplay
          loop
          src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
          style={{ height: '115px', width: '110px' }}
        />
        </div>;
      }
    
      if (error) {
        return <div className="text-center py-10 text-red-500">Error: {error as SerializedError || 'Failed to load courses'}</div>;
        }     


    // if (error) {
    //     return <div className="text-center py-10 text-red-500">Error: {error as SerializedError || 'Failed to load courses'}</div>;
    // }

    return (

        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-darkBlue">My Courses</h1>
                <button
                    onClick={handleAddCourse}
                    className="bg-darkBlue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                    Add Course
                </button>
            </div>

            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={search}
                    onChange={handleSearch}
                    className="p-2 border rounded mr-2"
                />
                <select
                    value={stage}
                    onChange={handleStageChange}
                    className="p-2 border rounded"
                    >
                    <option value="">All Stages</option>
                    <option value="requested">Pending</option>
                    <option value="accepted">Published</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

                     {isLoading &&   <Player
                        autoplay
                        loop
                        src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
                        style={{ height: '250px', width: '250px' }}
                     />} 
                     
            {courses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-4">
                    <Player
                        autoplay
                        loop
                        src="https://lottie.host/f1f86a63-e042-4e92-8f92-8eba70f38a69/2pzqd7M4BA.json"
                        style={{ height: '300px', width: '300px' }}
                     />

                </div>
            ) : (
              <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.isArray(courses) && courses.map((course: CourseEntity) => (
                            <CourseCardInstructor key={course._id.toString()} {...course} />
                        ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`mx-1 px-3 py-1 rounded ${
                                    currentPage === page ? 'bg-darkBlue text-white' : 'bg-gray-200'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </>
            )}
            
                    {/* {loading &&   <Player
                        autoplay
                        loop
                        src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
                        style={{ height: '250px', width: '250px' }}
                     />}  */}
        </div>
    );
};

export default CourseListPage;