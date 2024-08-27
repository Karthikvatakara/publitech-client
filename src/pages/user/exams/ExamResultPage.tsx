import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../common/api';
import { config } from '../../../common/configurations';

function ExamResultPage() {
    const { resultId } = useParams();
    const [examResult, setExamResult] = useState<any>(null);

    useEffect(() => {
        getExamResult();
    }, []);

    const getExamResult:any = async () => {
        try {
            console.log("reached in getexam reuslt");
            const response = await axios.get(`${URL}/api/course/examresult/${resultId}`, config);
            setExamResult(response?.data?.data);
        } catch (error) {
            console.error("Error fetching exam result:", error);
        }
    };

    if (!examResult) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-center text-darkBlue">Exam Result</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Score:</span>
                        <span className="text-2xl font-bold">{examResult.score} / {examResult.totalScore}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Status:</span>
                        <span className={`text-xl font-bold ${examResult.isPassed ? 'text-green-500' : 'text-red-500'}`}>
                            {examResult.isPassed ? 'Passed' : 'Failed'}
                        </span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                        <p className="text-center text-gray-600">
                            {examResult.isPassed 
                                ? "Congratulations! You have successfully passed the exam."
                                : "Unfortunately, you did not pass the exam. Keep practicing and try again!"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExamResultPage;