import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL } from '../../common/api';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import Pagination from '../../components/common/Pagination';
import { config } from '../../common/configurations';
import { Player } from '@lottiefiles/react-lottie-player';
import { CoursePopulated } from '../../interface/coursePopulated';

function CourseApproval() {
    const [courseDetails, setCourseDetails] = useState<CoursePopulated[]>([]);
    const [totalCourses, setTotalCourses] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState<boolean>(false);
    const limit = 5;
    
    useEffect(() => {
        getData();
    }, [page, limit, search, filter, sort]);

    const getData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${URL}/api/course/allcourses`, {
                params: { page, limit, search, filter, sort },
                ...config
            });
            setCourseDetails(data.data);
            setTotalCourses(data.total);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching course data:", error);
            setLoading(false)
        }
    };

    const handleRowClick = (courseId: string) => {
        navigate(`/admin/courses/details/${courseId}`);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
        setPage(1);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const totalPages = Math.ceil(totalCourses / limit);

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Course Approval</h1>
            
            <div className="mb-6 flex flex-wrap items-center space-x-4">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative">
                    <select 
                        value={filter} 
                        onChange={handleFilterChange} 
                        className="appearance-none pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All</option>
                        <option value="requested">Requested</option>
                        <option value="accepted">Published</option>
                        <option value="rejected">Blocked</option>
                        <option value="verified">Verified</option>
                        <option value="notVerified">Not Verified</option>
                    </select>
                    <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative">
                    <select 
                        value={sort} 
                        onChange={handleSortChange} 
                        className="appearance-none pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Sort by</option>
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                    </select>
                    <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ?(
                <Player
                autoplay
                loop
                src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
                style={{ height: '120px', width: '120px' }}
             />
            ):(
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Sl No', 'Course Name', 'Instructor', 'Category', 'Verification', 'Request Status', 'Price'].map((header) => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {courseDetails && courseDetails.map((course, index) => (
                            <tr 
                                key={course._id} 
                                onClick={() => handleRowClick(course._id)}
                                className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(page - 1) * limit + index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.instructorRef?.username || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.categoryRef?.title || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        course.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {course.isVerified ? 'Verified' : 'Pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        course.stage === 'requested' ? 'bg-yellow-100 text-yellow-800' :
                                        course.stage === 'accepted' ? 'bg-green-100 text-green-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {course.stage === 'requested' && 'Requested'}
                                        {course.stage === 'accepted' && 'Published'}
                                        {course.stage === 'rejected' && 'Blocked'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {course.pricing.type === 'free' ? 
                                        <span className="text-green-600 font-medium">Free</span> : 
                                        <span className="text-blue-600 font-medium">₹{course.pricing.amount}</span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )} 
            </div>

                <div className="mt-6">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default CourseApproval;