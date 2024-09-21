import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL } from '../../../../common/api';
import { config } from '../../../../common/configurations';
import { Player } from '@lottiefiles/react-lottie-player';

function InstructorTable() {
    const [courses, setCourses] = useState<any[] | null>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${URL}/api/course/instructor/instructorEnrollments`, config);
            setCourses(response?.data?.data);
            setLoading(false);
        } catch (error) {
            console.error("Error occurred in getData", error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Player
                autoplay
                loop
                src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
                style={{ height: '125px', width: '120px' }}
            />
        );
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Top 5 Enrollments</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl.No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Enrollments</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Array.isArray(courses) && courses.length > 0 ? (
                            courses.map((course, index) => (
                                <tr key={course?._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img
                                            src={course?.thumbnail}
                                            alt={course?.title}
                                            className="h-10 w-10 rounded-full"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {course?.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {course?.enrollmentCount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {course?.amount}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 font-bold">
                                    No enrollments found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InstructorTable;
