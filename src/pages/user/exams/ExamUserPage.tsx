import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../common/api';
import { config } from '../../../common/configurations';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

function ExamUserPage() {
    const { examId } = useParams();
    const navigate = useNavigate();
    const [examDetails, setExamDetails] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [error, setError] = useState('');
    const { user } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        getExamDetails();
    }, []);

    const getExamDetails = async () => {
        try {
            const response = await axios.get(`${URL}/api/course/examsbyexamid/${examId}`, config);
            setExamDetails(response?.data?.data);
        } catch (error) {
            console.error("Error fetching exam details:", error);
        }
    };

    const handleNextQuestion = () => {
        if (!userAnswers[currentQuestionIndex]) {
            setError('Please select a valid answer');
            return;
        }
        setError('');
        if (currentQuestionIndex < examDetails.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        setError('');
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleAnswerSelect = (option) => {
        setUserAnswers({...userAnswers, [currentQuestionIndex]: option});
        setError('');
    };

    const handleSubmitExam = async () => {
        if (!userAnswers[currentQuestionIndex]) {
            setError('Please select a valid answer');
            return;
        }
        
        if (Object.keys(userAnswers).length !== examDetails.questions.length) {
            setError('Please answer all questions before submitting');
            return;
        }

        const score = examDetails.questions.reduce((total, question, index) => {
            return total + (question.answer === userAnswers[index] ? examDetails.questionScore : 0);
        }, 0);

        const isPassed = score >= examDetails.passingScore;

        const resultData = {
            assessmentRef: examId,
            userRef: user._id,
            score: score,
            totalScore: examDetails?.totalScore,
            isPassed: isPassed
        };

        try {
            const response = await axios.post(`${URL}/api/course/exam/submit`, resultData, config);
            console.log(response?.data?.data?._id,"resulti")
            console.log("🚀 ~ handleSubmitExam ~ response:", response)
            navigate(`/student/exam-result/${response.data.data._id}`);
        } catch (error) {
            console.error("Error submitting exam result:", error);
            setError('Failed to submit exam. Please try again.');
        }
            // console.log("🚀 ~ handleSubmitExam ~ response:", response)
    };

    if (!examDetails) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    const currentQuestion = examDetails?.questions[currentQuestionIndex];

    return (
        <div className="flex h-screen p-6 bg-gray-100">
            <div className="flex-grow max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <h1 className="text-3xl font-bold mb-2 text-darkBlue">{examDetails?.title}</h1>
                    <p className="text-gray-600 mb-6">Question {currentQuestionIndex + 1} of {examDetails?.numQuestions}</p>
                    <h2 className="text-xl text-gray-800 mb-6">{currentQuestion?.question}</h2>
                    <div className="space-y-4">
                        {currentQuestion.options.map((option, index) => (
                            <label key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-pink-50 transition-colors duration-300">
                                <input 
                                    type="radio"
                                    name="answer"
                                    value={option.option}
                                    checked={userAnswers[currentQuestionIndex] === option.option}
                                    onChange={() => handleAnswerSelect(option.option)}
                                    className="form-radio h-5 w-5 text-darkBlue"
                                />
                                <span className="text-gray-700">{option.option}</span>
                            </label>
                        ))}
                    </div>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    <div className="flex justify-between items-center mt-8">
                        <button 
                            className={`px-6 py-2 rounded-md transition-colors duration-300 ${currentQuestionIndex === 0 
                                ? 'bg-gray-300 cursor-not-allowed' 
                                : 'bg-darkBlue text-white hover:bg-blue-700'}`}
                            onClick={handlePreviousQuestion} 
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        {currentQuestionIndex === examDetails.questions.length - 1 ? (
                            <button 
                                className="px-6 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
                                onClick={handleSubmitExam}
                            >
                                Submit Exam
                            </button>
                        ) : (
                            <button 
                                className="px-6 py-2 rounded-md bg-darkBlue text-white hover:bg-blue-700 transition-colors duration-300"
                                onClick={handleNextQuestion}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExamUserPage;